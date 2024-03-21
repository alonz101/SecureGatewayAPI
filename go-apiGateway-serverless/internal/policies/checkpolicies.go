package policies

import (
	"encoding/json"
	"go-apiGateway-serverless/internal/utils"
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
)

func CheckAllPolicies(request events.APIGatewayV2HTTPRequest) (bool, events.APIGatewayV2HTTPResponse, error) {

	requestPath := request.RawPath
	requestMethod := request.RequestContext.HTTP.Method
	clientIP := request.Headers["x-forwarded-for"]

	// check enabled policies

	// fetch enabled polcies from data base

	isGeoLocationEnabled := true
	forbiddenCountries := []string{"UK", "FR"}
	isOffensiveEnabled := true
	toxicThreshold := 0.85

	// enforce policies
	if isGeoLocationEnabled {
		geoTest, geoTestText := IsGeoLocationValid(forbiddenCountries, clientIP)
		if !geoTest {
			log.Printf("Request blocked due to geolocation policy: %s", geoTestText)
			return false, events.APIGatewayV2HTTPResponse{
				StatusCode: http.StatusForbidden,
				Headers:    map[string]string{"Content-Type": "application/json"},
				Body:       `{"message":"` + geoTestText + `"}`,
			}, nil
		}
	}

	// enforce offinsive Message blocker

	if isOffensiveEnabled && utils.IsChatRequest(requestPath) && (requestMethod == "POST" || requestMethod == "PUT") {

		log.Printf("request being checked: %v ", request)

		// Parse the JSON body into a map
		var data map[string]interface{}
		err := json.Unmarshal([]byte(request.Body), &data)
		if err != nil {
			log.Printf("Error parsing request body: %v", err)
			return false, events.APIGatewayV2HTTPResponse{
				StatusCode: http.StatusBadRequest,
				Body:       `{"error":"Invalid request body"}`,
			}, nil
		}

		// Access specific fields in the map
		content, ok := data["content"].(string)
		if !ok {
			log.Println("Error: 'content' field is missing or not a string")
			return false, events.APIGatewayV2HTTPResponse{
				StatusCode: http.StatusBadRequest,
				Body:       `{"error":"Missing or invalid 'content' field"}`,
			}, nil
		}

		isOffensive, score, err := CheckForOffensiveContent(content, utils.GoogleCloudToken, toxicThreshold)
		if err != nil {
			log.Printf("Error checking for offensive content: %v", err)
			return false, events.APIGatewayV2HTTPResponse{
				StatusCode: http.StatusInternalServerError,
				Body:       `{"message":"Offensive content detected"}`,
			}, nil
		}
		if isOffensive {
			log.Printf("Offensive content detected with score: %f", score)
			// Handle the offensive content, e.g., by returning a forbidden response
			return false, events.APIGatewayV2HTTPResponse{
				StatusCode: http.StatusForbidden,
				Body:       `{"message":"Offensive content detected"}`,
			}, nil
		}
	}

	return true, events.APIGatewayV2HTTPResponse{
		StatusCode: http.StatusAccepted,
		Body:       `{"message":"OK"}`,
	}, nil

}

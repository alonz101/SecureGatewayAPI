package main

import (
	"bytes"
	"go-apiGateway-serverless/internal/policies"
	"go-apiGateway-serverless/internal/utils"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func HandleRequest(request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	requestPath := request.RawPath
	requestMethod := request.RequestContext.HTTP.Method
	clientIP := request.Headers["x-forwarded-for"]

	log.Printf("Handling request: Method=%s, Path=%s, IP=%s", requestMethod, requestPath, clientIP)

	// Detect backend service URL based on the request path
	backendURL := utils.DetectUrl(requestPath)

	log.Printf("Forwarding to backend URL: %s", backendURL)

	isOk, policyResponse, er := policies.CheckAllPolicies(request)
	if !isOk {
		return policyResponse, er
	}

	// Forward the request to the backend service and send back the response to the client.

	// Create a new HTTP client with a timeout
	client := &http.Client{}
	var resp *http.Response
	var err error

	var req *http.Request
	if requestMethod == "GET" || requestMethod == "DELETE" {
		log.Println("Creating GET/DELETE request")
		// For GET and DELETE requests
		req, err = http.NewRequest(requestMethod, backendURL, nil)
		// Mimic browser behavior by accepting JSON responses
		req.Header.Set("Accept", "application/json")

		if err != nil {
			log.Printf("Error creating GET/DELETE request: %v", err)
		}

	} else if requestMethod == "POST" || requestMethod == "PUT" || requestMethod == "OPTIONS" {
		// For POST and PUT requests, include the request body
		requestBody := bytes.NewBufferString(request.Body)
		req, err = http.NewRequest(requestMethod, backendURL, requestBody)
		req.Header.Set("Content-Type", "application/json")
		log.Printf("created POST/PUT request:  %v", request)
	}

	if err != nil {
		log.Printf("Error creating request: %v", err)
		return events.APIGatewayV2HTTPResponse{StatusCode: http.StatusInternalServerError}, nil
	}

	// Forward the request
	log.Printf("request do: %v", req)
	resp, err = client.Do(req)
	if err != nil {
		log.Printf("Error forwarding request: %v", err)
		log.Printf("the request was: %v", backendURL)
		return events.APIGatewayV2HTTPResponse{StatusCode: http.StatusInternalServerError}, nil
	}
	defer resp.Body.Close()

	// Read the response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading response body: %v", err)
		return events.APIGatewayV2HTTPResponse{StatusCode: http.StatusInternalServerError}, nil
	}

	// Return the backend service's response
	log.Printf("response from python BE: %v", string(body))
	return events.APIGatewayV2HTTPResponse{
		StatusCode: resp.StatusCode,
		Headers:    map[string]string{"Content-Type": "application/json"},
		Body:       string(body),
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}

package utils

import (
	"bytes"
	"encoding/json"

	// "fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type PerspectiveRequest struct {
	Comment struct {
		Text string `json:"text"`
	} `json:"comment"`
	Languages           []string `json:"languages"`
	RequestedAttributes struct {
		Toxicity struct{} `json:"TOXICITY"`
	} `json:"requestedAttributes"`
}

type PerspectiveResponse struct {
	AttributeScores struct {
		Toxicity struct {
			SpanScores []struct {
				Score struct {
					Value float64 `json:"value"`
				} `json:"score"`
			} `json:"spanScores"`
		} `json:"TOXICITY"`
	} `json:"attributeScores"`
}

func GetToxicScore(message, apiKey string) (float64, error) {
	url := "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=" + apiKey

	// Construct the request payload
	payload := PerspectiveRequest{}
	payload.Comment.Text = message
	payload.Languages = []string{"en"}
	payload.RequestedAttributes.Toxicity = struct{}{}

	log.Printf("message being checked %v", message)

	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		log.Printf("Error marshalling request payload: %v", err)
		return 0.0, err
	}

	// Make the POST request
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(payloadBytes))
	if err != nil {
		log.Printf("Error making request to Perspective API: %v", err)
		return 0.0, err
	}
	defer resp.Body.Close()

	// Decode the response
	var response PerspectiveResponse
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Printf("Error reading response body: %v", err)
		return 0.0, err
	}

	err = json.Unmarshal(body, &response)
	if err != nil {
		log.Printf("Error decoding Perspective API response: %v", err)
		return 0.0, err
	}

	// Extract the toxicity score
	toxicityScore := response.AttributeScores.Toxicity.SpanScores[0].Score.Value
	return toxicityScore, nil

}

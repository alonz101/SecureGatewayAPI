package policies

import (
	"go-apiGateway-serverless/internal/utils"
	"log"
)

func CheckForOffensiveContent(message, apiKey string, toxicThreshold float64) (bool, float64, error) {

	toxicityScore, err := utils.GetToxicScore(message, apiKey)

	if err != nil {
		log.Printf("Error marshalling request payload: %v", err)
		return false, 0.0, err
	}
	isOffensive := toxicityScore > toxicThreshold

	return isOffensive, toxicityScore, nil
}

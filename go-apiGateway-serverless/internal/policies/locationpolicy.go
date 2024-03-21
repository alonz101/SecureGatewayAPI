package policies

import (
	"go-apiGateway-serverless/internal/utils"
	"log"
)

func IsGeoLocationValid(forbiddenCountries []string, clientIp string) (bool, string) {
	ipInfo, err := utils.GetIPInfo(clientIp, utils.IpInfoToken)
	if err != nil {
		log.Printf("Error creating request due to geolocation error: %v", err)
		return false, "Error creating request due to geolocation error"
	}

	for _, country := range forbiddenCountries {
		if ipInfo.Country == country {
			return false, "Client IP matches forbidden country: " + country
		}
	}

	return true, "Client IP does not match any forbidden countries"
}

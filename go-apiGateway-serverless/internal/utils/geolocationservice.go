package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

type IPinfoResponse struct {
	IP       string `json:"ip"`
	Hostname string `json:"hostname"`
	City     string `json:"city"`
	Region   string `json:"region"`
	Country  string `json:"country"`
	Loc      string `json:"loc"`
	Org      string `json:"org"`
	Postal   string `json:"postal"`
	Timezone string `json:"timezone"`
}

func GetIPInfo(ipAddress, accessToken string) (*IPinfoResponse, error) {
	url := "https://ipinfo.io/" + ipAddress + "?token=" + accessToken
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("Error querying IPinfo: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	var ipInfo IPinfoResponse
	if err := json.NewDecoder(resp.Body).Decode(&ipInfo); err != nil {
		log.Printf("Error decoding IPinfo response: %v", err)
		return nil, err
	}

	return &ipInfo, nil
}

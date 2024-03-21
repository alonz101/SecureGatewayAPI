package utils

import (
	"log"
	"strings"
)

func IsProductsRequest(request string) bool {
	return strings.HasPrefix(request, "/products")
}

func IsChatRequest(request string) bool {
	return strings.HasPrefix(request, "/messages")
}

func DetectUrl(request string) string {
	log.Printf("detect url func arg string: %v", request)
	switch {
	case IsProductsRequest(request):
		return PythonProductsServiceURL
	case IsChatRequest(request):
		return PythonChatServiceURL
	default:
		return "Invalid request path"
	}
}

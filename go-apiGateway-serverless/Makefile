.PHONY: build clean deploy

build:
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/gateway internal/handler/gateway.go
	# env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/locationpolicy internal/policies/locationpolicy.go
	# env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/constants internal/utils/constants.go
	# env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bin/geolocationservice internal/utils/geolocationservice.go

clean:
	rm -rf ./bin

deploy: clean build
	sls deploy --verbose

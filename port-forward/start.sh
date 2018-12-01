#!/bin/bash

docker build -t port-forward .
docker rm -f port-forward-80 port-forward-443

docker run --name port-forward-80 -p 80:1234 -e PORT=30080 -d port-forward
docker run --name port-forward-443 -p 443:1234 -e PORT=30443 -d port-forward

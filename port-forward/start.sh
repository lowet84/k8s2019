#!/bin/bash

docker build -t port-forward .
docker rm -f port-forward-80 port-forward-443

docker run --name port-forward-80 --net=host -e TO=30080 -e FROM=80 -d port-forward
docker run --name port-forward-443 --net=host -e TO=30443 -e FROM=30443 -d port-forward

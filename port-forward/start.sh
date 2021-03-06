#!/bin/bash

#docker build -t port-forward .
docker rm -f port-forward-80 port-forward-443

docker run --name port-forward-80 --restart=always --net=host -e TO=30080 -e FROM=80 -d port-forward
docker run --name port-forward-443 --restart=always --net=host -e TO=30443 -e FROM=443 -d port-forward

#!/bin/bash

cd traefik
sh start.sh
cd ..

cd port-forward
docker build -t port-forward -f Dockerfile-arm .
sh start.sh
cd ..

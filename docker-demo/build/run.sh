#!/bin/bash

node index.js
docker rmi -f lowet84/k8s2019-docker-demo
docker build -t lowet84/k8s2019-docker-demo .
docker run --rm -it lowet84/k8s2019-docker-demo
docker push lowet84/k8s2019-docker-demo
docker rmi -f lowet84/k8s2019-docker-demo
docker run --rm -it lowet84/k8s2019-docker-demo

#!/bin/bash
kubectl apply -f service-account.yml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl apply -f ingress.yml


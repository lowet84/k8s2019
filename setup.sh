#!/bin/bash

sudo kubeadm init
mkdir -p ~/.kube
cp /etc/kubernetes/admin.conf ~/.kube/config

# Taint master
sudo kubectl taint nodes --all node-role.kubernetes.io/master-

# Weave network layer
sudo kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"

# Traefik load balancer
#sudo kubectl apply -f https://raw.githubusercontent.com/containous/traefik/master/examples/k8s/traefik-rbac.yaml


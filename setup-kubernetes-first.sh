#!/bin/bash

sudo kubeadm init
mkdir -p ~/.kube
rm ~/.kube/config
sudo cp /etc/kubernetes/admin.conf ~/.kube/config
sudo chown $USER ~/.kube/config

# Taint master
#kubectl taint nodes --all node-role.kubernetes.io/master-

# Weave network layer
#kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
kubectl apply -f weave.yml


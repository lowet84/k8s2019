apt-get update
apt-get install -y netfilter-persistent
mkdir -p /etc/iptables/

echo "*filter
:KUBE-SERVICES - [0:0]
-A FORWARD -i cni0 -j ACCEPT
-A FORWARD -o cni0 -j ACCEPT
-A FORWARD -i flannel.1 -j ACCEPT
-A FORWARD -o flannel.1 -j ACCEPT
COMMIT
" | sudo tee -a /etc/iptables/rules.v4 > /dev/null

sudo iptables -A FORWARD -i cni0 -j ACCEPT
sudo iptables -A FORWARD -o cni0 -j ACCEPT
sudo iptables -A FORWARD -i flannel.1 -j ACCEPT
sudo iptables -A FORWARD -o flannel.1 -j ACCEPT

curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" > /etc/apt/sources.list.d/kubernetes.list
apt-get update

apt-get install -y kubeadm docker-ce=18.06.1~ce~3-0~raspbian

echo "runcmd:" >> /boot/device-init.yaml
echo "  - sudo iptables -A FORWARD -i cni0 -j ACCEPT" >> /boot/device-init.yaml
echo "  - sudo iptables -A FORWARD -o cni0 -j ACCEPT" >> /boot/device-init.yaml
echo "  - sudo iptables -A FORWARD -i flannel.1 -j ACCEPT" >> /boot/device-init.yaml
echo "  - sudo iptables -A FORWARD -o flannel.1 -j ACCEPT" >> /boot/device-init.yaml

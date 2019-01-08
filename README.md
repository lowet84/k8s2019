### Preparations for Docker & Kubernetes Presentation

install hypriot on all raspberry pi:s  
https://github.com/hypriot/image-builder-rpi/releases/download/v1.9.0/hypriotos-rpi-v1.9.0.img.zip  
using: https://sourceforge.net/projects/win32diskimager/  
after flashing the sd, edit the user_data file on the sd card to the following before booting:  
```
#cloud-config
# vim: syntax=yaml

hostname: master
manage_etc_hosts: true

users:
  - name: fredrik
    gecos: "Hypriot Pirate"
    sudo: ALL=(ALL) NOPASSWD:ALL
    shell: /bin/bash
    groups: users,docker,video,input
    plain_text_passwd: hypriot
    lock_passwd: false
    ssh_pwauth: true
    chpasswd: { expire: false }
    ssh_authorized_keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDWFFTzJdE7HMgVscGjsDDpGHoOM2Eif8dIoAFPGIa751OYwK079zTjnl3r6M/Cv5DBE0DrUn+CKoCkDX3ZHadDITemtDB6WyFtVsEDBHXoBPxGOP/VhjU9qSZqSV8WCCB0iCixW/TrBrqRTM5TDtrP44hYUI66VojmeUV3xc/ttyw34nPMLrlxVUx1XJVM63e5nJmSXbCisDYeXDqaDC4F7IvVtSoR0Ysr/sOxUtHgeZE4Q/DALOJN/q3PfGKdloxKlyqKBIHNADJXBgtRHTZZG1HZ3FMtb/EC1v2p7GmNetmrdPxI63jJLHa5g42guFZBUelFb6se1GASuNJUxyPB fredriklowenhamn.se

package_upgrade: false

runcmd:
  - 'systemctl restart avahi-daemon'
```

## Set up nodes
# Master & Nodes
clone the repo and run:
```
sudo sh setup-hypriot.sh
```

# Master
Run the two kubernetes setup scripts
```
sudo sh setup-kubernetes-first.sh
sh setup-kubernetes-second.sh
```
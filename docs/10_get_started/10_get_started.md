---
id: 10_get_started
title: Getting started with Argos Notary
sidebar_label: Getting Started
---
## All-in-one Docker Image

### Prerequisites

* docker

### Activate

Start Argos Notary with the following command:

```bash
docker run -ti -p 80:80 -p 8080:8080 -p 8087:8087 \
       --name argosnotary argosnotary/argosnotary:1.0.3
```

If you want to persist the mongodb data at first docker volumes should be created.

```bash
docker volume create data_db 
docker volume create data_configdb
```

or with volumes
```bash
docker run -ti -p 80:80 -p 8080:8080 -p 8087:8087 \
       -v data_db:/data/db -v data_configdb:/data/configdb \
       --name argosnotary argosnotary/argosnotary:1.0.3
```

Argos Notary will be available <a href="http://localhost" target="_blank">here</a>


The Swagger page for the `argos-service` REST api will be available <a href="http://localhost:8080/swagger" target="_blank">here</a>

:::caution
This image should not be used in a Production environment. It is meant for experimental use only!
:::

## Deploy on Kubernetes minikube with Helm chart

### Prerequisites

* kubectl: [documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* helm3 3.1+: [documentation](https://helm.sh/docs/intro/install/)
* minikube: [documentation](https://kubernetes.io/docs/tasks/tools/install-minikube/)

### Init

```bash
minikube start
# to get the ip address of the minikube host
export MINIKUBE_IP=$(minikube ip)
```
To resolve the host names used in the Helm charts add the following lines to the `hosts` file.
The `minikube ip` is the ip addres from the pervious step:

```
<minikube ip>  argosnotary.local
<minikube ip>  oauthstub.local
```
Enable ingress on the cluster.
```bash
minikube addons enable ingress
```

You have to wait until ingress is fully up, running and ready. Check by:
```bash
kubectl get po -A
```

### Activate

Add the argosnotary Helm repository
```bash
helm repo add argosnotary https://charts.argosnotary.com
helm repo update
```
Install Argos Notary
```bash
helm install argos argosnotary/argosnotary
```

Go to the Argos Dashboard with this <a href="https://argosnotary.local" target="_blank">link</a>
:::caution
Minikube should not be used in a Production environment. It is meant for experimental use only!
:::

---
id: 10_get_started
title: Getting started with Argos Notary
sidebar_label: Getting Started
---
## All-in-one Docker Image

### Prerequisites

* docker

### Activate

If you want to persist the mongodb data at first docker volumes should be created.

```bash
docker volume create data_db 
docker volume create data_configdb
```

Start Argos Notary with the following command:

```bash
docker run -ti -p 80:80 -p 8080:8080 -p 8087:8087 \
       --name argos argosnotary/argos
```
or with volumes
```bash
docker run -ti -p 80:80 -p 8080:8080 -p 8087:8087 \
       -v data_db:/data/db -v data_configdb:/data/configdb \
       --name argos argosnotary/argos
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
minikube ip
```
To resolve the host names used in the Helm charts add the following lines to the `hosts` file.
The `minikube ip` is the ip addres from the pervious step:

```
<minikube ip>  argos-frontend.minikube.local
<minikube ip>  argos-oauth-stub.minikube.local
```
Enable ingress on the cluster
```bash
minikube addons enable ingress
```

### Activate

Add the argosnotary Helm repository
```bash
helm repo add argosnotary https://argosnotary.github.io/charts
helm repo update
```
Install Argos Notary
```bash
helm install argos argosnotary/argos
```

Go to the Argos Dashboard with this <a href="https://argos-frontend.minikube.local" target="_blank">link</a>
:::caution
Minikube should not be used in a Production environment. It is meant for experimental use only!
:::

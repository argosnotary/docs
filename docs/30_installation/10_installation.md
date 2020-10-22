---
id: 10_installation
title: Installation
sidebar_label: Installation
---


:::caution
This is page is work in progress
:::

The installation will be based on `Kubernetes` and `Helm3` charts. 

This is tested with Azure Kubernetes Service and Google Kubernetes Engine.

## Prerequesites

* A kubernetes 1.15+ cluster: [documentation](https://kubernetes.io/docs/home/)
* kubectl: [documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* helm3 3.1+: [documentation](https://helm.sh/docs/intro/install/)
* nginx-ingress-controler: [documentation](https://github.com/kubernetes/ingress-nginx)
* cert-manager: [documentation](https://github.com/jetstack/cert-manager)
* One or more OAUTH providers:
  * Azure AD App Registration: [quickstart register app](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
  * Github OAUTH App: [building oauth apps](https://docs.github.com/en/developers/apps/building-oauth-apps)
  * Google OAUTH: [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en)

## Install with internal MongoDB

The following yaml should be used as input for the Helm install. Save this yaml in the 
file `values.yaml` and fill in all parameters. All possible OAUTH providers are activated in this example.

```yaml
global:
  oauthstub:
    enabled: false

frontend:
  replicaCount: 2
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 4
  resources:
    limits:
      cpu: 100m
      memory: 100Mi 
  ingress:
    enabled: true    
    annotations:
      kubernetes.io/ingress.class: nginx
      cert-manager.io/cluster-issuer: letsencrypt-prod
      acme.cert-manager.io/http01-edit-in-place: "true"
    hosts:
      - host: '<ingress host>'
    tls:
      - secretName: tls-secret
        hosts:
          - '<ingress host>'

service:
  replicaCount: 2
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 4
  resources:
    limits:
      cpu: 300m
      memory: 1500Mi
  secret:
    mongodb_uri:
      password: '<mongo password>'
      dbhost_and_port: '<release name>-mongodb'
  oauth2:
    client:
      registration:
        azure:
          clientId: '<azure client id>'
          clientSecret: '<azure client secret>'
        github:
          clientId: '<github client id>'
          clientSecret: '<github client secret>'
        google:
          clientId: '<google client id>'
          clientSecret: '<google client secret>'
      provider:
        azure:
          enabled: true          
          authorizationUri: https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize
          tokenUri: https://login.microsoftonline.com/organizations/oauth2/v2.0/token
          userInfoUri: https://graph.microsoft.com/v1.0/me
        github:
          enabled: true
        google:
          enabled: true
  auth:
    frontendRedirectBasePath: '<loadbalancer endpoint>'
  jwt:
    token:
      secret: '<generated jwt token>'

mongodb:
  mongodbRootPassword: '<random string as mongodb password>'
```

| Parameter     | Description                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------- |
| client id     | The client id's of the OAUTH Providers                                                            |
| client secret | The secrets of the OAUTH Providers                                    |
| jwt token     | JWT Token used for OAUTH, a new one should be created                                        |         
| password      | choose a random string which will be used as the mongodb root password during initialization |


### Install Argos Notary

```shell
helm repo add argosnotary https://charts.argosnotary.com
helm repo update

helm install argos argosnotary/argosnotary -f values.yaml
```

## Install with Atlas MongoDB

It is also possible to use the MongoDB cloud solution `Atlas MongoDB`. To use this you have to 
create a database cluster at [Atlas MongoDB](https://cloud.mongodb.com). After this has been
done and an account and connection string is created, the following yaml statements should be used as 
input for the Helm install.

```yaml
# extra options for Atlas MongoDB
service:
  secret:
    mongodb_uri:
      username: 'root'
      password: '<password created on Atlas MongoDB>'
      dbhost_and_port: '<from Atlas Application connection url>'
      dbconn: '<from Atlas Application connection url>'
      dbprotocol: 'mongodb+srv'
# an external mongodb cluster is used
mongodb:
  enabled: false
```
| Parameter      | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| host and port  | The host and port part of the `Atlas MongoDB` cluster Application connection string |  
| connection uri | The uri part of the  `Atlas MongoDB` cluster Application connection string          | 
| username       | This is the account created on `Atlas MongoDB` for connecting to the cluster        |
| password       | This is the password for the mongo account                                         |

### Install Argos Notary
```shell
helm install argos argosnotary/argosnotary -f values.yaml
```

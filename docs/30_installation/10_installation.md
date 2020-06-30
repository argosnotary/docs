---
id: 10_installation
title: Installation
sidebar_label: Installation
---


:::caution
This is page is work in progress
:::

The installation will be based on `Kubernetes` and `Helm3` charts. 

At this moment only Azure AD is supported as OAUTH2 Provider.

## Prerequesites

* kubernetes 1.15+: [documentation](https://kubernetes.io/docs/home/)
* kubectl: [documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* helm3 3.1+: [documentation](https://helm.sh/docs/intro/install/)
* nginx-ingress-controler: [documentation](https://github.com/kubernetes/ingress-nginx)
* cert-manager: [documentation](https://github.com/jetstack/cert-manager)
* Azure AD App Registration: [quickstart register app](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)

## Install with internal MongoDB

The following yaml should be used as input for the Helm install. Save this yaml in the 
file `values.yaml` and fill in all parameters.

```yaml
frontend: 
  image:
    repository: argosnotary/argos-frontend
  ingress:
    enabled: true    
    annotations:
      kubernetes.io/ingress.class: nginx
      cert-manager.io/cluster-issuer: letsencrypt
    hosts:
      - host: notary.<your domain>
    tls:
      - secretName: tls-secret
        hosts:
          - notary.<your domain>

service:
  secret:
    mongodb_uri:
      password: '<password>'
  image:
    repository: argosnotary/argos-service
  aad:
    client_provider_oauth_url_prefix: 'https://login.microsoftonline.com'
    client_provider_user_info_url: 'https://graph.microsoft.com/v1.0/me'
    client_secret: '<client secret>'
    client_id: '<client id>'
    authorizationUri: '<tenant id>/oauth2/v2.0/authorize'
    tokenUri: '<tenant id>/oauth2/v2.0/token'
    frontendRedirectBasePath: 'https://notary.argosnotary.org'
    jwt_token: '<jwt token>'

mongodb:
  mongodbRootPassword: '<random string as mongodb password>'
```

| Parameter     | Description                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------- |
| client id     | The client id of the Azure AD app                                                            |
| client secret | The secret of the Azure AD app                                                               |
| tenant id     | The tenant id of the Azure account used for the AAD app                                      |
| jwt token     | JWT Token used for OAUTH, a new one should be created                                        |         
| password      | choose a random string which will be used as the mongodb root password during initialization |


### Install Argos Notary

```shell
helm install argos argosnotary/argosnotary -f values.yaml
```

## Install with Atlas MongoDB

It is also possible to use the MongoDB cloud solution `Atlas MongoDB`. To use this you have to 
create a database cluster at [Atlas MongoDB](https://cloud.mongodb.com). After this has been
done and an account and connection string is created, the following yaml should be used as 
input for the Helm install. Save this yaml in the file `values.yaml` and fill in all parameters.

```yaml
frontend: 
  image:
    repository: argosnotary/argos-frontend
  ingress:
    enabled: true    
    annotations:
      kubernetes.io/ingress.class: nginx
      cert-manager.io/cluster-issuer: letsencrypt
    hosts:
      - host: notary.<your domain>
    tls:
      - secretName: tls-secret
        hosts:
          - notary.<your domain>

service:
  secret:
    mongodb_uri:
      username: '<username>'
      password: '<password>'
      # use connection string delivered by Atlas MongoDB
      dbhost_and_port: '<host and port>'
      dbconn: '<connection uri>'
      dbprotocol: 'mongodb+srv'
  image:
    repository: argosnotary/argos-service
  aad:
    client_provider_oauth_url_prefix: 'https://login.microsoftonline.com'
    client_provider_user_info_url: 'https://graph.microsoft.com/v1.0/me'
    client_secret: '<client secret>'
    client_id: '<client id>'
    authorizationUri: '<tenant id>/oauth2/v2.0/authorize'
    tokenUri: '<tenant id>/oauth2/v2.0/token'
    frontendRedirectBasePath: 'https://notary.argosnotary.org'
    jwt_token: '<jwt token>'

# an external mongodb cluster is used
mongodb:
  enabled: false
```
| Parameter      | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| client id      | The client id of the Azure AD app                                            |
| client secret  | The client secret of the Azure AD app                                        |
| tenant id      | The tenant id of the Azure account used for the AAD app                      |
| jwt token      | JWT Token used for OAUTH, a new one should be created                        |  
| host and port  | The host and port part of the `Atlas MongoDB` cluster connection string      |  
| connection uri | The uri part of the  `Atlas MongoDB` cluster connection string               | 
| username       | This is the account created on `Atlas MongoDB` for connecting to the cluster |
| password       | This is the password for the mongo account                                   |

### Install Argos Notary
```shell
helm install argos argosnotary/argosnotary -f values.yaml
```

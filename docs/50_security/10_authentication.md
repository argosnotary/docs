---
id: 10_authentication
title: Authentication
sidebar_label: Authentication
---

:::caution
This is page is work in progress
:::
## Accounts
### Personal Accounts
Personal accounts are registered or updated each time a user logs in via an external authorization serverat the time of writing only a connector for azure oath is available.

When the user is successfully authenticated a so called encrypted bearer JWT token is used to authenticate requests done to the argos service from the argos ui.

### Service Accounts
Service account use basic auth authentication for the user a key id is used and for the password the encrypted hash of the passphrase this is then hashed again serverside and stored with the service account.

## OAUTH
Below is an sequence diagram illustrating the interaction between the various components participating int the oauth Authorization Code Grant flow.
![OAUTH](/img/plantuml/30_security_oauth.svg)
## Basic

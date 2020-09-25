---
id: 05_get_started_cloud
title: Argos Notary Cloud
sidebar_label: Argos Notary Cloud
---
## Argos Notary Cloud step-by-step

1. Create profile

Login to [Argos Notary Cloud](https://cloud.argosnotary.com) with the OAUTH provider of choice.

2. [Create a Private Elliptic Curve key](../15_user_manual/10_user_profile#create-private-key) in your profile.

3. Choose a domain to use.

e.g. example.com or argosnotary.com. 

As an example for Maven artifacts a good choice would be the group id of your artifacts.

**You should choose a domain for which you have DNS administrator rights available!**

4. Create TXT DNS record for the chosen domain.

It should be proven that you are or your organization is owner of the chosen domain. For this a DNS TXT record should be created with the combination of a part of your private key id, your public key and the domain.

Create A TXT record as `<8 characters of your key id>.<your domain>` with the your public key as value.

Example:

| Private Key Id | TXT record | Record value (Public Key)  |
| ------------- | ------------- | ----- |
| 20c3a43ddd2796facd478a3d41060... | 20c3a43d.argosnotary.com | MHYwEAYHKoZIzj0CAQYFK4... |

```
   # this command with the correct parms should give your public key
   dig <8 characters of your key id>.<your domain> TXT +short
```

```
   dig 20c3a43d.argosnotary.com TXT +short
   # gives "MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE09dECSOPjZBa..."
```

**This record is important and will be used as a root of trust in the future.**

5. Request ownership of your domain in Argos Notary Cloud at <support@argosnotary.com>

Add to the mail the used domain and key id of the created Private Key

The `Personal Account` with the `private key` will be `Domain Owner` and can [give other Users permissions](../15_user_manual/15_permissions).






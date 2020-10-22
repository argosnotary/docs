---
id: 10_recover
title: Recover Admin Role
sidebar_label: Recover Admin
---

## Recover the Administrator Role
Although the chances are small there are some scenario's that all Administrator roles in Argos Notary are lost. In this case follow these instructions.

To force an account to administrator you logon to the mongo db shell and run this script (change the email address to the account you want to be administrator):
```shell
db.getCollection("roles").find(
    {
        "name" : "administrator"
    }
).projection({ roleId: 1, _id: 0 })
.forEach(function(role) {
    print( "role: " + role.roleId );
       db.personalaccounts.findOneAndUpdate({ "email": "luke@skywalker.imp" },{ $set: { "roleIds" :[ role.roleId]} });
});
```


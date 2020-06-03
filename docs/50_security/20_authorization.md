---
id: 20_authorization
title: Authorization
sidebar_label: Authorization
---

:::caution
This is page is work in progress
:::
## Introduction
The authorization model in argos is a combination of role based access and attribute based access control.
For both methods permissions are used to grant access to a resource.


### Attribute based access
For the attribute based approach the access is based on the permissions in the label hierarchy.
The label hierarchy can be seen as a virtual directory system with permissions attached to a particular label for a particular user.
Inside a label there can be other labels a supply chains or service accounts.
Since most endpoints are connected to the hierarchy via either a service account or via the supplychain identifier the permissions are resolved on the basis of the aggregated permissions down the hierarchy tree.

For example we have a hierarchy consisting of one root label A and two child labels B and C and 2 supplychains SB under B and SC under C.
If the user has READ permissions on label a he/she also has read permission on labels B and C and their respective supply chains.
If the user has LAYOUT_ADD permission on label B then he/she is only aloowed to add or edit a layout on the supplychain under B but not under C.

### Role based access
Role based access is used to resolve permissons in order to allow access to endpoints wich are not connected to the hierarchy described above.
This can be for example to allow users to see their personal account details or to allow administrators to create root labels and grant other users permissions to these labels.

## Permissions
In argos there are the following permissions:
  *  READ,
  *  TREE_EDIT,
  *  LOCAL_PERMISSION_EDIT,
  *  ASSIGN_ROLE,
  *  LINK_ADD,
  *  LAYOUT_ADD,
  *  VERIFY,
  *  PERSONAL_ACCOUNT_READ,
  *  SERVICE_ACCOUNT_EDIT


### Service Accounts

### Permission Management

## Roles

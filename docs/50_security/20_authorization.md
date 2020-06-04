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
For both methods permissions are used to grant access to a resource endpoint.
In the explanation below when we mention a user we mean either a personal account or a service (system) account.

### Attribute based access
For the attribute based approach the access is based on the permissions in the label hierarchy.
The label hierarchy can be seen as a virtual directory system with permissions attached to a particular label for a particular user.
Inside a label there can be other labels a supply chains or service accounts.
Most endpoints are connected to the hierarchy via either a service account or via the supplychain identifier.
The permissions for a label cascade and aggregate up the hierarchy tree (meaning from the root label towards the branches).

For example we have a hierarchy consisting of one root label A and two child labels B and C and 2 supplychains SB under B and SC under C.
If the user has READ permissions on label a he/she also has read permission on labels B and C and their respective supply chains.
If the user has LAYOUT_ADD permission on label B then he/she is only aloowed to add or edit a layout on the supplychain under B but not under C.

An exception to the general rule is made for READ permissions these permissions also cascade down the hierarchy.
When in the example above a READ permission is set on B but not on A then A is still visible to the user.

### Role based access
Role based access is used to resolve permissons in order to allow access to endpoints wich are not connected to the hierarchy described above.
This can be for example to allow users to see their personal account details or to allow administrators to create root labels and grant other users permissions to these labels.

### Permissions
The following permissions are defined:
  *  READ the user is granted access to read operations.
  *  TREE_EDIT the user is granted access to crud operations on labels and supply chains.
  *  LOCAL_PERMISSION_EDIT the user is granted access to operations that change permissions for users on labels.
  *  ASSIGN_ROLE the user is granted access to assign a role to a user.
  *  LINK_ADD the user is granted access add a link this is default for service accounts and can be assigned to personal accounts when a manual approval step is required.
  *  LAYOUT_ADD the user is granted access to sign and store a layout.
  *  VERIFY the user is granted access to perform a verification run for the supply chain.
  *  PERSONAL_ACCOUNT_READ the user is granted access to get access to the account details.
  *  SERVICE_ACCOUNT_EDIT the user is granted access to create a service account.

### Service Accounts
A Service account is an account which is created for a system to interact with the argos notary service.
This account is always connected to a particular label in the hierarchy and has a fixed immutable set of permissions,
LINK_ADD and VERIFY.

Examples of systems that use a service account are for example a jenkins or xldeploy server.
When creating a service account on a label a public private keypair is also created for this account.

### Permission Management
Permission management can be done by any personal account user if granted the LOCAL_PERMISSION_EDIT permission on a label.
If the personal account has an administrator role assigned a LOCAL_PERMISSION_EDIT permission on root labels is granted.

### Roles
Role based access is done on endpoints that are not connected to the hierarchy these roles have predefined sets of permissions.
At the time of writing there is no functionality implemented to manage roles.

The following roles are defined:
* USER every new personal account registration gets this role assigned this role has one permission PERSONAL_ACCOUNT_READ allowing the user to see their account details.
* ADMINISTRATOR the first personal account registration on a clean install of the argos notary service gets the role ADMINISTRATOR assigned.

The following (global) permissions are assigned to this role:
* READ
* LOCAL_PERMISSION_EDIT
* TREE_EDIT
* VERIFY
* ASSIGN_ROLE


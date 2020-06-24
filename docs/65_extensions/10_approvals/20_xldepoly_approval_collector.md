---
id: 20_xldeploy_approval_collector
title: XL Deploy Approval
sidebar_label: XL Deploy Approval
---
:::caution
This is page is work in progress
:::

## Installation

The collector should be installed in such a way that it could connect to the `XL Deploy` server 
and that the personal user can connect from the browser to the collector service. More information can be found in the 
[Approval Framework page](10_approval_collector).

### Standalone

It is recommended to use the Kubernetes installation for production.

#### Prequisites

* Docker

#### Installation

```shell
docker run -d -p 8080:8080 --restart=unless-stopped \
           -e "spring.profiles.active=XLDEPLOY" \
           -e "argos-collector.collectortypes.xldeploy.baseurl=http://xl-deploy-host:4516" \
           --name xldeploy-collector argosnotary/argos-collector-service
```

### Kubernetes

#### Prerequisites

* kubernetes: [documentation](https://kubernetes.io/docs/)
* helm3 3.1+: [documentation](https://helm.sh/docs/intro/install/)

#### Installation

Add the `argosnotary` Helm repository
```bash
helm repo add argosnotary https://argosnotary.github.io/charts
helm repo update
```
Install XL Deploy Argos Collector
```bash
helm install xldeploy argosnotary/xldeploy-argos-collector --set "collector.baseurl=http://xl-deploy-host:4516"
```

## Configuration

An `approval` in the Argos Notary Service, defined on a `Supply Chain`, has one or more collector definitions. One
of these definitions could be a XL Deploy Collector. 

### Add an XL Deploy Approval

Add a XL Deploy Approval following these steps

1. In the Argos Notary Service go to the `Supply Chain` on which there should be an approval.
2. Right mouse button > choose `Manage Layout`

![Manage Layout](/img/approvals/manage_layout.png)

3. In the `Layout Segment` add a `Step`

![Add Step](/img/approvals/add_step.png)

4. Choose `Approval Step`

![Approval Step](/img/approvals/choose_approve_step.png)

4. Fill in fields

![Fields](/img/approvals/add_xld_collector.png)

* Choose a relevant name
* The `Service url` is the url of the collector defined in the pervious [installation step](#install)
* `Application Name` is the `XL Deploy` `udm.Application` Name
* Save, and after finishing the layout sign and submit it to the Argos Notary Service

## Approve

If the `Functionary` is a person and her or his key is one of the authorized keys on the step and has the 
`add a link` permission, this person can do an apporval on the `Supply Chain`.

1. In the Argos Notary Service go to the `Supply Chain` on which there should be an approval.
2. Right mouse button > choose `Approve step`

![Approve Step](/img/approvals/approve_step.png)

3. Choose the approval

![Fields](/img/approvals/select_approval.png)

4. Fill in fields

![Fields](/img/approvals/fill_in_xld_fields.png)

* Username and password should be the XL Deploy credentials
* Version is the name of the `udm.DeploymentPackage`

5. Add, optionally, more approvals with `next`
6. Approve and sign




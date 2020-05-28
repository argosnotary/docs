---
id: 10_overview
title: Overview
---

## Introduction
Argos provides a framework to protect the integrity of a [**software supply chain**](../50_reference/30_terminology#software-supply-chain-or-ssc). It provides a [**REST API**](../50_reference/10_api) and client libraries in order to protect the integrity of [**artifacts**](../50_reference/30_terminology#artifact) produced by a [**software supply chain**](../50_reference/30_terminology#software-supply-chain-or-ssc).
 
It does so by verifying that each [**step**](../50_reference/30_terminology#step) in the chain is carried out as planned, by authorized systems or personnel, and that the product is not tampered with in transit.

It allows a [**project owner**](../50_reference/30_terminology#project-owner) to create a layout. A [**layout**](../50_reference/30_terminology#layout) lists the sequence of steps of the software supply chain, and the [**functionaries**](../50_reference/30_terminology#functionary) authorized to perform these steps.

When a [**functionary**](../50_reference/30_terminology#functionary) performs a [**step**](../50_reference/30_terminology#step) it gathers information about the used commands and the related files and sends it to the **Argos Notary Service** in a [**link**](../50_reference/30_terminology#link) metadata file. As a consequence [**link**](../50_reference/30_terminology#link) files provide the required evidence to establish a continuous chain that can be [**verified**](../50_reference/30_terminology#verification) against the steps defined in the [**layout**](../50_reference/30_terminology#layout)

The [**layout**](../50_reference/30_terminology#layout), signed by the [**project owners**](../50_reference/30_terminology#project-owner) together with the links, signed by the designated [**functionaries**](../50_reference/30_terminology#functionary) for a particular [**supply chain run**](../50_reference/30_terminology#scr), can be verified by the service.

This **Overview** is a short description of the system. A complete definition can be found in other parts of the documentation.

## System overview
 
### Involved actors

In the context of Argos Notary, a actor has duties and has to perform a set of actions.

In the description of the actors that follows, it is important to remember that the framework has been designed to allow a large amount of flexibility for many different use cases. Given that every project uses a very specific set of tools and practices, this is a necessary requirement for Argos Notary.

There are three different kind of actors in the framework:

* **Project Owner**: defines the _layout_ of a software _supply chain_.
* **Functionary**: performs a _step_ in the _supply chain_ and provides a signed _link_ as a record that such a _step_ was carried out.
* **Client**: Performs _verification_ on a set of _end products_ by requesting a validation of the set on the Argos Notary Service.

_Layouts_ and _links_ are signed with the private RSA key of the actor.

### Components

Argos Notary has three types of components

* **Argos Notary Service**: An integrated service to store and manage all Argos Notary objects
* **Artifact Collectors**: Services to collect _Artifacts_ in the same as domain as the _Artifact_ store, e.g. Git, Maven...
* **Deployment Verifiers**: Extensions on Deployment Mechanisms to validate end products to deploy.  

### Workflow example

To exemplify the working of the system, we will describe a simple scenario.

Consider a _project owner_, Alice, and her five _functionaries_, Diana, Bob, Carl, Build and Client. Alice wants Diana to write a Python script (foo.py). Then, Alice wants Build to package the script into a tarball (foo.tar.gz). This tarball will be sent to the client, Client, as part of the _end product_. Client wants to deploy this target file, foo.tar.gz.

Alice will create a _layout_ object that will be used by the Argos Notary Service during the _verification_ request by Client to make sure of the following:

* That Bob and Carl approved the script which was written by Diana
* That the script written by Diana was input for the packaging of the tarball done by Build.
* That the tarball _end product_ is approved by Alice.

In order for the Argos Notary Servive to do this, it will need four _link_ objects and the _layout_: first, Alice’s _layout_, describing the requirements listed above. Then, 2 _link_ objects signed by Bob and Carl which correspond to the approval of Diana’s action of writing a script, and a _link_ object signed by Build for the _step_ of packaging the script. Finally, there should be a _link_ object, including the target file (foo.tar.gz) _artifact_, signed by Alice to approve the all _end products_.

When the Argos Notary Service verifies the end product on behalf of Deploy, it will perform the following checks:

1. The _layout_ exists and is signed with a trusted key (in this case, Alice's).
2. All _end product_ _artifacts_ match with the expected _end products_ in the _layout_. 
2. Every _step_ in the _layout_ has at least as much as needed corresponding _link_ objects signed by the intended _functionaries_, as described in the _layout_.
3. All the _materials_ and _products_ listed in the _link_ object match, as specified by the _layout_. This will be used to prevent packages from being altered without a record (missing _artifacts_ in the _link_ object), or tampered with while in transit. In this case, the _products_ reported by Bob should match the _materials_ reported by Build and so on.

If all of these _verifications_ pass, the Argos Notary Service returns the valid response on the request.

![Workflow](/img/00_overview_workflow.svg)<sub>1. the workflow for this example</sub>

## Acknowledgement



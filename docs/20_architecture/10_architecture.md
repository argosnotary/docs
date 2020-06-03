---
id: 10_architecture
title: Argos Notary Architecture
sidebar_label: Architecture
---

:::caution
This is page is work in progress
:::

In order to allow other parties to easily add in their own storage and
api implementations into the service. The architecture is organized
around the so called hexagonal architecture pattern.

The hexagonal architecture is based on three principles and techniques:

- Explicitly separate Application, Domain, and Infrastructure
- Dependencies are going from Application and Infrastructure to the Domain
- We isolate the boundaries by using Ports and Adapters

See also these articles for more information about this architectural pattern:

* [ports and adapters architecture](https://www.thinktocode.com/2018/07/19/ports-and-adapters-architecture/)
* [hexagonal architecture](https://blog.octo.com/en/hexagonal-architecture-three-principles-and-an-implementation-example/)

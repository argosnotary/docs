---
id: 22_signing
title: Signing of Layout or Link
sidebar_label: Signing
---
:::caution
This is page is work in progress
:::

Every Link is signed 1 time and every Layout 1 or more times. This signature is stored
in the metablock which is wrapping the link or layout.

The objects to sign are serialized to JSON strings witch are canonalized by removing all 
whitespace and sorting all attributes. After this the JSON string is signed by `SHA256withRSA`.

## MetaBlock

![MetaBlock](/img/plantuml/70_reference_metablock.svg)

## Specification

```
type LayoutMetaBlock = {
    signature: Signature[],
    layout: Layout
}

type LinkMetaBlock = {
    signature: Signature,
    supplyChainId: String,
    link: Link
}

type Signature = {
    keyId: sha256 hash of public key,
    signature: sha256 with rsa signature of link or layout
}
```
## JSON sample

```
{
  "link": {
    "runId": "69af2dd",
    "layoutSegmentName": "segment1",
    "materials": [
      {
        "uri": "src/test/java/com/rabobank/argos/test/ArgosServiceTestIT.java",
        "hash": "61a0af2b177f02a14bab478e68d4907cda4dc3f642ade0432da8350ca199302b"
      }
    ],
    "stepName": "build",
    "products": [
      {
        "uri": "src/test/java/com/rabobank/argos/test/ArgosServiceTestIT.java",
        "hash": "61a0af2b177f02a14bab478e68d4907cda4dc3f642ade0432da8350ca199302b"
      }
    ]
  }
}
```
## Sign




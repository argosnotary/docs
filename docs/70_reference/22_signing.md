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
    signature: ECDSA with sha384 signature of link or layout
    hashAlgorithm: SHA-384
    keyAlgorithm: EC
}
```
## JSON sample

```
{
    "signature": {
      "keyId": "889c4682999196528ad4fe32c2ed1463c9a556800c89514cb1acee16406ac926",
      "signature": "MzA0NjAyMjEwMDllNTViOGM1ODZjODdiYTM5MDFmMWJmMWMxZWNlZmIzOTU2ZDlkMzM5OTU2Yjg2YjBhN2FkNzk4YWUzNGUyNmEwMjIxMDBmNmQ4NmRhYTE1YmMzNDE5MjM4YWQ3YjBlNDk1NzE1MjZiZTE0ODkwNmU2Mzg1NWU2ODcxOTBiZjE2Y2Y0NmE0",
      "keyAlgorithm": "EC",
      "hashAlgorithm": "SHA384"
    },
    "link": {}
}
```
## Sign




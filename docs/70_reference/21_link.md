---
id: 21_link
title: Link
sidebar_label: Link
---
:::caution
This is page is work in progress
:::
## Link

A Link object is created to gather evidence associated with a [Step](20_layout/#step) in the Supply Chain. It is a container with 
`materials` and `products`, which are lists with [Artifacts](#artifact)

After gathering all evidence it is digital signed by the `Functionary` running the step and persisted, together with its [signature](22_signing), in the `Argos Service`.

Every Link has a runId. This runId is as unique as possible to group Links which belong to each other. As an example all Link objects in a 
[LayoutSegment](20_layout/#layoutsegment). A git commit can be used, a timestamp or an application version or something
other which is more or less unique. This used during the [verification process](23_verification).  

![Link](/img/plantuml/70_reference_link.svg)

## Artifact

An `Artifact` is has an uri and the secure hash of the target of the uri. At this moment only files are supported.

### Default exlusion pattern
Gathering of artifacts has the default `glob` exclusion pattern `**.{git,link}**`.


## Command __DEPRECATED!!__

## Specification

```
type Link = {
    stepName: String,
    layoutSegmentName: String,
    runId: String,
    materials: Artifact[],
    products: Artifact[],
    command: String
}

type Artifact = {
    uri: unix file uri,
    hash: sha256 hash
}
```

## JSON sample

```
{
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
```





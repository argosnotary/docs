---
id: 20_layout
title: Layout
sidebar_label: Layout
---
:::caution
This is page is work in progress
:::
## Introduction

A Layout in Argos Notary dictates the series of steps that need to be carried out in the Software Supply Chain to create the final end product. The layout includes ordered segments and steps, requirements for the steps, and the list of actors (or functionaries) in charge of carrying out every step. The steps within the supply chain are laid out by a project owner.

The Layout is stored in Argos Notary together with its signature(s) in a Metadata object. A Layout is only valid with the required number of authorized signatures. 

## Layout

A Layout should be signed by one ore more of the authorized persons. A person is authorized if the keyId of the Key of the person is one of the key identifiers in the authorizedKeyIds list.

The [Expected End Products](#expected-end-products) is a list of [Match Rules](#matchrule) which should match all software products delivered by the Software Supply Chain

A [Layout Segment](#layoutsegment) is a container of [Steps](#step) which belong together. e.g all steps in a Jenkins pipeline.

The public keys of all digital signkeys used in the Layout should be in `keys` list.

### Class diagram
![Layout](/img/plantuml/70_reference_layout.svg)

## LayoutSegment

A Layout has one or more LayoutSegments. A LayoutSegment is a cluster of Steps of wich the Links will 
get the same runId. As an example all steps in a Jenkins pipeline can belong to the same LayoutSegment and
in the pipeline all Link objects will get the same runId.

All segments in the layout together should form a acyclic directed graph with the segments and the expected end 
products as nodes and the matchrules as edges. The match rules in the expected end products should point to 1 segment 
which should also be the starting point of
the graph.

This constraints are necessary to create contexts used during the [verification](24_verification) of end products.

## Step

Every Link object created in the Supply Chain will be associated with a Step in the Layout. A Step describes the [rules](#rules) 
the `materials`, files before the execution,  and `products`, files after execution, should follow. 

`authorizedKeyIds` are the keyIds of the Accounts which should be used to create valid Link objects.

`requiredNumberOfLinks` defines how many Link objects should at least be made by different accounts. 

## Expected End Products
The expected end products is a list of matchrules pointing to a segment with all the products delivered 
by this Supply Chain as they are deployed or installed. 
This can be more than 1 file or type of file. e.g. service jars, client jars or installation packages.

A client can do a request with a list of artifacts matching the expected end products to verify these artifacts.

## [Artifact](21_link#artifact) Rules
Rules in Argos Notary can be compared with firewall rules. The rules enforce the existence of artifacts before running of a step(expected materials) or after running of the step(expected products). As an example, the "build" step can use the materials from the "checkout-git" step and has a jar artifact in the products. 

All rules have a glob pattern equivalent with [gitignore](https://git-scm.com/docs/gitignore) pattern 
matching. The pattern will be matched against uris reported for `materials` or `products` in the [link](21_link) data. 
The following rules can be specified:

* MATCH: The MatchRule will be explained in [MatchRule](#matchrule).
* ALLOW: indicates that artifacts matched by the pattern are allowed and consumed by this rule.
* DISALLOW: indicates that artifacts matched by the pattern are not allowed.
* REQUIRE: indicates that a pattern must appear and are consumed by this rule.
* CREATE: indicates that products matched by the pattern must not appear as materials of the step.
* CREATE_OR_MODIFY: indicates that products matched are `MODIFIED` or `CREATED` compared to the materials of the step.
* DELETE: indicates that materials matched by the pattern must not appear as products of the step.
* MODIFY: indicates that products matched by this pattern must appear as materials of the step, and their hashes must not by the same.

### MatchRule

A MatchRule indicates that the artifacts filtered using `sourcePathPrefix/pattern` must be matched to a `destinationType`(`MATERIALS` or `PRODUCTS`) 
from a `destinationStep` and `destinationSegment` with the `destinationPathPrefix/pattern` filter. 
For example, match `foo` with `PRODUCTS` from the step `compilation` in the segment `jenkins` indicates 
that the file `foo`, a product of the step `compilation` in the segment `jenkins`, 
must correspond to either a material or a product in this step (depending on where 
this artifact rule was listed).

The `sourcePathPrefix`, `destinationPathPrefix` and  `destinationSegmentName` properties are optional, 
The `pathPrefixes` are used to match products and materials whose path differs from the one presented 
in the destination step. This is the case for steps that relocate files as part of their tasks. 
For example match `foo` with `sourcePathPrefix` `lib` and `destinationPathPrefix` `build/lib` will 
ensure that the file `lib/foo` matches `build/lib/foo` in the destination step.

If `destinationSegmentName` isn't defined the destination step should be in the same Layout Segment 
as the current step

The MatchRules in the expected end products combined with the MatchRules in the steps refering 
to other segments should create a directed graph of the Layout Segments.


### Rule processing

Artifact rules reside in the `expectedProducts` and `expectedMaterials` fields of a step and are applied sequentially on a queue of `Artifacts` or from the step's corresponding link metadata. They operate in a similar fashion as firewall rules do. This means if an artifact is successfully consumed by a rule, it is removed from the queue and cannot be consumed by subsequent rules. There is an implicit `DISALLOW` with the pattern `**` at the end of each rule list. Argos Notary verification fails if an artifact was not consumed by an earlier rule. Here, we describe an algorithm to illustrate the behavior of the rules being applied:

```python
VERIFY_EXPECTED_ARTIFACTS(rules, link)

# load the artifacts from the link materials
artifacts = load_artifacts_as_queue(link.materials)

# iterate over all the rules
for rule in rules:
  consumed_artifacts, rule_error = apply_rule(rule, artifacts)

  if rule_error:
    return FAILURE

  artifacts -= consumed_artifacts
  
  if not artifacts is empty:
    return FAILURE

return SUCCESS
```

### Match Rule processing

The match rule is used to tie different steps together, by means of their materials and products. The main rationale behind the match rule is to 
identify the origins of artifacts as they are passed around in the supply chain. In this sense, the match rule will be used to identify which step 
should be providing a material used in a step, as well as force products to match with products of previous steps.

In order to ensure the correctness of the match rule, it is important to describe the way it operates. To avoid any ambiguities, this will be done 
with the following pseudocode:

```python
MATCH(source_artifacts, destination_artifacts,
  rule)

# Filter source and destination materials using the rule’s patterns
source_artifacts_filtered = filter(rule.source_prefix + rule.source_pattern,
                                   source_artifacts)

destination_artifacts_filtered = \
    filter(rule.destination_prefix + rule.destination_pattern,
             destination_artifacts)

# Normalize on source prefix by removing destination prefix if available and adding source prefix
# remove destination profix
for artifact in destination_artifacts_filtered:
  artifact.path -= rule.destination_prefix
# add source prefix
for artifact in destination_artifacts_filtered:
  artifact.path += rule.source_prefix

# Create an empty list for consumed artifacts
consumed_artifacts = []

# compare both sets
for artifact in source_artifacts_filtered:
  destination_artifact = find_artifact_by_path(destination_artifacts,
                                                artifact.path)
  # the artifact with this path does not exist?
  if destination_artifact == NULL:
    continue

  # are the files not the same?
  if destination_artifact.hash != artifact.hash:
    continue

  # Only if source and destination artifact match, will we mark it as consumed
  add_to_consumed_artifacts(artifact)

# Return consumed artifacts to modify the queue for further rule processing
return consumed_artifacts

```

## Specification

```
type Layout = {
    keys: Key[],
    authorizedKeyIds: KeyIdentifier[],
    expectedEndProducts: MatchRule[],
    layoutSegments: LayoutSegment[]
}

type Key = {
    id: KeyIdentifier,
    key: PublicKey
}

type KeyIdentifier = sha256(PublicKey)

type Rule = {
    ruleType: RuleType,
    pattern: glob pattern
}

enum RuleType = {
    ALLOW, CREATE, CREATEORMODIFY, DELETE, DISALLOW, MATCH, MODIFY, REQUIRE
}

type MatchRule = {
      ruleType: MATCH,
      pattern: glob pattern,
      sourcePathPrefix: unix style path,
      destinationType: DestinationType,
      destinationStepName: String,
      destinationPathPrefix: unix style path,
      destinationType: DestinationType
      destinationStepName: String,
      destinationSegmentName: String
}

enum DestinationType {
    PRODUCTS, MATERIALS
}

type LayoutSegment = {
    name: String,
    steps: Step[]
}

type Step = {
      name: String,
      authorizedLeyIds: KeyIdentifier[],
      requiredNumberOfLinks: Int,
      expectedMaterials: Rule[],
      expectedProducts: Rule[]
}

```



## JSON Sample
```json
{
    "keys": [
        {
            "id": "c8df0a497ab0df7136c4f97892f17914e6e5e021fdc039f0ea7c27d5a95c1254",
            "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnB7t5WVvXmbwKo7vn49tDyigfZF+wqB68v4i2fgv+/625yVomAKrtQDX8ANTCbZ6UQEkXNQhI9muPo8hhYb2zEaEdEckslSQ9lFJgDHCHekC2EYwXmc4VnwLzyiITtlXSSveav5qUpGVb7t7AK4f9yueojwqUjgQGkXgmeDrg8r15G/nVuYq5WyIS3OKxXKQmm2mJTr5A+kt8SiYPmDQoJwkK6ezZU7qsobY5jloU5SdIiGn2d8KHioj5ekki9kgBszuwHHqg94Ml6JT28EWRKdfBVA2P7PRLzl3V8qdA0srkTsuy4+emEI+NAeNQkeMsucfW4xIVBMQZ28GIFmJcwIDAQAB"
        },
        {
            "id": "b91bec49e7aaaeeda162970c03193baef561c10337483a8bc0741d514dc63b9c",
            "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwhHPSza/Vx1VVzlXAXByXk4z13Q4JZI6fphr0LK5mdFlckHzqNOP9FtXzDxbJawQdDkFQAIvmBRBZHOP78z7jtSGhQLY3qpIJ82ztyBT/WAH9eyX+z4eZ5vur42jLsvrn9qKcXtUXcuiMNLUzBT251aoJcgsG6+fN7J1t5bcSLfwlWNrbe4VK2kjVu3Ep6YUKXmzJQvJ97YlLsVKTfod+3IrFOJBmHbrUJUDJh09mJ5Conkp44IYNy3zwuPqaJphuiVVszlaAnO2OUnwRdJJ8qs0BNJa+n3No9CTdEU6IvirZ1j/Bjmrl6t6Lc9PhZxNQeAriHRBeFufGTvvWmS9WwIDAQAB"
        },
        {
            "id": "a97daeaf3afaed859472a367da7a860b4b90eefb97fe51384bd45e9eed020b5b",
            "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApsOT7tBT27EF2EnYenWJqRjl+2Eg8m9tEmjNc2d3pTK+wCLMFaeyoAai3cSGafSiVZd9GVaXeUlVPCF/lHUpA0GT6gdMUyynHC/vNInqXsd1d8hLKaVFsI+KWSNbU86h9h7p1nHvLlfZ55UBrtiiRafl0L0tWWhlNtiDGQlQ/ZlyM/jzYZAtHBUR0ex/SI2c8L8Wk3ZqbxoctrbHRmlqDTgGBEL+sxajHgELj8t7Nt7nKMhvEvyG3C7vckIXxBnAW8dfZtw9SEQooq2dL5u5ZyPm1zVwLyAFtOe+Fx/NC6RVt3hUnrgKHWjeEeDqKk0NYnduOSFZA7R1tOHm+iNQFQIDAQAB"
        }
    ],
    "authorizedKeyIds": [
        "c8df0a497ab0df7136c4f97892f17914e6e5e021fdc039f0ea7c27d5a95c1254"
    ],
    "expectedEndProducts": [
        {
            "pattern": "**",
            "destinationType": "PRODUCTS",
            "destinationStepName": "collect_dar",
            "destinationSegmentName": "xldeploy"
        }
    ],
    "layoutSegments": [
        {
            "name": "jenkins",
            "steps": [
                {
                    "name": "clean",
                    "authorizedKeyIds": [
                        "b91bec49e7aaaeeda162970c03193baef561c10337483a8bc0741d514dc63b9c"
                    ],
                    "requiredNumberOfLinks": 1,
                    "expectedMaterials": [
                        {
                            "ruleType": "ALLOW",
                            "pattern": "**"
                        }
                    ],
                    "expectedProducts": [
                        {
                            "ruleType": "DISALLOW",
                            "pattern": "target/**"
                        },
                        {
                            "ruleType": "ALLOW",
                            "pattern": "**"
                        }
                    ]
                },
                {
                    "name": "build",
                    "authorizedKeyIds": [
                        "b91bec49e7aaaeeda162970c03193baef561c10337483a8bc0741d514dc63b9c"
                    ],
                    "requiredNumberOfLinks": 1,
                    "expectedMaterials": [
                        {
                            "ruleType": "MATCH",
                            "pattern": "**",
                            "destinationType": "PRODUCTS",
                            "destinationStepName": "clean"
                        }
                    ],
                    "expectedProducts": [
                        {
                            "ruleType": "CREATE",
                            "pattern": "target/argos-test-app.war"
                        },
                        {
                            "ruleType": "ALLOW",
                            "pattern": "**"
                        }
                    ]
                },
                {
                    "name": "deploy",
                    "authorizedKeyIds": [
                        "b91bec49e7aaaeeda162970c03193baef561c10337483a8bc0741d514dc63b9c"
                    ],
                    "requiredNumberOfLinks": 1,
                    "expectedMaterials": [
                        {
                            "ruleType": "MATCH",
                            "pattern": "target/argos-test-app.war",
                            "destinationType": "PRODUCTS",
                            "destinationStepName": "build"
                        },
                        {
                            "ruleType": "ALLOW",
                            "pattern": "**"
                        }
                    ],
                    "expectedProducts": [
                        {
                            "ruleType": "MATCH",
                            "pattern": "target/deployit-working-dir/**",
                            "destinationType": "PRODUCTS",
                            "destinationStepName": "build"
                        },
                        {
                            "ruleType": "MATCH",
                            "pattern": "target/*.war",
                            "destinationType": "MATERIALS",
                            "destinationStepName": "deploy"
                        },
                        {
                            "ruleType": "ALLOW",
                            "pattern": "**"
                        }
                    ]
                }
            ]
        },
        {
            "name": "xldeploy",
            "steps": [
                {
                    "name": "collect_dar",
                    "authorizedKeyIds": [
                        "a97daeaf3afaed859472a367da7a860b4b90eefb97fe51384bd45e9eed020b5b"
                    ],
                    "requiredNumberOfLinks": 1,
                    "expectedMaterials": [
                        {
                            "ruleType": "ALLOW",
                            "pattern": "**"
                        }
                    ],
                    "expectedProducts": [
                        {
                            "ruleType": "ALLOW",
                            "pattern": "*"
                        },
                        {
                            "ruleType": "MATCH",
                            "pattern": "**",
                            "destinationPathPrefix": "target/deployit-working-dir",
                            "destinationType": "PRODUCTS",
                            "destinationStepName": "build",
                            "destinationSegmentName": "jenkins"
                        }
                    ]
                }
            ]
        }
    ]
}
```




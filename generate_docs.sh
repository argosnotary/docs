#!/bin/bash

VERSION=$1

BRANCH=master

DOC_DIRECTORY="docs/50_reference"

JARS="argos-service argos4j"

usage() {
    echo "USAGE: $0 <version>"
    exit 1
}

if [ -z "${VERSION}" ]; then
    echo "ERROR: no version"
    usage
fi

rm -rf  ${DOC_DIRECTORY}/javadoc/*/* docs/50_reference/openapi

npx openapi-generator generate -i "https://raw.githubusercontent.com/argosnotary/argos-parent/${BRANCH}/argos-service-api/api.yml" -o ${DOC_DIRECTORY}/openapi -g html2

for jar in $JARS; do
    curl -OLJ "https://repo1.maven.org/maven2/com/rabobank/argos/${jar}/${VERSION}/${jar}-${VERSION}-javadoc.jar"
    unzip ${jar}*.jar -d ${DOC_DIRECTORY}/javadoc/${jar}
done

rm argos*.jar


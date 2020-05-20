#!/bin/bash
#
# Copyright (C) 2019 - 2020 Rabobank Nederland
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

BRANCH=master

DOC_DIRECTORY="docs"

REFERENCE_DIRECTORY="${DOC_DIRECTORY}/50_reference"

JARS="argos-service argos4j"

rm -f *.jar

read VERSION < VERSION
echo "generating documents for Argos Notary version ${VERSION}"

npx openapi-generator generate -i "https://raw.githubusercontent.com/argosnotary/argos-parent/${BRANCH}/argos-service-api/api.yml" -o ${REFERENCE_DIRECTORY}/openapi -g html2

for jar in $JARS; do
    curl -OLJ "https://repo1.maven.org/maven2/com/rabobank/argos/${jar}/${VERSION}/${jar}-${VERSION}-javadoc.jar"
    unzip -u ${jar}*.jar -d ${REFERENCE_DIRECTORY}/javadoc/${jar}
done

curl -OJL "http://sourceforge.net/projects/plantuml/files/plantuml.jar/download"

java -jar plantuml.jar -tsvg ${DOC_DIRECTORY}/images/plantuml/


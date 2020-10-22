#!/bin/bash
#
# Copyright (C) 2020 Argos Notary
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

GENERATED_DIRECTORY="static/generated"
PLANTUML_DIRECTORY="static/img/plantuml"

JARS="argos-service argos4j"

rm -f *.jar

read VERSION < VERSION
echo "generating documents for Argos Notary version ${VERSION}"

npx openapi-generator generate -i "https://raw.githubusercontent.com/argosnotary/argos-parent/${BRANCH}/argos-service-api/api.yml" -o ${GENERATED_DIRECTORY}/openapi -g html2

for jar in $JARS; do
    rm -f ${GENERATED_DIRECTORY}/javadoc/${jar}/*
    curl -OLJ "https://repo1.maven.org/maven2/com/argosnotary/argos/${jar}/${VERSION}/${jar}-${VERSION}-javadoc.jar"
    unzip -u ${jar}*.jar -d ${GENERATED_DIRECTORY}/javadoc/${jar}
done

#curl -OJL "http://sourceforge.net/projects/plantuml/files/plantuml.jar/download"

#java -jar plantuml.jar -tsvg "${PLANTUML_DIRECTORY}/"


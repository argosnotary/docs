# Argos Notary Documentation

## Development

### Run local website

```shell
   $ npm install
   $ npm run start
```

### Generate openapi documentation, javadoc and uml images with plantuml

```shell
   $ ./generate_docs.sh
```

## Deploy to argosnotary.github.io

At first commit the made changes.

```
   $ export GIT_USER=<git user>
   $ export USE_SSH=true # optional
   $ yarn deploy
```


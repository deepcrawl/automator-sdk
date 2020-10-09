# Automator Tools Extension for Azure Devops

This extension can be installed through Azure Devops extensions and it can be found under the name "Automator Tools".

It has the following tasks:

## Tasks

## Run Automator Build Task (`run-automator-build-task`)

### Inputs

#### Required variables

```
userKeyId: <string>
userKeySecret: <string>
testSuiteId: <string>
```

#### Optional variables

```
startOnly: <boolean>
ciBuildId: <string>
```

### Requirements

- Install yarn globally

```
npm install -g yarn
```

- Install npm packages

```
yarn
```

### Build

```
yarn build
```

### Lint

```
yarn lint
```

## Release

In order to release, the following steps should be followed:

- In each of your modified task, increment the version of the task in `task.json`
- Increment the version of the extension accordingly, in `vss-extension.json`
- Package the extension:
```
yarn release
```
- Manually release the extension through Azure Devops extensions

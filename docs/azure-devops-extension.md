# Azure Devops Extension

This extension can be installed through Azure Devops extensions and it can be found under the name "Automator Tools".

It has the following tasks:

## Tasks

## Run Automator Build Task (`run-automator-build-task`)

### How to run

- Ask for extension permissions
- Once permission is given, install the extension from: https://marketplace.visualstudio.com/items?itemName=deepcrawl.automator-tools
- Generate an API key on: https://app.deepcrawl.com/dc-api
- Make sure you have the test suite created and the id, if not create your test suite in automator: https://automator.deepcrawl.com/
- Add the following task to your azure devops pipeline `yaml` file:

```yaml
- task: run-automator-build-task@1
  inputs:
    userKeyId: 'USER_KEY_ID' (string - generate new api key on deepcrawl core app)
    userKeySecret: 'USER_KEY_SECRET' (string - generate new api key on deepcrawl core app)
    testSuiteId: 'TEST_SUITE_ID' (string - use your created test suite id)
    ciBuildId: 'CI_BUILD_ID' (optional - string)
    startOnly: false (optional - boolean - use it if you want to skip polling)
```

*Note: Unless `startOnly` is set to `true`, max polling time is set to 50 minutes. If the build takes longer than 50 minutes, it will automatically fail the pipeline.* 

### How to test (QA)

- Create accounts on: https://dev.azure.com/ (use @deepcrawl email address)
- Ask for extension permissions
- Once permission is given, install the extension from: https://marketplace.visualstudio.com/items?itemName=deepcrawl.automator-tools
- Generate an API key on: https://app.deepcrawl.com/dc-api
- Make sure you have the test suite created and the id, if not create your test suite in automator: https://automator.deepcrawl.com/
- Create new private repository with default README: https://github.com/new
- Go to your Azure Organisation page: http://dev.azure.com/
- Create new project
- Pipelines -> Create new pipeline
- Authorise Github and set the repo to the one created previously
- Install it to your repo
- Select Starter Pipeline , once in Configure tab
- On next step, complete the `yaml`file with:

```yaml
trigger:
- master
pool:
  vmImage: 'ubuntu-latest'
steps:
- task: run-automator-build-task@1
  inputs:
    userKeyId: 'USER_KEY_ID' (string - generate new api key on deepcrawl core app)
    userKeySecret: 'USER_KEY_SECRET' (string - generate new api key on deepcrawl core app)
    testSuiteId: 'TEST_SUITE_ID' (string - use your created test suite id)
    ciBuildId: 'CI_BUILD_ID' (optional - string)
    startOnly: false (optional - boolean - use it if you want to skip polling)
```

- Save and run
- Go to the job and check it
- Once tested, make sure to remove the deepcrawl api key generated 

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

### Running locally

To run locally, set the following environment variables:

```
INPUT_USERKEYID: <string> (required)
INPUT_USERKEYSECRET: <string> (required)
INPUT_TESTSUITEID: <string> (required)
INPUT_STARTONLY: <boolean> (optional)
INPUT_CIBUILDID: <string> (optional)
```

and run:

```
yarn start
```

### Test

```
yarn test
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

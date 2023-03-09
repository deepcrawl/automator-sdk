# Azure Devops Integration

[Marketplace](https://marketplace.visualstudio.com/items?itemName=deepcrawl.automator-tools) | [Github Repository](https://github.com/deepcrawl/automator-sdk/tree/master/azure-devops-extension)

## Introduction

In order to integrate with Azure Devops, you need to use our Lumar Protect Azure Devops extension:

This extension can be installed through Azure Devops extensions and it can be found under the name "Protect Tools".

It has the following tasks:

## Run Lumar Protect Build Task (`run-automator-build-task`)

### How to run

- Ask for extension permissions
- Once permission is given, install the extension from: https://marketplace.visualstudio.com/items?itemName=deepcrawl.automator-tools
- Generate an API key on: https://legacy.deepcrawl.com/dc-api
- Make sure you have the test suite created and the test suite id, if not create your test suite in Protect: https://protect.lumar.io/
- Add the following task to your azure devops pipeline `yaml` file:

```yaml
- task: run-automator-build-task@1
  inputs:
    userKeyId: '{USER_KEY_ID}' (string - generate new api key on Lumar core app)
    userKeySecret: '{USER_KEY_SECRET}' (string - generate new api key on Lumar core app)
    testSuiteId: '{TEST_SUITE_ID}' (string - use your created test suite id)
    ciBuildId: '{CI_BUILD_ID}' (optional - string)
    startOnly: false (optional - boolean - use it if you want to skip polling)
```

!> Unless `startOnly` is set to `true`, max polling time is set to 50 minutes. If the build takes longer than 50 minutes, it will automatically fail the pipeline.

!> For more informations, please see: https://github.com/deepcrawl/automator-sdk/blob/master/azure-devops-extension/README.md.

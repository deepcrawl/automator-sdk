# Automator CI Scripts

## Introduction

The Automator shell scripts allow your CI platform to start a crawl on a development environment and waits for a result. They can be found in the main repo ([`ci.sh`](https://github.com/deepcrawl/automator-sdk/blob/master/ci.sh) and [`ci.ps`](https://github.com/deepcrawl/automator-sdk/blob/master/ci.ps)) and should be placed in your CI platform after deployment is complete.

## Environment Variables

The following environment variables should be set in your CI platform to allow the scripts to work correctly.

```
AUTOMATOR_USER_KEY_ID (Key ID for generated API Key)

AUTOMATOR_USER_KEY_SECRET (Secret value for generated API Key)

AUTOMATOR_TEST_SUITE_ID (optional) // can be passed into ci as param

AUTOMATOR_START_ONLY (optional, set to `1` or `true` to run Automator without blocking a build)
```

example:
**AUTOMATOR_TEST_SUITE_ID** replace with your id

```bash
$: ./ci.ps1 -testSuiteId AUTOMATOR_TEST_SUITE_ID
$: ./ci.sh AUTOMATOR_TEST_SUITE_ID
```
### Authentication variables
The authentication variables `AUTOMATOR_USER_KEY_ID` and `AUTOMATOR_USER_KEY_SECRET` can be retrieved from either your [DeepCrawl API settings](https://app.deepcrawl.com/dc-api), or by [generating them in the API](https://deepcrawl.github.io/automator-sdk/#/authentication)

## CI Platform Usage

### Travis

```yaml
matrix:
  include:
    - language: bash
      os: linux
      dist: bionic
      sudo: false
      addons:
        apt:
          packages:
            - jq
      script: ./ci.sh
```

### Jenkins
Coming soon

### Azure Pipelines

Azure pipelines can either be configured by using [our Azure Devops Etension](https://deepcrawl.github.io/automator-sdk/#/azure-devops-extension), or by using the Powershell task, by copying the `ps1` script to your repository:

```yaml
trigger:
  - master
pr:
  - master
pool:
  vmImage: "vs2017-win2016"

steps:
  - task: PowerShell@2
    env:
      AUTOMATOR_TEST_SUITE_ID: $(testId)
      AUTOMATOR_USER_KEY_ID: $(key_id)
      AUTOMATOR_USER_KEY_SECRET: $(secret)
    inputs:
      filePath: "$(System.DefaultWorkingDirectory)/ci.ps1"
```

### General

Run either script with the correct environment variables. This should start the test suite build and poll for results.

## Using Automator scripts without blocking builds

From time to time, you may want to use Automator without letting your CI system wait for the crawl to complete, or allowing the script impact whether your build succeeds. In this case, you can add the `AUTOMATOR_START_ONLY` environment variable set to `true` or `1`. You can also pass the value as a second script argument after test suite ID. This flag modifies the behaviour of the script to start a test suite test, then return without polling for a result.

In this case Automator will send an email or other notification about the status of your tests, and the test results will be available in the automator app.

## Debugging

### Bash

For basic debugging output you can edit your bash script to add `-x` to `#!/bin/bash` in the start of the file.

If you want to debug via vs-code this extension is useful https://marketplace.visualstudio.com/items?itemName=rogalmic.bash-debug

### Powershell

Using vscode is easiest way to lint, autocomplete and debug powershell
https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell

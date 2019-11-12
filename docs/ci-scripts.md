# Automator CI Scripts

## Introduction

The Automator shell scripts allow your CI platform to start a crawl on a development environment and waits for a result. They can be found in the main repo ([`ci.sh`](https://github.com/deepcrawl/automator-sdk/blob/master/ci.sh) and [`ci.ps`](https://github.com/deepcrawl/automator-sdk/blob/master/ci.ps)) and should be placed in your CI platform after deployment is complete.

## Environment Variables

The following environment variables should be set in your CI platform to allow the scripts to work correctly.

```
AUTOMATOR_USER_KEY_ID (Key ID for generated API Key)

AUTOMATOR_USER_KEY_SECRET (Secret value for generated API Key)

AUTOMATOR_TEST_SUITE_ID (optional) // can be passed into ci as param
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

### Preventing Automator from delaying or blocking builds
Crawling a test environment can take several minutes depending on the configured speed and number of URLs. During your initial usage of Automator, you may not want Automator to delay your builds, or have the ability to block a deployment.
In this case, you can configure the shell script to have a "start only" behaviour. 

Under this strategy, the bash script will start a crawl of the environment then immediate return a passed status. The crawl will continue in the background and will send a notification of the test results on completion.

Native support for a "start only" mode is coming to the shell scripts soon. To achieve this in the meantime, you should modify the shell script to exit with a `0` status immediately after making the 'Start Build' request.
For instance,
- in [`ci.sh`](https://github.com/deepcrawl/automator-sdk/blob/master/ci.sh), add `exit 0` before the `until` loop in the `StartBuild` function
- in [`ci.ps`](https://github.com/deepcrawl/automator-sdk/blob/master/ci.ps), add `exit 0` before the `while` loop in the `Start-Build` function

## Debugging

### Bash

For basic debugging output you can edit your bash script to add `-x` to `#!/bin/bash` in the start of the file.

If you want to debug via vs-code this extension is useful https://marketplace.visualstudio.com/items?itemName=rogalmic.bash-debug

### Powershell

Using vscode is easiest way to lint, autocomplete and debug powershell
https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell

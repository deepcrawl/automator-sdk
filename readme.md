# Automator CI Scripts

## Introduction

These scripts are meant for use with DeepCrawl Automator system and placed in your CI platform after deployment is complete.

**please note these are example scripts and you can write your own scripts simply using same rest endpoints!!**

## Debugging

### Bash

For basic debugging output you can edit your bash script to add `-x` to `#!/bin/bash` in the start of the file.

If you want to debug via vs-code this extension is useful https://marketplace.visualstudio.com/items?itemName=rogalmic.bash-debug

### Powershell

Using vscode is easiest way to lint, autocomplete and debug powershell
https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell

## Environment Variables

The following environment variables should be set in your CI platform to allow the scripts to work correctly.

```
AUTOMATOR_TOKEN (access token)

AUTOMATOR_TEST_SUITE_ID (optional) // can be passed into ci as param
```

example:
**AUTOMATOR_TEST_SUITE_ID** replace with your id

```bash
$: ./ci.ps1 -testSuiteId AUTOMATOR_TEST_SUITE_ID
$: ./ci.sh AUTOMATOR_TEST_SUITE_ID
```

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
      AUTOMATOR_TOKEN: $(token)
    inputs:
      filePath: "$(System.DefaultWorkingDirectory)/ci.ps1"
```

### Github Actions
```yaml
name: Node CI and Deepcrawl Automator

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [10.x]

    steps:
      - uses: actions/checkout@v1
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: npm install, build, and test
        run: |
          npm install
          npm run build --if-present
          npm test
        env:
          CI: true

      - name: Run DeepCrawl Automator
        run: npm run seo-audit
        env:
          AUTOMATOR_TOKEN: ${{ secrets.token }}
          AUTOMATOR_TEST_SUITE_ID: ${{ secrets.testSuiteID }}

```

### General

Run either script with the correct enviroment variables and that should start the test suite build and poll for results.

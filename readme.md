# Automator CI Scripts

## Introduction

These scripts are meant for use with DeepCrawl Automator system and placed in your CI platform after deployment is complete.

## Debugging

### Bash

Add `-x` to `#!/bin/bash`

### Powershell

Using vscode is easiest way to lint, autocomplete and debug

## Enviroment Variables

The following environment variables should be set in your CI platform to allow the scripts to work correctly.

```
AUTOMATOR_TIMEOUT_SEC (number of seconds until polling is cancelled)

AUTOMATOR_TOKEN (access token)

AUTOMATOR_TEST_SUITE_ID (optional) //can be passed into ci as param

AUTOMATOR_POLL_URL (in instructions sections of site)

AUTOMATOR_START_URL (in instructions section of site)
```

## CI Platform Usage

### Travis

### Jenkins

### Azure Pipelines

### General

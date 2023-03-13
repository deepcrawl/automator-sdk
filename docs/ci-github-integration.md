# Github Integration

[Marketplace](https://github.com/marketplace/actions/deepcrawl-automation-hub) | [Github Repository](https://github.com/deepcrawl/deepcrawl-test-action)

## Introduction

In order to integrate with Github, you need to use our Github action in your Github workflow.

## How to use

```yaml
name: Lumar Protect Build

# Configure the trigger of your workflow
#
# on:
#   pull_request:
#     branches: ["main"]
#   push:
#     branches: ["main"]

jobs:
  automation-hub-build:
    runs-on: ubuntu-latest # we support all OSes (windows / linux / macos)
    name: Lumar Protect Build
    steps:
      - name: Lumar Protect Build
        id: automation-hub-build
        uses: deepcrawl/deepcrawl-test-action@v1.0.0
        with:
          testSuiteId: "" # Your Test Suite ID
          userKeyId: "" # Your User Key ID
          userKeySecret: "" # Your User Key Secret ID
          startOnly: false # [Optional] This is set by default to optional and it flags if this is blocking
```

!> For more informations, please see: https://github.com/deepcrawl/deepcrawl-test-action/blob/main/README.md.

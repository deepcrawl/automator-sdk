# CircleCI Integration

Github Repository: https://github.com/deepcrawl/deepcrawl-test-orb
Marketplace: https://circleci.com/developer/orbs/orb/deepcrawl/deepcrawl-test

## Introduction

In order to integrate with CircleCI, you need to use our Automation Hub CircleCI orb:

`deepcrawl/deepcrawl-test` is exposing the `run-build` job which will run a build on Automation Hub.

## How to use

In order to use Automation Hub CircleCI Orb, you need to:

1. Create a CircleCI context `deepcrawl-test`, which contains the following environment variables:

- `DEEPCRAWL_TEST_USER_KEY_ID`
- `DEEPCRAWL_TEST_USER_KEY_SECRET`

Both environment variables should be set by creating a new API key [here](https://app.deepcrawl.com/dc-api).

2. Setup your CircleCI workflow ([example](https://github.com/deepcrawl/deepcrawl-test-orb/blob/main/src/examples/example.yml)):

```
version: 2.1
orbs:
  deepcrawl-test: deepcrawl/deepcrawl-test@1.0.0
workflows:
  deploy:
    jobs:
      - deepcrawl-test/run-build:
          # Context defined at step 1
          context: deepcrawl-test
          # Test suite ID created in Automation Hub
          testSuiteId: "YOUR_TEST_SUITE_ID"
          # Can be used to make it non-blocking
          startOnly: false
```

!> Make sure to run this job after your website is deployed, by using `requires` property of the job.

!> For more informations, please see: https://github.com/deepcrawl/deepcrawl-test-orb/blob/main/README.md.

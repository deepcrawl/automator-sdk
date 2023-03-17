# Lumar Protect

[<img src="images/lumar-logo.svg">](https://www.lumar.io/platform/protect)

## Introduction

Protect is a platform for ensuring that deployments are not causing SEO regressions. It works by connecting Lumar to your CI/CD pipeline to kick off a crawl of a staging or development environment, and returns a "passed" or "failed" status along with notifications about the specific regressions.

Users can define specific tests, thresholds, and severity of regressions in the Protect app, as well as view test results or set notification preferences.

## Connecting Protect to your CI pipeline

At the moment we offer the following possibilities of connecting Protect to your CI/CD pipeline:

- [Protect Github Action](https://github.com/deepcrawl/deepcrawl-test-action)
- [Protect Jenkins Plugin](https://github.com/jenkinsci/deepcrawl-test-plugin)
- [Protect CircleCI Orb](https://github.com/deepcrawl/deepcrawl-test-orb)
- [Protect Azure Devops Extension](./azure-devops-extension/README.md)
- [Protect Shell Scripts](#connecting-automation-hub-to-your-ci-pipeline-with-the-shell-scripts)
- [Protect CLI Tools](https://github.com/deepcrawl/deepcrawl-test/tree/main/packages/test-cli/README.md)
- [Protect SDK NodeJS Client](https://github.com/deepcrawl/deepcrawl-test/tree/main/packages/test-nodejs-sdk/README.md)
- [Protect API](https://api-docs.lumar.io/docs/protect/test-suites/test-suites-overview)

## Connecting Protect to your CI pipeline with the Shell Scripts

Protect can be connected to all popular CI or CD platforms by adding a shell script to your pipeline after the deployment is complete.

It is required to install `jq` to run the shell scripts. [Download jq here.](https://stedolan.github.io/jq/download/)

Our sample shell scripts are available in this repository in a range of languages ([`ci.sh`](ci.sh) and [`ci.ps1`](ci.ps1)), and require both API credentials from your Lumar account, and the test suite ID from Protect.
[Find full information about using these shell scripts in our documentation.](https://api-docs.lumar.io/docs/protect/ci/ci-shell-scripts)

### Preventing Protect from delaying or blocking builds

Crawling a test environment can take several minutes depending on the configured speed and number of URLs. During your initial usage of Protect, you may not want Protect to delay your builds, or have the ability to block a deployment.
In this case, you can configure the shell script to have a "start only" behaviour.

Under this strategy, the bash script will start a crawl of the environment then immediate return a passed status. The crawl will continue in the background and will send a notification of the test results on completion. [See the documentation for further information](https://api-docs.lumar.io/docs/protect/ci/ci-shell-scripts).

## Configuring tests

When a Protect crawl is run on your environment, Lumar will crawl a sample of webpages and assert a number of configured tests against them. Tests can be configured to look at a specific issue (i.e. broken links), with a threshold (i.e. greater than 10 broken links), to cause a given result (Fail - block deployment, Warn - pass deployment but notify).

All configuration takes place within the Protect app - contact your Lumar Customer Success Manager for more information.

## Using the Protect API

The Protect API uses the GraphQL protocol to make it easy to retrieve any information or make any changes you'd like to make. [You can find the full API documentation here.](https://api-docs.lumar.io/docs/protect/test-suites/test-suites-overview)

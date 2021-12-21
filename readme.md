# DeepCrawl Automation Hub

[<img src="https://www.deepcrawl.com/wp-content/themes/deepcrawl/images/logo-footer.svg">](https://www.deepcrawl.com/)

## Introduction

Automation Hub is a platform for ensuring that deployments are not causing SEO regressions. It works by connecting DeepCrawl to your CI/CD pipeline to kick off a crawl of a staging or development environment, and returns a "passed" or "failed" status along with notifications about the specific regressions.

Users can define specific tests, thresholds, and severity of regressions in the Automation Hub app, as well as view test results or set notification preferences.

## Connecting Automation Hub to your CI pipeline

At the moment we offer the following possibilites of connecting Automation Hub to your CI/CD pipeline:

- [Automation Hub Github Action](https://github.com/deepcrawl/deepcrawl-test-action)
- [Automation Hub Jenkins Plugin](https://github.com/jenkinsci/deepcrawl-test-plugin)
- [Automation Hub CircleCI Orb](https://github.com/deepcrawl/deepcrawl-test-orb)
- [Automation Hub Azure Devops Extension](./azure-devops-extension/README.md)
- [Automation Hub Shell Script](#connecting-automation-hub-to-your-ci-pipeline-with-the-shell-script)
- [Automation Hub CLI Tools](https://github.com/deepcrawl/deepcrawl-test/packages/test-cli/README.md)
- [Automation Hub SDK NodeJS Client](https://github.com/deepcrawl/deepcrawl-test/packages/test-nodejs-sdk/README.md)
- [Automation Hub API](https://deepcrawl.github.io/automator-sdk/)

## Connecting Automation Hub to your CI pipeline with the Shell Script

Automation Hub can be connected to all popular CI or CD platforms by adding a shell script to your pipeline after the deployment is complete.

It is required to install `jq` to run the shell scripts. [Download jq here.](https://stedolan.github.io/jq/download/)

Our sample shell scripts are available in this repository in a range of languages ([`ci.sh`](ci.sh) and [`ci.ps1`](ci.ps1)), and require both API credentials from your DeepCrawl account, and the test suite ID from Automation Hub.
[Find full information about using these shell scripts in our documentation.](https://deepcrawl.github.io/Automation Hub-sdk/#/ci-scripts)

### Preventing Automation Hub from delaying or blocking builds

Crawling a test environment can take several minutes depending on the configured speed and number of URLs. During your initial usage of Automation Hub, you may not want Automation Hub to delay your builds, or have the ability to block a deployment.
In this case, you can configure the shell script to have a "start only" behaviour.

Under this strategy, the bash script will start a crawl of the environment then immediate return a passed status. The crawl will continue in the background and will send a notification of the test results on completion. [See the documentation for further information](https://deepcrawl.github.io/Automation Hub-sdk/#/ci-scripts).

## Configuring tests

When an Automation Hub crawl is run on your environment, DeepCrawl will crawl a sample of webpages and assert a number of configured tests against them. Tests can be configured to look at a specific issue (i.e. broken links), with a threshold (i.e. greater than 10 broken links), to cause a given result (Fail - block deployment, Warn - pass deployment but notify).

All configuration takes place within the Automation Hub app - contact your DeepCrawl Customer Success Manager for more information.

## Using the Automation Hub API

The Automation Hub API uses the GraphQL protocol to make it easy to retrieve any information or make any changes you'd like to make. [You can find the full API documentation here.](https://deepcrawl.github.io/Automation Hub-sdk/)

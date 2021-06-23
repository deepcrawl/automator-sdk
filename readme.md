
# DeepCrawl Automator

[<img src="https://www.deepcrawl.com/wp-content/themes/deepcrawl/images/logo-footer.svg">](https://www.deepcrawl.com/)

## Introduction

Automator is a platform for ensuring that deployments are not causing SEO regressions. It works by connecting DeepCrawl to your CI/CD pipeline to kick off a crawl of a staging or development environment, and returns a "passed" or "failed" status along with notifications about the specific regressions.

Users can define specific tests, thresholds, and severity of regressions in the Automator app, as well as view test results or set notification preferences. 

## Connecting Automator to your CI pipeline
Automator can be connected to all popular CI or CD platforms by adding a shell script to your pipeline after the deployment is complete.

It is required to install `jq` to run the shell scripts. [Download jq here.](https://stedolan.github.io/jq/download/)

Our sample shell scripts are available in this repository in a range of languages ([`ci.sh`](ci.sh) and [`ci.ps1`](ci.ps1)), and require both API credentials from your DeepCrawl account, and the test suite ID from Automator. 
[Find full information about using these shell scripts in our documentation.](https://deepcrawl.github.io/automator-sdk/#/ci-scripts)

### Preventing Automator from delaying or blocking builds
Crawling a test environment can take several minutes depending on the configured speed and number of URLs. During your initial usage of Automator, you may not want Automator to delay your builds, or have the ability to block a deployment.
In this case, you can configure the shell script to have a "start only" behaviour. 

Under this strategy, the bash script will start a crawl of the environment then immediate return a passed status. The crawl will continue in the background and will send a notification of the test results on completion. [See the documentation for further information](https://deepcrawl.github.io/automator-sdk/#/ci-scripts).

## Configuring tests
When an Automator crawl is run on your environment, DeepCrawl will crawl a sample of webpages and assert a number of configured tests against them. Tests can be configured to look at a specific issue (i.e. broken links), with a threshold (i.e. greater than 10 broken links), to cause a given result (Fail - block deployment, Warn - pass deployment but notify). 

All configuration takes place within the Automator app - contact your DeepCrawl Customer Success Manager for more information.

## Using the Automator Tools Azure Devops extension
In order to access our Azure Devops extension, please request permissions, in order to see the extension in Microsoft Marketplace.

Once you are given access to the extension, install it through Microsoft Marketplace for your ogranization and configure it in your project. 

For more info on Automator Tools Azure Devops extension, please see: [Automator Tools README](./azure-devops-extension/README.md).

## Using the Automator API
The Automator API uses the GraphQL protocol to make it easy to retrieve any information or make any changes you'd like to make. [You can find the full API documentation here.](https://deepcrawl.github.io/automator-sdk/)

# Jenkins Integration

Github Repository: https://github.com/jenkinsci/deepcrawl-test-plugin
Marketplace: https://plugins.jenkins.io/deepcrawl-test

## Introduction

In order to integrate with Jenkins, you need to use our Jenkins plugin:

Deepcrawl Automation Hub is a Jenkins plugin that runs a build on Deepcrawl Automation Hub.

## How to use

The plugin can be used by executing it as follows in your Jenkinsfile:

```yaml
pipeline {
    agent any

    environment {
        DEEPCRAWL_AUTOMATION_HUB_USER_KEY_ID = ''
        DEEPCRAWL_AUTOMATION_HUB_USER_KEY_SECRET = credentials('automation-hub-user-key-secret')
    }

    stages {
        stage('Automation Hub Build') {
            steps {
                runAutomationHubBuild testSuiteId: ''
            }
        }
    }
}
```

Note: You need to create a secret text named 'automation-hub-user-key-secret' using the Credentials Plugin in Jenkins.

It can also be configured as a Build Step using the Jenkins GUI.

!> For more informations, please see: https://github.com/deepcrawl/deepcrawl-test/blob/develop/packages/test-cli/README.md.

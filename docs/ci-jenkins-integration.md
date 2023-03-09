# Jenkins Integration

[Marketplace](https://plugins.jenkins.io/deepcrawl-test) | [Github Repository](https://github.com/jenkinsci/deepcrawl-test-plugin)

## Introduction

In order to integrate with Jenkins, you need to use our Jenkins plugin:

Lumar Protect is a Jenkins plugin that runs a build on Lumar Protect.

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
        stage('Lumar Protect Build') {
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

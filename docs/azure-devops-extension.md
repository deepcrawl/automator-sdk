# Azure Devops Extension

This extension can be installed through Azure Devops extensions and it can be found under the name "Automator Tools".

It has the following tasks:

## Run Automator Build Task (`run-automator-build-task`)

### How to run

- Ask for extension permissions
- Once permission is given, install the extension from: https://marketplace.visualstudio.com/items?itemName=deepcrawl.automator-tools
- Generate an API key on: https://app.deepcrawl.com/dc-api
- Make sure you have the test suite created and the id, if not create your test suite in automator: https://automator.deepcrawl.com/
- Add the following task to your azure devops pipeline `yaml` file:

```yaml
- task: run-automator-build-task@1
  inputs:
    userKeyId: 'USER_KEY_ID' (string - generate new api key on deepcrawl core app)
    userKeySecret: 'USER_KEY_SECRET' (string - generate new api key on deepcrawl core app)
    testSuiteId: 'TEST_SUITE_ID' (string - use your created test suite id)
    ciBuildId: 'CI_BUILD_ID' (optional - string)
    startOnly: false (optional - boolean - use it if you want to skip polling)
```

*Note: Unless `startOnly` is set to `true`, max polling time is set to 50 minutes. If the build takes longer than 50 minutes, it will automatically fail the pipeline.* 

# Lumar Protect Tools Extension for Azure Devops

Install the extension for your ogranization via Microsoft Marketplace and configure it in your project.

It has the following tasks:

## Tasks

## Run Lumar Protect Build Task (`run-lumar-protect-build-task`)

### How to run

- Install the extension from: https://marketplace.visualstudio.com/items?itemName=deepcrawl.lumar-protect-tools
- Generate an API key on: https://accounts.lumar.io/api-access
- Make sure you have the test suite created and the test suite id, if not create your test suite in Protect: https://protect.lumar.io/
- Add the following task to your azure devops pipeline `yaml` file:

```yaml
- task: run-lumar-protect-build-task@1
  displayName: 'Lumar Protect'
  inputs:
    userKeyId: 'USER_KEY_ID' (string - generate new api key on Lumar core app)
    userKeySecret: 'USER_KEY_SECRET' (string - generate new api key on Lumar core app)
    testSuiteId: 'TEST_SUITE_ID' (string - use your created test suite id)
    ciBuildId: 'CI_BUILD_ID' (optional - string)
    startOnly: false (optional - boolean - use it if you want to skip polling)
```

_Note: Unless `startOnly` is set to `true`, max polling time is set to 50 minutes. If the build takes longer than 50 minutes, it will automatically fail the pipeline._

### Inputs

#### Required variables

```
userKeyId: <string>
userKeySecret: <string>
testSuiteId: <string>
```

#### Optional variables

```
startOnly: <boolean>
ciBuildId: <string>
```

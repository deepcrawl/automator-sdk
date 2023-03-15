# Lumar Protect Tools Extension for Azure Devops

In order to access our Azure Devops extension, please request permissions. This way you will be able to see the extension in Microsoft Marketplace.

Once you are given access to the extension, install it through Microsoft Marketplace for your ogranization and configure it in your project.

It has the following tasks:

## Tasks

## Run Lumar Protect Build Task (`run-automator-build-task`)

### How to run

- Ask for extension permissions
- Once permission is given, install the extension from: https://marketplace.visualstudio.com/items?itemName=deepcrawl.automator-tools
- Generate an API key on: https://legacy.deepcrawl.com/dc-api
- Make sure you have the test suite created and the test suite id, if not create your test suite in Protect: https://protect.lumar.io/
- Add the following task to your azure devops pipeline `yaml` file:

```yaml
- task: run-automator-build-task@1
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

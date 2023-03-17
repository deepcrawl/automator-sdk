### How to test (QA)

- Create accounts on: https://dev.azure.com/ (use @deepcrawl email address)
- Install the extension from: https://marketplace.visualstudio.com/items?itemName=deepcrawl.lumar-protect-tools
- Generate an API key on: https://legacy.lumar.io/dc-api
- Make sure you have the test suite created and the test suite id, if not create your test suite in Protect: https://protect.lumar.io/
- Create new private repository with default README: https://github.com/new
- Go to your Azure Organisation page: http://dev.azure.com/
- Create new project
- Pipelines -> Create new pipeline
- Authorise Github and set the repo to the one created previously
- Install it to your repo
- Select Starter Pipeline, once in Configure tab
- On next step, complete the `yaml`file with:

```yaml
trigger:
- master
pool:
  vmImage: 'ubuntu-latest'
steps:
- task: run-lumar-protect-build-task@1
  inputs:
    userKeyId: 'USER_KEY_ID' (string - generate new api key on Lumar core app)
    userKeySecret: 'USER_KEY_SECRET' (string - generate new api key on Lumar core app)
    testSuiteId: 'TEST_SUITE_ID' (string - use your created test suite id)
    ciBuildId: 'CI_BUILD_ID' (optional - string)
    startOnly: false (optional - boolean - use it if you want to skip polling)
```

- Save and run
- Go to the job and check it
- Once tested, make sure to remove the Lumar api key generated

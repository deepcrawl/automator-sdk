# NodeJS SDK Client

[Github Repository](https://github.com/deepcrawl/deepcrawl-test/tree/develop/packages/test-nodejs-sdk)

Deepcrawl Automate SDK NodeJS Client can be used to start builds on Deepcrawl Automate, by adding it as a dependency into your NodeJS project.

## Prerequisites

[Configure npm for use with GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#installing-a-package) by adding the following line to your `~/.npmrc` file:

```
@deepcrawl:registry=https://npm.pkg.github.com/
```

## Installation

Add `@deepcrawl/test-nodejs-sdk` as a dependency:

Using NPM:

```shell
npm install @deepcrawl/test-nodejs-sdk
```

Using Yarn:

```shell
yarn add @deepcrawl/test-nodejs-sdk
```

## Usage

### Creating the client

```typescript
const testSDKClient = TestSDKClient.create();
```

### Running a build

```typescript
await testSDKClient.runBuild({
  userKeyId: "Your API User Key ID", // Required
  userKeySecret: "Your API User Key Secret", // Required
  testSuiteId: "Your Test Suite ID", // Required
  ciBuildId: "Your CI Build Id", // Optional (Default: undefined), used for filtering, should reflect the build ID in your CI/CD pipeline
  isStartOnly: false, // Optional (Defaut: false), used for flagging if a build should only be started, without waiting for finalisation
});
```

!> For more informations, please see: https://github.com/deepcrawl/deepcrawl-test/blob/develop/packages/test-nodejs-sdk/README.md.

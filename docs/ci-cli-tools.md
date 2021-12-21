# CLI Tools

[Github Repository](https://github.com/deepcrawl/deepcrawl-test/tree/develop/packages/test-cli)

## Introduction

Automation Hub CLI Tools can be used to start builds by executing the executables provided.

**You can download the CLI Tools from the [Releases Page](https://github.com/deepcrawl/deepcrawl-test/releases), by browsing the Assets on the release marked as `Latest Release`.**

Currently, we offer support for the following operating systems: Linux / Windows / MacOS.

## Usage

List of parameters used when executing the CLI Tools:

```
--testSuiteId string     The test suite ID.
--userKeyId string       The user key ID, which can also be provided as env variable DEEPCRAWL_TEST_USER_KEY_ID.
--userKeySecret string   The user key secret, which can also be provided as env variable DEEPCRAWL_TEST_USER_KEY_SECRET.
--ciBuildId string       (OPTIONAL) The corresponding build ID in your CI/CD pipeline.
--startOnly              (OPTIONAL) Flags if should only start the build without waiting for it to finish.

-h, --help               Prints the usage guide.
```

_Note: `DEEPCRAWL_TEST_USER_KEY_ID` and `DEEPCRAWL_TEST_USER_KEY_SECRET` environment variables can be used, instead of providing them as arguments to the CLI Tool (`--userKeyId` / `--userKeySecret`)_

### Linux

```bash
./deepcrawl-test-linux --testSuiteId=TEST_SUTE_ID --userKeyId=USER_KEY_ID --userKeySecret=USER_KEY_SECRET
```

### Windows

```bash
deepcrawl-test-win.exe --testSuiteId=TEST_SUTE_ID --userKeyId=USER_KEY_ID --userKeySecret=USER_KEY_SECRET
```

### MacOS

```bash
./deepcrawl-test-macos --testSuiteId=TEST_SUTE_ID --userKeyId=USER_KEY_ID --userKeySecret=USER_KEY_SECRET
```

!> For more informations, please see: https://github.com/deepcrawl/deepcrawl-test/blob/develop/packages/test-cli/README.md.

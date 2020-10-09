import tl = require("azure-pipelines-task-lib/task");

import { inputParameters } from "@common/constants";
import { automatorSDKClient } from "@src/automator-sdk-client";

const userKeyId = tl.getInput(inputParameters.userKeyId, true);
const userKeySecret = tl.getInput(inputParameters.userKeySecret, true);
const testSuiteId = tl.getInput(inputParameters.testSuiteId, true);
const ciBuildId = tl.getInput(inputParameters.ciBuildId);
const isStartOnly = tl.getBoolInput(inputParameters.isStartOnly);

if (!userKeyId || !userKeySecret || !testSuiteId) {
  console.error("The following inputs need to be set: userKeyId / userKeySecret / testSuiteId");
  process.exit(1);
}

automatorSDKClient
  .runBuild({
    userKeyId,
    userKeySecret,
    testSuiteId,
    ciBuildId,
    isStartOnly,
  })
  .then(() => {
    console.log("Success");
    return 0;
  })
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  });

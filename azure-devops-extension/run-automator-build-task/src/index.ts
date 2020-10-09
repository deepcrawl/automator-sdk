import azurePipelinesTask = require("azure-pipelines-task-lib");

import { inputParameters } from "@common/constants";
import { automatorSDKClient } from "@src/automator-sdk-client";

const userKeyId = azurePipelinesTask.getInput(inputParameters.userKeyId, true);
const userKeySecret = azurePipelinesTask.getInput(inputParameters.userKeySecret, true);
const testSuiteId = azurePipelinesTask.getInput(inputParameters.testSuiteId, true);
const ciBuildId = azurePipelinesTask.getInput(inputParameters.ciBuildId);
const isStartOnly = azurePipelinesTask.getBoolInput(inputParameters.isStartOnly);

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
    return 0;
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });

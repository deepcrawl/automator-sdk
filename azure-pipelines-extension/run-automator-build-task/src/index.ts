import tl = require("azure-pipelines-task-lib/task");
import { inputParameters } from "helpers/settings";

import { runTask, IRunTaskOptions } from "./runTask";

const userKeyId = tl.getInput(inputParameters.userKeyId, true);
const userKeySecret = tl.getInput(inputParameters.userKeySecret, true);
const testSuiteId = tl.getInput(inputParameters.testSuiteId, true);
const isStartOnly = tl.getBoolInput(inputParameters.isStartOnly);

if (!userKeyId || !userKeySecret || !testSuiteId) {
  console.error("The following inputs need to be set: userKeyId / userKeySecret / testSuiteId");
  process.exit(1);
}

const runOptions: IRunTaskOptions = {
  userKeyId,
  userKeySecret,
  testSuiteId,
  isStartOnly,
};

runTask(runOptions)
  .then(() => {
    console.log("Success");
    return 0;
  })
  .catch(e => {
    console.error(e);
  });

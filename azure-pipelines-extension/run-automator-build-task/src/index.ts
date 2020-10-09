import { runTask } from "./ci"
import tl = require("azure-pipelines-task-lib/task");

const userKeyId = tl.getInput("userKeyId", true);
const userKeySecret = tl.getInput("userKeySecret", true);
const testSuiteId = tl.getInput("testSuiteId", true);
const startOnly = tl.getBoolInput("startOnly");

runTask({
  userKeyId,
  userKeySecret,
  testSuiteId,
  startOnly,
});

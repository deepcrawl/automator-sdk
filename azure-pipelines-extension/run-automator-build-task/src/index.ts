import { runTask } from "./ci"
import tl = require("azure-pipelines-task-lib/task");

const userKeyId = tl.getInput("userKeyId", true);
const userKeySecret = tl.getInput("userKeySecret", true);
const testSuiteId = tl.getInput("testSuiteId", true);

runTask(userKeyId, userKeySecret, testSuiteId);

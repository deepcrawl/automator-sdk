import { runTask, IRunTaskOptions } from "./runTask";
import tl = require("azure-pipelines-task-lib/task");


const userKeyId = tl.getInput("userKeyId", true);
const userKeySecret = tl.getInput("userKeySecret", true);
const testSuiteId = tl.getInput("testSuiteId", true);
const startOnly = tl.getBoolInput("startOnly")

if (!userKeyId || !userKeySecret || !testSuiteId) {
    console.error("The following inputs need to be set: userKeyId / userKeySecret / testSuiteId");
    process.exit(1);
}

const runOptions: IRunTaskOptions = {
    userKeyId,
    userKeySecret,
    testSuiteId,
    startOnly
}

runTask(runOptions);

import axios from "axios";

const token = process.env.AUTOMATOR_TOKEN || "";
const testSuiteId = process.env.AUTOMATOR_TEST_SUITE_ID || "";

if (!token || !testSuiteId) {
  console.error("no token or testSuiteId set!");
  process.exit(1);
}

let totalRunTime = 0;
const maxRunTime = 3000;

async function GetResults(uri: string, buildId: string) {
  const bodyPoll = {
    authToken: token,
    buildId,
  };

  const params = {
    uri,
    body: JSON.stringify(bodyPoll),
    ContentType: "application/json",
  };

  const resultResponse = await axios.post<{ passed: boolean }>(
    params.uri,
    params.body,
    {
      headers: {
        "Content-Type": params.ContentType,
      },
    }
  );
  return resultResponse;
}

function WriteResults(testResults: { passed: boolean }) {
  if (testResults.passed) {
    console.log("DeepCrawl Tests Passed");
    process.exit(0);
  } else {
    console.log("DeepCrawl Tests Failed");
    process.exit(1);
  }
}

async function StartPoll(BuildId: string) {
  const testResults = await GetResults(
    "https://beta-triggers.deepcrawl.com/poller",
    BuildId
  );
  if (testResults && testResults.status === 200) {
    WriteResults(testResults.data);
  } else {
    console.log("Waiting for DeepCrawl Test Results ...");
    totalRunTime += 30;

    setTimeout(async () => {
      if (!GetTimeout()) {
        await StartPoll(BuildId);
      } else {
        console.error("timed out");
      }
    }, 30000);
  }
}

function GetTimeout() {
  return totalRunTime >= maxRunTime;
}

async function StartBuild() {
  const body = {
    authToken: token,
    testSuiteId: testSuiteId,
    ciBuildId: process.env.GITHUB_SHA,
  };

  console.log("CI BUILD ID", process.env.GITHUB_SHA);

  try {
    const triggerResponse = await axios.post<{ buildId: string }>(
      "https://beta-triggers.deepcrawl.com/start",
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    StartPoll(triggerResponse.data.buildId);
  } catch (e) {
    console.warn(e);
    process.exit(1);
  }
}

try {
  StartBuild();
} catch (e) {
  console.warn(e);
  process.exit(1);
}

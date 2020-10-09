import { restRequest } from "./restRequest";
import { startPoll } from "./startPoll";

export async function startBuild(token: string, testSuiteId: string, startOnly?: boolean): Promise<void> {
  const body = {
    authToken: token,
    testSuiteId: testSuiteId,
    ciBuildId: process.env.GITHUB_SHA,
  };

  console.log("CI BUILD ID", process.env.GITHUB_SHA);

  try {
    const params = {
      uri: "https://tools.automator.staging.deepcrawl.com/start",
      body: JSON.stringify(body),
    };
    const triggerResponse = await restRequest<{ buildId: string }>(params);
    if (!startOnly) await startPoll(triggerResponse.data.buildId, token, 0);
  } catch (e) {
    console.warn(e.response.data);
    process.exit(1);
  }
}

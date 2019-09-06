import { restRequest } from "./restRequest";
import { startPoll } from "./startPoll";

export async function startBuild(
  token: string,
  testSuiteId: string
): Promise<void> {
  const body = {
    authToken: token,
    testSuiteId: testSuiteId,
    ciBuildId: process.env.GITHUB_SHA
  };

  console.log("CI BUILD ID", process.env.GITHUB_SHA);

  try {
    const params = {
      uri: "https://beta-triggers.deepcrawl.com/start",
      body: JSON.stringify(body)
    };
    const triggerResponse = await restRequest<{ buildId: string }>(params);

    startPoll(triggerResponse.data.buildId, token, 0);
  } catch (e) {
    console.warn(e);
    process.exit(1);
  }
}

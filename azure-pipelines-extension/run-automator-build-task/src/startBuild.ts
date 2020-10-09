import { restRequest } from "./helpers/restRequest";
import { URL_START_BUILD } from "./settings";

export async function startBuild(token: string, testSuiteId: string): Promise<string> {
  const body = {
    authToken: token,
    testSuiteId: testSuiteId,
    ciBuildId: process.env.GITHUB_SHA,
  };

  try {
    const triggerResponse = await restRequest<{ buildId: string }>({
      uri: URL_START_BUILD,
      body: JSON.stringify(body),
    });
    return triggerResponse.data.buildId;
  } catch (e) {
    console.warn(e.response.data);
    process.exit(1);
  }
}

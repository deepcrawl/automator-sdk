import { getAuthToken } from "./getAuthToken";
import { startBuild } from "./startBuild";

export async function runTask(userKeyId: string, userKeySecret: string, testSuiteId: string) {
  if (!userKeyId) {
    console.error("no AUTOMATOR_USER_KEY_ID set!");
    process.exit(1);
  }

  if (!userKeySecret) {
    console.error("no AUTOMATOR_USER_KEY_SECRET set!");
    process.exit(1);
  }

  if (!testSuiteId) {
    console.error("no AUTOMATOR_TEST_SUITE_ID set!");
    process.exit(1);
  }

  try {
    const token = await getAuthToken("https://graph.staging.deepcrawl.com", userKeyId, userKeySecret);
    await startBuild(token, testSuiteId);
  } catch (e) {
    console.warn(e);
    process.exit(1);
  } finally {
    // Remove auth token
  }
}

import { getAuthToken } from "./getAuthToken";
import { startBuild } from "./startBuild";

interface IRunTaskOptions {
  userKeyId: string;
  userKeySecret: string;
  testSuiteId: string;
  startOnly?: boolean;
}

export async function runTask({ userKeyId, userKeySecret, testSuiteId, startOnly }: IRunTaskOptions) {
  if (!userKeyId || !userKeySecret || !testSuiteId) {
    console.error("The following inputs need to be set: userKeyId / userKeySecret / testSuiteId")
    process.exit(1);
  }
  try {
    const token = await getAuthToken("https://graph.staging.deepcrawl.com", userKeyId, userKeySecret);
    await startBuild(token, testSuiteId, startOnly);
  } catch (e) {
    console.warn(e);
    process.exit(1);
  } finally {
    // Remove auth token
  }
}

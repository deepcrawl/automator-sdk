import { getAuthToken } from "./getAuthToken";
import { URL_FOR_AUTH_TOKEN } from "./settings";
import { startBuild } from "./startBuild";
import { startPoll } from "./startPoll";

export interface IRunTaskOptions {
  userKeyId: string; 
  userKeySecret: string;
  testSuiteId: string;
  startOnly?: boolean;
}

export async function runTask({ userKeyId, userKeySecret, testSuiteId, startOnly }: IRunTaskOptions) {
  try {
    const token = await getAuthToken(URL_FOR_AUTH_TOKEN, userKeyId, userKeySecret);
    const buildId = await startBuild(token, testSuiteId);
    if (!startOnly) { 
      await startPoll(buildId, token)
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    // Remove auth token
  }
}

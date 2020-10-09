import { graphAPIClient } from "@sdk/graph-api/client";
import { toolsAPIClient } from "@sdk/tools-api/client";

export interface IRunBuildOptions {
  userKeyId: string;
  userKeySecret: string;
  testSuiteId: string;
  isStartOnly?: boolean;
}

export class AutomatorSDKClient {
  public async runBuild({ userKeyId, userKeySecret, testSuiteId, isStartOnly }: IRunBuildOptions): Promise<void> {
    const token = await graphAPIClient.getAuthToken(userKeyId, userKeySecret);
    const buildId = await toolsAPIClient.startBuild(token, testSuiteId);
    if (!isStartOnly) await toolsAPIClient.poll(token, buildId);
  }
}

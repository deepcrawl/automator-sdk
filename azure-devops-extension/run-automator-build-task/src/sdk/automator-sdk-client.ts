import { IGraphAPIClient } from "@sdk/graph-api/interfaces/graph-api-client.interface";
import { IToolsAPIClient } from "@sdk/tools-api/interfaces/tools-api-client.interface";

export interface IRunBuildOptions {
  userKeyId: string;
  userKeySecret: string;
  testSuiteId: string;
  ciBuildId?: string;
  isStartOnly?: boolean;
}

export class AutomatorSDKClient {
  constructor(private readonly graphAPIClient: IGraphAPIClient, private readonly toolsAPIClient: IToolsAPIClient) {}

  public async runBuild({
    userKeyId,
    userKeySecret,
    testSuiteId,
    ciBuildId,
    isStartOnly,
  }: IRunBuildOptions): Promise<void> {
    const token = await this.graphAPIClient.getAuthToken(userKeyId, userKeySecret);
    try {
      const buildId = await this.toolsAPIClient.startBuild(token, testSuiteId, ciBuildId);
      if (!isStartOnly) await this.toolsAPIClient.poll(token, buildId);
    } finally {
      await this.graphAPIClient.deleteAuthToken(token);
    }
  }
}

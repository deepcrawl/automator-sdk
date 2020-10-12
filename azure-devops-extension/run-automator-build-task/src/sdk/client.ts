import { GraphAPIClient, IGraphAPIClientOptions } from "@sdk/graph-api/client";
import { ToolsAPIClient, IToolsAPIClientOptions } from "@sdk/tools-api/client";

export interface IRunBuildOptions {
  userKeyId: string;
  userKeySecret: string;
  testSuiteId: string;
  ciBuildId?: string;
  isStartOnly?: boolean;
}

interface IAutomatorSDKClientOptions {
  graphAPI: IGraphAPIClientOptions;
  toolsAPI: IToolsAPIClientOptions;
}

export class AutomatorSDKClient {
  private graphAPIClient: GraphAPIClient;
  private toolsAPIClient: ToolsAPIClient;

  constructor({ graphAPI: graphAPIOptions, toolsAPI: toolsAPIOptions }: IAutomatorSDKClientOptions) {
    this.graphAPIClient = new GraphAPIClient(graphAPIOptions);
    this.toolsAPIClient = new ToolsAPIClient(toolsAPIOptions);
  }

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

import { IToolsAPIClient } from "@sdk/tools-api/interfaces/tools-api-client.interface";

export class ToolsAPIClientMock implements IToolsAPIClient {
  public startBuild(authToken: string, testSuiteId: string, ciBuildId?: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  public poll(token: string, buildId: string, currentRunTime?: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

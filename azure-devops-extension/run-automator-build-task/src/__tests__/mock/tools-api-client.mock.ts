import { IPollingOptions } from "@sdk/tools-api/interfaces/polling-options.interface";
import { IToolsAPIClient } from "@sdk/tools-api/interfaces/tools-api-client.interface";

export class ToolsAPIClientMock implements IToolsAPIClient {
  public startBuild(authToken: string, testSuiteId: string, ciBuildId?: string): Promise<string> {
    if (testSuiteId === "test-suite-id-error") throw new Error(testSuiteId);
    if (testSuiteId === "test-suite-id-build-error") return Promise.resolve("build-id-error");
    return Promise.resolve(`${authToken}|${testSuiteId}|${ciBuildId}`);
  }

  public poll(_token: string, buildId: string, _currentRunTime?: number, _options?: IPollingOptions): Promise<void> {
    if (buildId === "build-id-error") throw new Error(buildId);
    return Promise.resolve();
  }
}

export interface IToolsAPIClient {
  startBuild(authToken: string, testSuiteId: string, ciBuildId?: string): Promise<string>;
  poll(token: string, buildId: string, currentRunTime?: number): Promise<void>;
}

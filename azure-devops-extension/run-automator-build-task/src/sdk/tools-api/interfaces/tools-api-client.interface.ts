import { IPollingOptions } from "./polling-options.interface";

export interface IToolsAPIClient {
  startBuild(authToken: string, testSuiteId: string, ciBuildId?: string): Promise<string>;
  poll(token: string, buildId: string, currentRunTime?: number, options?: IPollingOptions): Promise<void>;
}

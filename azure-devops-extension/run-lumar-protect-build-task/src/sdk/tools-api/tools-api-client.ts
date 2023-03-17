import axios, { AxiosResponse } from "axios";

import { MAX_POLLING_TIME, POLLING_INTERVAL } from "@common/constants";
import { sleep } from "@common/helpers/sleep.helper";
import { loggerService } from "@common/services/logger.service";
import { BuildNotFinishedError } from "@sdk/tools-api/errors/build-not-finished.error";
import { BuildResultPollingTimeoutError } from "@sdk/tools-api/errors/build-result-polling-timeout.error";
import { IPollBuildResultsResponse } from "@sdk/tools-api/interfaces/poll-build-results-response.interface";
import { IStartBuildResponse } from "@sdk/tools-api/interfaces/start-build-response.interface";
import { IToolsAPIClient } from "@sdk/tools-api/interfaces/tools-api-client.interface";

enum ToolsAPIRoute {
  StartBuild,
  PollBuildResults,
}

interface IRequestParameters {
  route: ToolsAPIRoute;
  body: Record<string, unknown>;
}

export interface IToolsAPIClientOptions {
  baseURL: string;
  startBuildPath: string;
  pollBuildResultsPath: string;
}

export class ToolsAPIClient implements IToolsAPIClient {
  private routes: Map<ToolsAPIRoute, string>;

  constructor(options: IToolsAPIClientOptions) {
    this.routes = this.initRoutes(options);
  }

  private initRoutes({
    baseURL,
    startBuildPath,
    pollBuildResultsPath,
  }: Pick<IToolsAPIClientOptions, "baseURL" | "pollBuildResultsPath" | "startBuildPath">): Map<ToolsAPIRoute, string> {
    const routes = new Map<ToolsAPIRoute, string>();
    routes.set(ToolsAPIRoute.StartBuild, `${baseURL}${startBuildPath}`);
    routes.set(ToolsAPIRoute.PollBuildResults, `${baseURL}${pollBuildResultsPath}`);
    return routes;
  }

  private async makePostRequest<T>(parameters: IRequestParameters): Promise<AxiosResponse<T>> {
    const routeURL = this.routes.get(parameters.route);
    if (!routeURL) throw new Error("Route URL not available");
    return axios.post<T>(routeURL, JSON.stringify(parameters.body), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async startBuild(authToken: string, testSuiteId: string, ciBuildId?: string): Promise<string> {
    const response = await this.makePostRequest<IStartBuildResponse>({
      route: ToolsAPIRoute.StartBuild,
      body: {
        authToken,
        testSuiteId,
        ciBuildId,
      },
    });
    return response.data.buildId;
  }

  public async poll(
    token: string,
    buildId: string,
    currentRunTime = 0,
    options = { pollingInterval: POLLING_INTERVAL, maxPollingTime: MAX_POLLING_TIME },
  ): Promise<void> {
    try {
      const didTestsPass = await this.getResults(token, buildId);
      loggerService.info(`Lumar Protect Tests ${didTestsPass ? "Passed" : "Failed"}`);
    } catch (e) {
      if (!(e instanceof BuildNotFinishedError)) throw e;
      loggerService.info("Waiting for Lumar Protect Test Results ...");
      if (currentRunTime > options.maxPollingTime) throw new BuildResultPollingTimeoutError(options.maxPollingTime);
      await sleep(options.pollingInterval);
      return this.poll(token, buildId, currentRunTime + options.pollingInterval);
    }
  }

  private async getResults(token: string, buildId: string): Promise<boolean> {
    const response = await this.makePostRequest<IPollBuildResultsResponse>({
      route: ToolsAPIRoute.PollBuildResults,
      body: {
        authToken: token,
        buildId,
      },
    });
    if (response.status !== 200) throw new BuildNotFinishedError();
    return response.data.passed;
  }
}

import axios, { AxiosResponse } from "axios";

import {
  TOOLS_API_START_BUILD_URL,
  TOOLS_API_POLL_BUILD_RESULTS_URL,
  TOOLS_API_BASE_URL,
  MAX_TIME_SPEND_ON_POLLING,
  POLLING_INTERVAL,
} from "@common/constants";
import { BuildNotFinishedError } from "@sdk/tools-api/errors/build-not-finished.error";
import { BuildResultPollingTimeoutError } from "@sdk/tools-api/errors/build-result-polling-timeout.error";
import { IPollBuildResultsResponse } from "@sdk/tools-api/interfaces/poll-build-results-response.interface";
import { IStartBuildResponse } from "@sdk/tools-api/interfaces/start-build-response.interface";
import { sleep } from "@common/helpers/sleep.helper";

enum ToolsAPIRoute {
  StartBuild,
  PollBuildResults,
}

interface IRequestParameters {
  route: ToolsAPIRoute;
  body: Record<string, unknown>;
}

class ToolsAPIClient {
  private routes: Map<ToolsAPIRoute, string>;

  constructor() {
    this.routes = this.initRoutes();
  }

  private initRoutes(): Map<ToolsAPIRoute, string> {
    const routes = new Map<ToolsAPIRoute, string>();
    routes.set(ToolsAPIRoute.StartBuild, `${TOOLS_API_BASE_URL}${TOOLS_API_START_BUILD_URL}`);
    routes.set(ToolsAPIRoute.PollBuildResults, `${TOOLS_API_BASE_URL}${TOOLS_API_POLL_BUILD_RESULTS_URL}`);
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
    const triggerResponse = await this.makePostRequest<IStartBuildResponse>({
      route: ToolsAPIRoute.StartBuild,
      body: {
        authToken,
        testSuiteId,
        ciBuildId,
      },
    });
    return triggerResponse.data.buildId;
  }

  public async poll(token: string, buildId: string, currentRunTime = 0): Promise<void> {
    try {
      const didTestsPass = await this.getResults(token, buildId);
      console.log(`DeepCrawl Tests ${didTestsPass ? "Passed" : "Failed"}`);
    } catch (e) {
      if (!(e instanceof BuildNotFinishedError)) throw e;
      console.log("Waiting for DeepCrawl Test Results ...");
      if (this.hasTimedOut(currentRunTime)) throw new BuildResultPollingTimeoutError();
      await sleep(POLLING_INTERVAL);
      await this.poll(token, buildId, currentRunTime + POLLING_INTERVAL);
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

  private hasTimedOut(runTime: number): boolean {
    return runTime >= MAX_TIME_SPEND_ON_POLLING;
  }
}

export const toolsAPIClient = new ToolsAPIClient();

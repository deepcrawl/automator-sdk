import { GRAPH_API_URL, TOOLS_API_BASE_URL, TOOLS_API_POLL_BUILD_RESULTS_PATH, TOOLS_API_START_BUILD_PATH } from "@common/constants";
import { AutomatorSDKClient } from "@sdk/client";

export const automatorSDKClient = new AutomatorSDKClient({
  graphAPI: {
    url: GRAPH_API_URL,
  },
  toolsAPI: {
    baseURL: TOOLS_API_BASE_URL,
    startBuildPath: TOOLS_API_START_BUILD_PATH,
    pollBuildResultsPath: TOOLS_API_POLL_BUILD_RESULTS_PATH,
  }
});

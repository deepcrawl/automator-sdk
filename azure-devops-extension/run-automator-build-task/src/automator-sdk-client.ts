import {
  GRAPH_API_URL,
  TOOLS_API_BASE_URL,
  TOOLS_API_POLL_BUILD_RESULTS_PATH,
  TOOLS_API_START_BUILD_PATH,
} from "@common/constants";
import { AutomatorSDKClient } from "@sdk/automator-sdk-client";
import { GraphAPIClient } from "@sdk/graph-api/graph-api-client";
import { ToolsAPIClient } from "@sdk/tools-api/tools-api-client";

const graphAPIClient = new GraphAPIClient({
  url: GRAPH_API_URL,
});
const toolsAPIClient = new ToolsAPIClient({
  baseURL: TOOLS_API_BASE_URL,
  startBuildPath: TOOLS_API_START_BUILD_PATH,
  pollBuildResultsPath: TOOLS_API_POLL_BUILD_RESULTS_PATH,
});
export const automatorSDKClient = new AutomatorSDKClient(graphAPIClient, toolsAPIClient);

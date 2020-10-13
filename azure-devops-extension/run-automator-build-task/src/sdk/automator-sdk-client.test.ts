import { GraphAPIClientMock } from "@src/__tests__/mock/graph-api-client.mock";
import { ToolsAPIClientMock } from "@src/__tests__/mock/tools-api-client.mock";
import { AutomatorSDKClient } from "@sdk/automator-sdk-client";

const graphAPIClient = new GraphAPIClientMock();
const toolsAPIClient = new ToolsAPIClientMock();
const automatorSDKClient = new AutomatorSDKClient(graphAPIClient, toolsAPIClient);

export const TOOLS_API_BASE_URL = "https://tools.automator.staging.deepcrawl.com";
export const TOOLS_API_POLL_BUILD_RESULTS_URL = "/poller";
export const TOOLS_API_START_BUILD_URL = "/start";
export const URL_FOR_AUTH_TOKEN = "https://graph.staging.deepcrawl.com";
export const POLLING_INTERVAL = 30000; // 30 seconds
export const HTTP_STATUS_CODE_OK = 200;
export const MAX_TIME_SPEND_ON_POLLING = 3000000; // 3000 seconds

export const inputParameters = {
  userKeyId: "userKeyId",
  userKeySecret: "userKeySecret",
  testSuiteId: "testSuiteId",
  ciBuildId: "ciBuildId",
  isStartOnly: "startOnly",
};

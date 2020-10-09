import { getResults } from "./getResults";
import { hasTimedOut } from "./helpers/hasTimedOut";
import { printOutResults } from "./helpers/printOutResults";
import {
  URL_BUILD_RESULTS,
  HTTP_STATUS_CODE_OK,
  POLLING_INTERVAL,
  MAX_TIME_SPEND_ON_POLLING,
} from "./helpers/settings";

export async function startPoll(buildId: string, token: string, currentRunTime = 0): Promise<void> {
  const testResults = await getResults(URL_BUILD_RESULTS, buildId, token);

  if (testResults?.status === HTTP_STATUS_CODE_OK) {
    printOutResults(testResults.data);
  } else {
    console.log("Waiting for DeepCrawl Test Results ...");
    const totalRunTime = currentRunTime + POLLING_INTERVAL;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(async () => {
      if (!hasTimedOut(currentRunTime)) {
        await startPoll(buildId, token, totalRunTime);
      } else {
        console.error(`Maximum polling time exceeded ${MAX_TIME_SPEND_ON_POLLING} ms.`);
      }
    }, POLLING_INTERVAL);
  }
}

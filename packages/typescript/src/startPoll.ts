import { getResults } from "./getResults";
import { hasTimedOut } from "./helpers/hasTimedOut";
import { writeResults } from "./writeResults";

export async function startPoll(
  BuildId: string,
  token: string,
  runTime: number
): Promise<void> {
  const testResults = await getResults(
    "https://beta-triggers.deepcrawl.com/poller",
    BuildId,
    token
  );
  if (testResults && testResults.status === 200) {
    writeResults(testResults.data);
  } else {
    console.log("Waiting for DeepCrawl Test Results ...");
    const updateRunTime = runTime + 30;

    setTimeout(async () => {
      if (!hasTimedOut(runTime)) {
        await startPoll(BuildId, token, updateRunTime);
      } else {
        console.error("timed out");
      }
    }, 30000);
  }
}

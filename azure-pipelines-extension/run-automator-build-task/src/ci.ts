import { startBuild } from "./startBuild";

export function runTask() {
  const token = process.env.AUTOMATOR_TOKEN || "";
  const testSuiteId = process.env.AUTOMATOR_TEST_SUITE_ID || "";

  if (!token || !testSuiteId) {
    console.error("no token or testSuiteId set!");
    process.exit(1);
  }

  try {
    startBuild(token, testSuiteId);
  } catch (e) {
    console.warn(e);
    process.exit(1);
  }
}

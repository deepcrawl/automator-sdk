export function writeResults(testResults: { passed: boolean }): void {
  if (testResults.passed) {
    console.log("DeepCrawl Tests Passed");
    process.exit(0);
  } else {
    console.log("DeepCrawl Tests Failed");
    process.exit(1);
  }
}

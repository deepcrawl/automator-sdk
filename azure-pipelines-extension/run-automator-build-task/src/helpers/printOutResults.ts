export function printOutResults(testResults: { passed: boolean }): void {
  console.log(`DeepCrawl Tests ${testResults.passed ? "Passed" : "Failed"}`);
  process.exit(testResults.passed ? 0 : 1);
}

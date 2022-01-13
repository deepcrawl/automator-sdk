# Deepcrawl Automate Statistics
---

## Getting Deepcrawl Automate Statistics for a given Account

In order to get the statistics for a given account use the following query, by providing the account id in `accountId` argument:

```graphql
{
  getAutomatorAccountStatistics(accountId: "{ACCOUNT_ID}") {
    testSuitesCount
    buildsCount
    testsPerformedCount
    passedTestPercentage
    warnedTestPercentage
    failedTestPercentage
    averageUrlsCrawledPerDay
  }
}
```

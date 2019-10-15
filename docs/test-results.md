# Test results
---
## Getting tests result list for a build

To list test results you should know your build id. On how to get it check [Builds](builds?id=listing-builds-for-a-test-suite) section.
Test results will be available only if build status is `Finished`.

Example

```graphql
{
  node(id: "build-id") {
    ... on Build {
      status
      passed
      failedTestCount
      testResults(first: 50) {
        nodes {
          passed
          severity
          reportTemplate {
            code
            name
          }
        }
      }
    }
  }
}
```

## List of available test result fields

<!-- tabs:start -->

#### ** Query **

Name | Type
--- | ---
`passed` | Boolean
`severity` | Severity!
`reportTemplate` | ReportTemplate!
`id` | ObjectID!

<!-- tabs:end -->
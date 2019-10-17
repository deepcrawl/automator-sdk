# Test results
---
## Getting test results for a build

A build ID is required to list test results. See the [Builds](builds?id=listing-builds-for-a-test-suite) section to learn how to get a build ID.
Test results are only available if the build status is `Finished`.

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
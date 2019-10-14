# Test suites
---
## Listing test suites

To list test sutes, you should know your Automator account name or id. On how to get those check [Accounts](/accounts) section.

Example query to list 100 test suites would look like this:

```graphql
{
  node(id: "your-automator-account-id") {
    ... on Account {
      testSuites(last: 100) {
        nodes {
          name
          id
          alertEmails
          useRenderer
        }
      }
    }
  }
}
```

You can also search for a teas suite:

```graphql
{
  node(id: "your-automator-account-id") {
    ... on Account {
      testSuites(first: 5, filters: {nameCont: "staging test sutite"}) {
        nodes {
          name
          id
          alertEmails
          useRenderer
        }
      }
    }
  }
}
```

## Creating a test suite

To create a new tests suite you need to use `createTestSuite` mutation.

Example mutation:
```graphql
mutation {
  createTestSuite(input: {
    accountId: "your-automator-account-id",
    name: "New test suite",
    sitePrimary: "https://staging.com"
  }) {
    testSuite {
      # New test suite fields to be returned
      id
      name
    }
  }
}
```
`accountId`, `name` and `sitePrimary` are the only required fields. For the full list of available fields see [List of available test suite fields](test-suites?id=list-of-available-test-suite-fields) section.


## Updating a test suite

To create a new tests suite you need to use `updateTestSuite` mutation.

Example mutation:
```graphql
mutation {
  updateTestSuite(input: {
    testSuiteId: "test-suite-id",
    name: "Different test suite name",
    alertEmails: ["xyz@email.com"]
  }) {
    testSuite {
      # Updated test suite fields to be returned
      id
      name
      sitePrimary
    }
  }
}
```

For the full list of available fields see [List of available test suite fields](test-suites?id=list-of-available-test-suite-fields) section.

## Deleting a test suite

To delete a tests suite you need to use `deleteTestSuite` mutation.

Example mutation:
```graphql
mutation {
  deleteTestSuite(input: {
    testSuiteId: "test-suite-id"
  }) {
    testSuite {
      # Deleted test suite fields to be returned
      id
    }
  }
}
```

!> Deleting a test suite will also delete all the related builds and tests tesults.

## List of available test suite fields

Name | Type | Default
--- | --- | ---
`accountId` | ObjectID! |
`alertEmails` | [String!] |
`crawlRate` | Float | 3
`crawlTypes` | [TestSuiteCrawlType!] | [ "Web" ]
`customDns` | [CustomDnsSettingInput!] |
`customHeaderUserAgent` | String |
`customHeaderUserAgentShort` | String |
`duplicatePrecision` | Int | 3
`emptyPageThreshold` | Int | 512
`highLogSummaryRequests` | Int | 100
`limitPagesMax` | Int | 500
`location` | TestSuiteLocationCode | "Default"
`lowLogSummaryRequests` | Int | 10
`maxContentSize` | Int | 51200
`maxDescriptionLength` | Int | 230
`maxExternalLinks` | Int | 10
`maxHtmlSize` | Int | 204800
`maxLinks` | Int | 250
`maxLoadTime` | Float | 3
`maxRedirections` | Int | 4
`maxTitleWidth` | Int | 600
`maxUrlLength` | Int | 1024
`minContentRatio` | Float | 0.1
`minDescriptionLength` | Int | 50
`minTitleLength` | Int | 10
`name` | String! |
`rendererBlockAds` | Boolean | false
`rendererBlockAnalytics` | Boolean | false
`rendererBlockCustom` | [String!] |
`rendererJsString` | String |
`rendererJsUrls` | [String!] |
`robotsOverwrite` | String |
`sitePrimary` | String! |
`siteTest` | String |
`siteTestPass` | String |
`siteTestUser` | String |
`thinPageThreshold` | Int | 3072
`urlsExcluded` | [String!] |
`urlsIncluded` | [String!] |
`useRenderer` | Boolean | false
`useRobotsOverwrite` | Boolean | false

## Uploading a list file (via old API)

Coming soon!

<!-- TODO: Do we need this? -->
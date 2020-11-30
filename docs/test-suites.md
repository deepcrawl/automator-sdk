# Test suites
---
## Listing test suites

An account name or ID is required to list test suites. See the [Accounts](/accounts) section for information on how to find this.

The query to list 100 test suites looks like:

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

You can also search for a test suite using the account name:

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

To create a new test suite, use the `createTestSuite` mutation.

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
`accountId`, `name`, and `sitePrimary` are the only required fields. For the full list of available fields see [List of available test suite fields](test-suites?id=list-of-available-test-suite-fields) section.


## Updating a test suite

To change a test suite's settings, use the `updateTestSuite` mutation.

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

To delete a test suite, use the `deleteTestSuite` mutation.

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

!> Deleting a test suite will also delete all the related builds and test results.

## Cloning a test suite

To clone a test suite, use the `cloneTestSuite` mutation.

Example mutation:
```graphql
mutation {
  cloneTestSuite(input: {
    testSuiteId: "test-suite-id"
  }) {
    testSuite {
      # Cloned test suite fields to be returned
      id
    }
  }
}
```

All settings and tests will be cloned into a new test suite with the name: 'Copy of <original test suite name>'.

!> File uploads won't be copied into a new test suite.

## List of available test suite fields

<!-- tabs:start -->

#### ** Query **

Name | Type
--- | ---
`alertEmails` | [String!]
`crawlRate` | Float!
`createdAt` | DateTime!
`customDns` | [CustomDnsSetting!]
`customExtractions` | [CustomExtractionSetting!] |
`customHeaderUserAgent` | String
`customHeaderUserAgentShort` | String
`duplicatePrecision` | Float!
`emptyPageThreshold` | Float!
`highLogSummaryRequests` | Float!
`limitPagesMax` | Float!
`lowLogSummaryRequests` | Float!
`maxContentSize` | Float!
`maxDescriptionLength` | Float!
`maxExternalLinks` | Float!
`maxHtmlSize` | Float!
`maxLinks` | Float!
`maxLoadTime` | Float!
`maxRedirections` | Float!
`maxTitleWidth` | Float!
`maxUrlLength` | Float!
`minContentRatio` | Float!
`minDescriptionLength` | Float!
`minTitleLength` | Float!
`name` | String!
`rendererBlockAds` | Boolean!
`rendererBlockAnalytics` | Boolean!
`rendererBlockCustom` | [String!]
`rendererJsString` | String
`rendererJsUrls` | [String!]
`robotsOverwrite` | String
`sitePrimary` | String!
`siteTest` | String
`siteTestPass` | String
`siteTestUser` | String
`thinPageThreshold` | Float!
`updatedAt` | DateTime!
`urlsExcluded` | [String!]
`urlsIncluded` | [String!]
`useRenderer` | Boolean!
`useRobotsOverwrite` | Boolean!
`account` | Account!
`location` | Location!
`id` | ObjectID!
`tests(...)` | TestConnection!
`crawlTypes` | [TestSuiteCrawlType!]!
`builds(...)` | BuildConnection!

#### ** Create **

Name | Type | Default
--- | --- | ---
`accountId` | ObjectID! |
`alertEmails` | [String!] |
`crawlRate` | Float | 3
`crawlTypes` | [TestSuiteCrawlType!] | [ "Web" ]
`customDns` | [CustomDnsSettingInput!] |
`customExtractions` | [CustomExtractionSettingInput!] |
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

#### ** Update **

Name | Type
--- | ---
`crawlTypes` | [TestSuiteCrawlType!]
`location` | TestSuiteLocationCode
`testSuiteId` | ObjectID!
`alertEmails` | [String!]
`crawlRate` | Float
`customDns` | [CustomDnsSettingInput!]
`customExtractions` | [CustomExtractionSettingInput!] |
`customHeaderUserAgent` | String
`customHeaderUserAgentShort` | String
`duplicatePrecision` | Int
`emptyPageThreshold` | Int
`highLogSummaryRequests` | Int
`limitPagesMax` | Int
`lowLogSummaryRequests` | Int
`maxContentSize` | Int
`maxDescriptionLength` | Int
`maxExternalLinks` | Int
`maxHtmlSize` | Int
`maxLinks` | Int
`maxLoadTime` | Float
`maxRedirections` | Int
`maxTitleWidth` | Int
`maxUrlLength` | Int
`minContentRatio` | Float
`minDescriptionLength` | Int
`minTitleLength` | Int
`name` | String
`rendererBlockAds` | Boolean
`rendererBlockAnalytics` | Boolean
`rendererBlockCustom` | [String!]
`rendererJsString` | String
`rendererJsUrls` | [String!]
`robotsOverwrite` | String
`sitePrimary` | String
`siteTest` | String
`siteTestPass` | String
`siteTestUser` | String
`thinPageThreshold` | Int
`urlsExcluded` | [String!]
`urlsIncluded` | [String!]
`useRenderer` | Boolean
`useRobotsOverwrite` | Boolean

<!-- tabs:end -->

## Global Templates

This feature enables you to link two or multiple test suites together, by making one of it a global template. When any of the global template configuration in Step 2 or any test configuration in Step 3 is updated, all the linked test suites configurations and test configurations will be updated.

!> There is only one level of links, meaning that: if a test suite is already a global template, then the test suite can't be linked to another global template; a test suite can only be linked to a global template at a time.

### Linking a test suite to a global template

```
{
  mutation {
    linkChildTestSuiteToParentTestSuite(input: {
      parentTestSuiteId: "TjAwOVRlc3RTdWl0ZTM0MjQ1MA"
      childTestSuiteId: "TjAwOVRlc3RTdWl0ZTMzOTUyOQ"
    }) {
      parentTestSuite {
        id
      }
      childTestSuite {
        id
      }
    }
  }
}
```

!> In case you link two test suites together and none of them are linked, the `parentTestSuiteId` will become a Global Template

### Unlinking a test suite from a global template

```
{
  mutation {
    unlinkChildTestSuiteFromParentTestSuite(input: {
      childTestSuiteId: "TjAwOVRlc3RTdWl0ZTMzOTUyOQ"
    }) {
      parentTestSuite {
        id
      }
      childTestSuite {
        id
      }
    }
  }
}
```

!> An error will be thrown if the `childTestSuiteId` is not linked to a global template.

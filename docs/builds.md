# Builds
---
## Listing builds for a test suite

To list the builds that have been run you'll need the Test Suite's ID. To find a Test Suite's ID see the [Test Suites](test-suites?id=listing-test-suites) section.

Example query to list latest 50 buildss would look like this:

```graphql
{
  node(id: "{TEST_SUITE_ID}") {
    ... on TestSuite {
      builds(last : 50) {
        nodes {
          status
          createdAt
          finishedAt
          passed
          failedTestCount
        }
      }
    }
  }
}
```

## Listing the latest build for a test suite

A common query is finding the latest build in a Test Suite, for instance to check it's status. The following query does this:

```graphql
{
  node(id: "{TEST_SUITE_ID}") {
    ... on TestSuite {
      builds(first: 1, orderBy: {direction: DESC, field: createdAt}) {
        nodes {
          status
          createdAt
        }
      }
    }
  }
}
```

## Creating and running a build

To create and run a new build, use the `createAndRunBuild` mutation.

Example mutation:
```graphql
mutation {
  createAndRunBuild(input: {
    testSuiteId: "{TEST_SUITE_ID}",
    ciBuildId: "{CI_BUILD_ID}"
  }) {
    build {
      # New build fields to be returned
      id
      createdAt
      status
    }
  }
}
```
`{TEST_SUTIE_ID}` is the only required field. `{CI_BUILD_ID}` is an optional string that you can set to identify your CI build. These are the only two parameters available during build creation.

!> Build status may be still `Queued` immediately after running the mutation. It will change to `Running` after DeepCrawl starts crawling your website.

## Canceling a build

You can have only one build running per test suite. To cancel current running build use the `cancelBuild` mutation.

Example:
```graphql
mutation {
  cancelBuild(input: {
    buildId: "{BUILD_ID}"
  }) {
    build {
      # Canceled build fields to be returned
      id
      createdAt
      updatedAt
      status
    }
  }
}
```

## Available build statuses

Name | Description
--- | ---
`Queued` | Build has been created but not run yet
`Running` | Build has been run and corresponding crawl is crawling.
`Aborted` | Build has been stopped due to Deepcrawl Automate internal reasons. It's impossible to resume an aborted build.
`Cancelled` | Build has been stopped by the user. It's impossible to resume cancelled build.
`Finished` | Build is ready and test results are available.

## List of available build fields

<!-- tabs:start -->

#### ** Query **

Name | Type
--- | ---
`ciBuildId` | String
`createdAt` | DateTime!
`updatedAt` | DateTime!
`finishedAt` | DateTime
`passed` | Boolean!
`failedTestCount` | Float
`passedTestCount` | Float
`warnedTestCount` | Float
`crawl` | Crawl
`testSuite` | TestSuite!
`id` | ObjectID!
`status` | BuildStatus!
`crawlDcWebUrl` | String

#### ** Create **

Name | Type | Default
--- | --- | ---
`ciBuildId` | String
`testSuiteId` | ObjectID!

<!-- tabs:end -->

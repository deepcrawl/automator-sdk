# Builds
---
## Listing builds for a test suite

To list builds run you should know your test suite id. On how to get it check [Test Suites](test-suites?id=listing-test-suites) section.

Example query to list latest 50 buildss would look like this:

```graphql
{
  node(id: "test-suite-id") {
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

## Listing latest build for a test suite

It will be very common to search for the latest build in test suite, for example to check it's status. Here's example query for how to do that:

```graphql
{
  node(id: "test-suite-id") {
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

## Creating a build

To create a new build you need to use `createBuild` mutation.

Example mutation:
```graphql
mutation {
  createBuild(input: {
    testSuiteId: "test-suite-id",
    ciBuildId: "custom-build-id"
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
`testSuiteId` is the only required fields. `ciBuildId` is the Id that you can set to identify your CI build. These are the only two parameters available for build creation.

## Running a build

Created Build will have `Queued` status and won't have a crawl run yet. To kick off a build, you need to use `runBuild` mutation.

Example: 

```graphql
mutation {
  runBuild(input: {
    buildId: "build-id"
  }) {
    build {
      # Run build fields to be returned
      id
      createdAt
      updatedAt
      status
    }
  }
}
```

!> Build status may be still `Queued` immediatly after running the mutation. It will change to `Running` after crawl starts crawling your website.

## Canceling a build

You can have only one build running per test suite. To cancel current running build use `cancelBuild` mutation.

Example:
```graphql
mutation {
  cancelBuild(input: {
    buildId: "build-id"
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
`Aborted` | Build has been stopped due to automator internal reasons. It's impossible to resume aborted build.
`Cancelled` | Build has been stoped by the user. It's impossible to resume canceled build.
`Finished` | Build is ready. Tests results are available.

## List of available build fields

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
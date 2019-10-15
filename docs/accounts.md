# Accounts
---

## Listing available accounts
At the moment our API lists all DeepCrawl accounts that you have access to, but not all accounts are Automator accounts.


To list all available accounts run following query.
```graphql
{
  me {
    accounts(first: 100) {
      nodes {
        name
        id
      }
    }
  }
}

```

If you know your Automator account name, you can filter the call down to one account:
```graphql
{
  me {
    accounts(first: 1, filters: {nameEq: "Your Automator Account name"}) {
      nodes {
        name
        id
      }
    }
  }
}
```

Response:
```json
{
  "data": {
    "me": {
      "accounts": {
        "nodes": [
          {
            "name": "Your Automator Account name",
            "id": "TjAwN0FjY291bnQxMA"
          }
        ]
      }
    }
  }
}
```

After you know your account ID, you can get single account using `node` query:

```graphql
{
  node(id: "TjAwN0FjY291bnQxMA") {
    ... on Account {
      id
      name
    }
  }
}
```

Response:
```json
{
  "data": {
    "node": {
      "id": "TjAwN0FjY291bnQxMA",
      "name": "DeepCrawl Tech"
    }
  }
}
```

## List of available account fields

<!-- tabs:start -->

#### ** Query **

Name | Type
--- | ---
`limitPagesMax` | Int!
`limitLevelsMax` | Int!
`phone` | String
`country` | String
`addressCity` | String
`addressZip` | String
`name` | String
`packagePlan` | String!
`createdAt` | DateTime!
`updatedAt` | DateTime!
`id` | ObjectID!
`testSuites(...)` | TestSuiteConnection
`projects(...)` | ProjectConnection!
`featureFlags` | [FeatureFlag!]!

<!-- tabs:end -->

## Requesting other resources
As GraphQL allows easy access to nested resources all you need to do to access other resources is to nest it in a parents query.

Example request that lists first 5 Test Suites for an account and last build per Test Suite:
```graphql
{
  node(id: "TjAwN0FjY291bnQxMA") {
    ... on Account {
      id
      name
      testSuites(first: 5) {
        nodes {
          # Test Suite fields
          builds(last: 1) {
            nodes {
              # Build fields
            }
          }
        }
      }
    }
  }
}
```

or using account name: 
```graphql
{
  me {
    accounts(first: 1, filters: {nameEq: "Your Automator Account name"}) {
      nodes {
        id
        name
        testSuites(first: 5) {
          nodes {
            # Test Suite fields
            builds(last: 1) {
              nodes {
                # Build fields
              }
            }
          }
        }
      }
    }
  }
}
```

Next secttions explain in more detail how to interact with other Automator resources.
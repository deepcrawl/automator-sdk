# Accounts
---

## Listing available accounts
The API currently lists all of the DeepCrawl accounts that the user has access to, this is not limited to accounts which have permission to access Automator.


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

If you know the Automator account name, the query can be filtered using this name:
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

When the account ID has been obtained, subsequent queries can be filtered to this using `node`:

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
As GraphQL allows easy access to nested resources: to access other resources you need to nest it in a parent's query.

The following request lists first 5 Test Suites for an account and the last build in each Test Suite:
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

The next sections explain in more detail how to interact with other Automator resources.
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
    accounts(first: 1, filter: { name: { eq: "{ACCOUNT_NAME}" } }) {
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
            "name": "{ACCOUNT_NAME}",
            "id": "{ACCOUNT_ID}"
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
  node(id: "{ACCOUNT_ID}") {
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
      "id": "{ACCOUNT_ID}",
      "name": "{ACCOUNT_NAME}"
    }
  }
}
```

## List of available account fields

<!-- tabs:start -->

#### ** Query **

| Name              | Type                |
| ----------------- | ------------------- |
| `limitPagesMax`   | Int!                |
| `limitLevelsMax`  | Int!                |
| `phone`           | String              |
| `country`         | String              |
| `addressCity`     | String              |
| `addressZip`      | String              |
| `name`            | String              |
| `packagePlan`     | String!             |
| `createdAt`       | DateTime!           |
| `updatedAt`       | DateTime!           |
| `id`              | ObjectID!           |
| `testSuites(...)` | TestSuiteConnection |
| `projects(...)`   | ProjectConnection!  |
| `featureFlags`    | [FeatureFlag!]!     |

<!-- tabs:end -->

## Requesting other resources

As GraphQL allows easy access to nested resources: to access other resources you need to nest it in a parent's query.

The following request lists first 5 Test Suites for an account and the last build in each Test Suite:

```graphql
{
  node(id: "{ACCOUNT_ID}") {
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
    accounts(first: 1, filter: {
      name: {
        eq: "{ACCOUNT_NAME}"
      }
    }) {
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

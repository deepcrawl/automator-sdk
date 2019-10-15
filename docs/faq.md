# FAQ
---

## Check if test suite with given name already exists

To check if test suite exists send a query that filter by the name and check if returned array of results is not empty.

```graphql
{
  me {
    node(id: "account-id") {
      ... on Account {
        testSuites(first: 1, filters: {nameEq: "Test suite name"}){
          nodes {
            id
            name
          }
        }
      }
    }
  }
}
```

Response

```json
{
  "data": {
    "node": {
      "testSuites": {
        "nodes": []
      }
    }
  }
}
```

this means there is no test suite with "Test suite name" name as `nodes` array is empty.

## Create the deepcrawl project/test suite if it does not exist, with all required details.

1. To see if project exists see [previous section](faq?id=checking-if-test-suite-with-given-name-already-exists)
2. On how to create a new test suite use [createTestSuite](test-suites?id=creating-a-test-suite)

## Update the email alert if the project already exists.

Tu update `alertEmail` field on already created tests suite first you need to find that projects id:

```graphql
{
  me {
    node(id: "account-id") {
      ... on Account {
        testSuites(first: 1, filters: {nameEq: "Test suite name"}){
          nodes {
            id
            name
          }
        }
      }
    }
  }
}
```

Response:
```json
{
  "data": {
    "node": {
      "testSuites": {
        "nodes": [{
          "id": "your-test-suite-id",
          "name": "Test suite name"
        }]
      }
    }
  }
}
```

once you have the test suite ID, use [updateTestSuite](test-suites?id=updating-a-test-suite) mutation to set alert emails:

```graphql
mutation {
  updateTestSuite(input: {
    alertEmails: ["your@email.com"]
  }) {
    testSuite {
      id
      name
      alertEmails
    }
  }
}
```
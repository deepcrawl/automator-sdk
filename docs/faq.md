# FAQ
---

## Check if test suite with given name already exists

To check if a given test suite already exists, send a query with a "name" filter and check if returned array of results contains a Test Suite.

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

When the testSuite `nodes` array is empty, this means there is no test suite with "Test suite name" name.

## Create the DeepCrawl project/test suite if it does not exist, with all required details.

1. To see if project exists see [previous section](faq?id=checking-if-test-suite-with-given-name-already-exists)
2. To create a new test suite use [createTestSuite](test-suites?id=creating-a-test-suite)

## Update the email alert if the project already exists.

To update `alertEmail` field on an existing test suite, you'll need to find that test suite id:

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

Once you have the test suite ID, use [updateTestSuite](test-suites?id=updating-a-test-suite) mutation to set alert emails:

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
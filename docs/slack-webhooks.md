# Slack Webhooks
---
<!-- TODO: Add a quick tutorial about how to setup slack webhook in slack -->

## Listing slack webhooks

Slack webhooks are created for a test suite. To see the webhook list for a test suite you'll need a test suite Id. See the [Test Suites](/test-suites) section for information on how to find this.

The query to list 10 webhooks looks like:

```graphql
{
  node(id: "your-test-suite-id") {
    ... on TestSuite {
      slackWebhooks(last: 10) {
        nodes {
          id
          url
        }
      }
    }
  }
}
```

## Adding a slack webhook to a test suite

To create a new slack webhook, use the `createAutomatorSlackWebhook` mutation.

Example mutation:
```graphql
mutation {
  createAutomatorSlackWebhook(input: {
    testSuiteId: "your-test-suite-id",
    url: "https://url-to-a-slack-webhook.com"
  }) {
    slackWebhook {
      id
      url
    }
  }
}
```
`testSuiteId` and `url` are the required fields. For the full list of available fields see [List of available slack webhook fields](slack-webhooks?id=list-of-available-test-suite-fields) section.

## Deleting a slack webhook

To delete a slack webhook, use the `deleteAutomatorSlackWebhook` mutation.

Example mutation:
```graphql
mutation {
  deleteAutomatorSlackWebhook(input: {
    slackWebhookId: "slack-webhook-id"
  }) {
    slackWebhook {
      # Deleted slack webhook fields to be returned
      id
    }
  }
}
```

## List of available slack webhook fields

<!-- tabs:start -->

#### ** Query **

Name | Type
--- | ---
`url` | String
`testSuite` | TestSuite!

#### ** Create **

Name | Type | Default
--- | --- | ---
`testSuiteId` | ObjectID! |
`url` | String! |
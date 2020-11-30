# Integrations
---

In order to use this feature, an additional header needs to be passed:

- `Accept: application/vnd.deepcrawl.tray-io-integration-preview` 

## Getting an integration by id

```graphql
{
  node(id: "TjAxMUludGVncmF0aW9uNg") {
    ...on Integration {
      integrationCode
      name
      metadata {
        key
        value
      }
      account {
        id
      }
      testSuites {
        nodes {
          id
        }
      }
      createdAt
      updatedAt
    }
  }
}
```

## Listing all integrations in a given account

In order to get integrations for a given account use the following query, by providing the account id in `id` argument:

```graphql
{
  node(id: "TjAwN0FjY291bnQxMA") {
    ...on Account {
      integrations {
        nodes {
          integrationCode
          name
          metadata {
            key
            value
          }
          account {
            id
          }
          testSuites {
            nodes {
              id
            }
            totalCount
          }
          createdAt
          updatedAt
        }
      }
    }
  }
}
```

!> For obtaining only the JIRA integrations - only JIRA is currently available - `filter: { integrationCode: { eq: "JIRA" } }` filter can be used.

## Getting the JIRA integration linked to a given test suite

```graphql
{
  node(id: "TjAwOVRlc3RTdWl0ZTMzOTUyOQ") {
    ...on TestSuite {
      jiraIntegration {
        id
      }
    }
  }
}
```

!> A test suite can only be linked to a JIRA integration at a time

## Generating a JIRA integration configuration

```graphql
{
  mutation {
    generateJiraIntegrationConfiguration(input: {
      accountId: "TjAwN0FjY291bnQxMA"
    }) {
      traySolutionInstanceId
      configurationUrl
    }
  }
}
```

!> Use the `configurationUrl` in order to complete the configuration.

## Creating a JIRA integration

In order to create a JIRA integration, a configuration needs to be generated and completed, using `generateJiraIntegrationConfiguration` (see above). Use the generated `traySolutionInstanceId`, after the configuration is completed.

```graphql
{
  mutation {
    createJiraIntegration(input: {
      accountId: "TjAwN0FjY291bnQxMA"
      traySolutionInstanceId: "tray-solution-instance-id"
      name: "integration-name"
    }) {
      integration {
        integrationCode
        name
        metadata {
          key
          value
        }
        createdAt
        updatedAt
      }
    }
  }
}
```

## Updating a JIRA integration configuration

If you want to update a JIRA integration authentication, project and issue type, use this mutation and complete the configuration:

```graphql
{
  mutation {
    updateJiraIntegration(input: {
      integrationId: "TjAxMUludGVncmF0aW9uNg"
      name: "integration-name"
    }) {
      integration {
        integrationCode
        name
        metadata {
          key
          value
        }
        createdAt
        updatedAt
      }
    }
  }
}
```

!> Once this is completed, call `updateJiraIntegration` mutation above, so the configuration metadata gets updated (`name` can be skipped).

## Updating a JIRA integration

If you want to update a JIRA integration name or refresh the JIRA integration metadata, use:

```graphql
{
  mutation {
    updateJiraIntegration(input: {
      integrationId: "TjAxMUludGVncmF0aW9uNg"
      name: "integration-name"
    }) {
      integration {
        integrationCode
        name
        metadata {
          key
          value
        }
        createdAt
        updatedAt
      }
    }
  }
}
```

!> `name` can be skipped, if you only want to refresh the metadata

## Linking an integration to a test suite

```graphql
{
  mutation {
    linkIntegrationToTestSuite(input: {
      integrationId: "TjAxMUludGVncmF0aW9uNg"
      testSuiteId: "TjAwOVRlc3RTdWl0ZTMzOTUyOQ"
    }) {
      integration {
        id
      }
      testSuite {
        id
      }
    }
  }
}
```

!> In case of a JIRA integration, it will throw error if test suite is already linked to an integration

## Unlinking an integrtion from a test suite

```graphql
{
  mutation {
    unlinkIntegrationFromTestSuite(input: {
      integrationId: "TjAxMUludGVncmF0aW9uNg"
      testSuiteId: "TjAwOVRlc3RTdWl0ZTMzOTUyOQ"
    }) {
      integration {
        id
      }
      testSuite {
        id
      }
    }
  }
}
```

## Deleting an integration

```graphql
{
  mutation {
    deleteIntegration(input: {
      integrationId: "TjAxMUludGVncmF0aW9uNg"
    }) {
      integration {
        id
      }
    }
  }
}
```

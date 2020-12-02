# Integrations
---

There will be multiple types of integrations present in Automator. So far, we only have JIRA integrations. Due to the level of abstraction, some of the mutations are the same for any type of integration. In order to differentiate between the types of integrations we have `integrationCode` field exposed on the `Integration` type.

In order to use this feature, an additional header needs to be passed:

- `Accept: application/vnd.deepcrawl.tray-io-integration-preview` 

!> `linkIntegrationToTestSuite`, `unlinkIntegrationFromTestSuite` and `deleteIntegration` mutations are the same for any type of integration used.

## Getting an integration by id

```graphql
{
  node(id: "{INTEGRATION_ID}") {
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
  node(id: "{ACCOUNT_ID}") {
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
  node(id: "{TEST_SUITE_ID}") {
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
      accountId: "{ACCOUNT_ID}"
      traySolutionInstanceId: "{TRAY_SOLUTION_INSTANCE_ID}"
      name: "{INTEGRATION_NAME}"
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
    updateJiraIntegrationConfiguration(input: {
      integrationId: "{INTEGRATION_ID}"
    }) {
      configurationUrl
    }
  }
}
```

!> Use `configurationUrl` to update the JIRA configuration. Once this is completed, call `updateJiraIntegration` mutation above, so the configuration metadata gets updated (`name` can be skipped).

## Updating a JIRA integration

If you want to update a JIRA integration name or refresh the JIRA integration metadata, use:

```graphql
{
  mutation {
    updateJiraIntegration(input: {
      integrationId: "{INTEGRATION_ID}"
      name: "{INTEGRATION_NAME}"
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
      integrationId: "{INTEGRATION_ID}"
      testSuiteId: "{TEST_SUITE_ID}"
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

## Unlinking an integration from a test suite

```graphql
{
  mutation {
    unlinkIntegrationFromTestSuite(input: {
      integrationId: "{INTERGATION_ID}"
      testSuiteId: "{TEST_SUITE_ID}"
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
      integrationId: "{INTEGRATION_ID}"
    }) {
      integration {
        id
      }
    }
  }
}
```

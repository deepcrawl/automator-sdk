# JIRA Integrations

---

A test suite can be integrated with JIRA, in order to get notified if a test fails or warns. In order to use JIRA Integration, you first need to created a JIRA Authentication, than use that authentication in order to create a JIRA Integration and than connect that JIRA Integration to a test suite.

A JIRA Authentication consists of: a name, the JIRA Cloud ID, the JIRA url and the JIRA refresh token (obtained after authorizing the app).

A JIRA Integration consists of: a name, the created JIRA authentication id, the JIRA project id and the JIRA issue type id.

!> JIRA Integrations work only with JIRA Cloud

## Getting an JIRA Authentication by id

```graphql
{
  node(id: "{INTEGRATION_ID}") {
    ... on JiraAuthentication {
      name
      cloudId
      jiraUrl
      createdAt
      updatedAt
    }
  }
}
```

## Getting an JIRA Integration by id

```graphql
{
  node(id: "{INTEGRATION_ID}") {
    ... on JiraIntegration {
      name
      jiraProjectId
      jiraIssueTypeId
      createdAt
      updatedAt
    }
  }
}
```

## Listing all JIRA Authentications in a given account

In order to get all JIRA authentications for a given account use the following query, by providing the account id in `id` argument:

```graphql
{
  node(id: "{ACCOUNT_ID}") {
    ... on Account {
      jiraAuthentications {
        nodes {
          name
          cloudId
          jiraUrl
          createdAt
          updatedAt
          jiraIntegrations(first: 100) {
            name
            jiraProjectId
            jiraIssueTypeId
            createdAt
            updatedAt
          }
        }
      }
    }
  }
}
```

## Getting the JIRA integration linked to a given test suite

```graphql
{
  node(id: "{TEST_SUITE_ID}") {
    ... on TestSuite {
      testSuiteJiraIntegration {
        jiraIntegration {
          id
        }
      }
    }
  }
}
```

!> A test suite can only be linked to a JIRA integration at a time

## Creating a JIRA Authentication

```graphql
{
  mutation {
    createJiraAuthentication(
      input: {
        accountId: "TjAwN0FjY291bnQxMA"
        name: "Default JIRA Authentication"
        cloudId: "cloud-id"
        jiraUrl: "https://jira.organization.com"
        refreshToken: "refres-token"
      }
    ) {
      name
      cloudId
      jiraUrl
      createdAt
      updatedAt
    }
  }
}
```

## Creating a JIRA integration

In order to create a JIRA integration, an authentication needs to be created, using `createJiraAuthentication` (see above).

```graphql
{
  mutation {
    createJiraIntegration(
      input: {
        accountId: "{ACCOUNT_ID}"
        traySolutionInstanceId: "{TRAY_SOLUTION_INSTANCE_ID}"
        name: "{INTEGRATION_NAME}"
      }
    ) {
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
    updateJiraIntegrationConfiguration(input: { integrationId: "{INTEGRATION_ID}" }) {
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
    updateJiraIntegration(input: { integrationId: "{INTEGRATION_ID}", name: "{INTEGRATION_NAME}" }) {
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
    linkIntegrationToTestSuite(input: { integrationId: "{INTEGRATION_ID}", testSuiteId: "{TEST_SUITE_ID}" }) {
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
    unlinkIntegrationFromTestSuite(input: { integrationId: "{INTERGATION_ID}", testSuiteId: "{TEST_SUITE_ID}" }) {
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
    deleteIntegration(input: { integrationId: "{INTEGRATION_ID}" }) {
      integration {
        id
      }
    }
  }
}
```

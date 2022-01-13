# JIRA Integrations

---

A test suite can be integrated with JIRA, in order to get notified if a test fails or warns. In order to use JIRA Integration, you first need to create a JIRA Authentication, then use that authentication in order to create a JIRA Integration and then connect that JIRA Integration to a test suite.

A JIRA Authentication consists of: a name, the JIRA Cloud ID, the JIRA url and the JIRA refresh token (obtained after authorizing the app).

A JIRA Integration consists of: a name, the created JIRA authentication id, the JIRA project id and the JIRA issue type id.

!> JIRA Integrations work only with JIRA Cloud.

## Getting a JIRA Authentication by id

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

## Creating a JIRA Authentication

```graphql
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
    jiraAuthentication {
      name
      cloudId
      jiraUrl
      createdAt
      updatedAt
    }
  }
}
```

## Updating a JIRA Authentication

```graphql
mutation {
  updateJiraAuthentication(
    input: {
      jiraAuhtenticationId: "TjAwN0FjY291bnQxMA"
      name: "Updated Default JIRA Authentication"
    }
  ) {
    jiraAuthentication {
      name
      cloudId
      jiraUrl
      createdAt
      updatedAt
    }
  }
}
```

## Deleting a JIRA Authentication

```graphql
mutation {
  deleteJiraAuthentication(
    input: {
      jiraAuhtenticationId: "TjAwN0FjY291bnQxMA"
    }
  ) {
    jiraAuthentication {
      name
      cloudId
      jiraUrl
      createdAt
      updatedAt
    }
  }
}
```

!> Deleting a JIRA Authentication will delete all JIRA Integrations associated with it.

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

## Creating a JIRA Integration

```graphql
mutation {
  createJiraIntegration(
    input: {
      jiraAuthenticationId: "TjAwN0FjY291bnQxMA"
      name: "Default JIRA Integration"
      jiraProjectId: "1"
      jiraIssueTypeId: "1"
    }
  ) {
    jiraIntegration {
      name
      jiraProjectId
      jiraIssueTypeId
      createdAt
      updatedAt
    }
  }
}
```

!> JIRA Project Id and JIRA Issue Type Id need to correspond to your JIRA projects and issue types.

## Updating a JIRA Integration

```graphql
mutation {
  updateJiraIntegration(
    input: {
      jiraIntegrationId: "TjAwN0FjY291bnQxMA"
      name: "Updated Default JIRA Integration"
      jiraProjectId: "2"
      jiraIssueTypeId: "2"
    }
  ) {
    jiraIntegration {
      name
      jiraProjectId
      jiraIssueTypeId
      createdAt
      updatedAt
    }
  }
}
```

## Deleting a JIRA Integration

```graphql
mutation {
  deleteJiraIntegration(
    input: {
      jiraIntegrationId: "TjAwN0FjY291bnQxMA"
    }
  ) {
    jiraIntegration {
      name
      jiraProjectId
      jiraIssueTypeId
      createdAt
      updatedAt
    }
  }
}
```

!> Deleting a JIRA Integration will delete all associations between Test Suites and that JIRA Integration.

# Linking a JIRA Integration to a Test Suite

```graphql
mutation {
  linkJiraIntegrationToTestSuite(
    input: {
      testSuiteId: "TjAwN0FjY291bnQxMB"
      jiraIntegrationId: "TjAwN0FjY291bnQxMA"
    }
  ) {
    testSuiteJiraIntegration {
      id
      testSuite {
        id
      }
      jiraIntegration {
        id
      }
    }
  }
}
```

# Unlinking a JIRA Integration from a Test Suite

```graphql
mutation {
  unlinkJiraIntegrationFromTestSuite(
    input: {
      testSuiteJiraIntegrationId: "TjAwN0FjY291bnQxMA"
    }
  ) {
    testSuiteJiraIntegration {
      id
    }
  }
}
```

!> Use the relationship id.

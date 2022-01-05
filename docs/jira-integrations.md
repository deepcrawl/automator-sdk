# JIRA Integrations

---

A test suite can be integrated with JIRA, in order to get notified if a test fails or warns. In order to use JIRA Integration, you first need to created a JIRA Authentication, than use that authentication in order to create a JIRA Integration and than connect that JIRA Integration to a test suite.

A JIRA Authentication consists of: a name, the JIRA Cloud ID, the JIRA url and the JIRA refresh token (obtained after authorizing the app).

A JIRA Integration consists of: a name, the created JIRA authentication id, the JIRA project id and the JIRA issue type id.

!> A test suite can only be linked to a JIRA integration at a time.

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

## Updating a JIRA Authentication

```graphql
{
  mutation {
    updateJiraAuthentication(
      input: {
        jiraAuhtenticationId: "TjAwN0FjY291bnQxMA"
        name: "Updated Default JIRA Authentication"
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

## Deleting a JIRA Authentication

```graphql
{
  mutation {
    deleteJiraAuthentication(
      input: {
        jiraAuhtenticationId: "TjAwN0FjY291bnQxMA"
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
{
  mutation {
    createJiraIntegration(
      input: {
        jiraAuthenticationId: "TjAwN0FjY291bnQxMA"
        name: "Default JIRA Integration"
        jiraProjectId: "1"
        jiraIssueTypeId: "1"
      }
    ) {
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
{
  mutation {
    updateJiraIntegration(
      input: {
        jiraIntegrationId: "TjAwN0FjY291bnQxMA"
        name: "Updated Default JIRA Integration"
        jiraProjectId: "2"
        jiraIssueTypeId: "2"
      }
    ) {
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
{
  mutation {
    deleteJiraIntegration(
      input: {
        jiraIntegrationId: "TjAwN0FjY291bnQxMA"
      }
    ) {
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
{
  mutation {
    linkJiraIntegrationToTestSuite(
      input: {
        testSuiteId: "TjAwN0FjY291bnQxMB"
        jiraIntegrationId: "TjAwN0FjY291bnQxMA"
      }
    ) {
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
{
  mutation {
    unlinkJiraIntegrationFromTestSuite(
      input: {
        testSuiteJiraIntegrationId: "TjAwN0FjY291bnQxMA"
      }
    ) {
      id
    }
  }
}
```

!> Use the relationship id.

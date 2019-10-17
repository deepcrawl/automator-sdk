# Authentication
---
## Regular Auth token

Use the `createAuthToken` mutation to get regular auth token, providing your DeepCrawl username and password. This token will be valid for 30 days.

```graphql
mutation {
  createAuthToken(username: "your-deepcrawl-username", password: "your-deepcrawl-password") {
    value
  }
}
```

Response:
```json
{
  "data": {
    "createAuthToken": {
      "value": "your-auth-token"
    }
  }
}
```
All other API requests must be authorised by setting the `X-Auth-Token` HTTP header with an auth token (`your-auth-token`).

## Long lasting Auth token
It is possible to generate special Automator long lasting token. This gives the same permissions as regular token, but lasts for 120 days. This can be helpful for using as part of CI scripts or environments. You'll need to be authenticated with regular token to request the following mutation.

```graphql
mutation {
  createAutomatorAuthToken {
    value
  }
}
```
Response:
```json
{
  "data": {
    "createAuthToken": {
      "value": "your-long-lasting-auth-token"
    }
  }
}
```
Now you can use `your-long-lasting-auth-token` in the `X-Auth-Token` header.
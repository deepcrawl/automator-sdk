# Authentication
---
## Regular Auth token

To get regular auth token you need to use `createAuthToken` mutation and provide your DeepCrawl username and password. This token will be valid for 30 days.

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
To Make any other API requests `your-auth-token` needs to be sent as `X-Auth-Token` header.

## Long lasting Auth token
It is possible to generate special Automator long lasting token. It's the same as regular token, but lasts for 120 days. You can for example use it in your CI scripts. You need to be authenticated with regular token to request the following mutation.

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
Now you can use `your-long-lasting-auth-token` in `X-Auth-Token` header.
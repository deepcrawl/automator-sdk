# Authentication
---
## Regular Auth token

Use the `createSessionUsingUsername` mutation to get regular auth token, providing your Lumar username and password. This token will be valid for 30 days.

```graphql
mutation {
  createSessionUsingUsername(
    input: {
      username: "{USERNAME}",
      password: "{PASSWORD}"
    }
  ) {
    token
  }
}
```

Response:
```json
{
  "data": {
    "createSessionUsingUsername": {
      "token": "{TOKEN}"
    }
  }
}
```
All other API requests must be authorised by setting the `X-Auth-Token` HTTP header with an auth token (`your-auth-token`).

## Long lasting Auth token
It is possible to generate special Lumar Protect long lasting token. This gives the same permissions as regular token, but lasts for 120 days. This can be helpful for using as part of CI scripts or environments. You'll need to be authenticated with regular token to request the following mutation.

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
    "createAutomatorAuthToken": {
      "value": "{TOKEN}"
    }
  }
}
```
Now you can use `{TOKEN}` in the `X-Auth-Token` header.

## User Keys

Instead of using your username and password to get token, you can generate up to two user keys that you can use to authenticate.

You can create the user key using `createUserKey` mutation (You need to be authenticated):

```graphql
mutation {
  createUserKey {
    id
    secret
  }
}
```

`id` and `secret` are important values as you'll be using them to get your `X-Auth-Token` instead of username and password.

!> `createUserKey` mutation is the only place where you can see your `secret`. After that, it'll be not possible to retrieve a full secret value for this key. Please copy it and save somewhere for later use.

You can delete the key using `createUserKey` mutation:

```graphql
mutation {
  deleteUserKey(input: {
    userKeyId: "{USER_KEY_ID}"
  }) {
    userKey {
      id
    }
  }
}
```

Once you have the user key, you can get your 'X-Auth-Token' unsing `createSessionUsingUserKey`:

```graphql
mutation {
  createSessionUsingUserKey(
    input: {
      userKeyId: "{USER_KEY_ID}",
      secret: "{USER_KEY_SECRET}"
    }
  ) {
    token
  }
}
```

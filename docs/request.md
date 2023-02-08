# Request
---
## GraphQL endpoint

Our GraphQL uses single endpoint:
```
https://api.lumar.io/graphql
```

## Request method

When interacting with our API, send all requests to a single endpoint using the __POST__ method.

## Required headers

There are 2 required request headers to interact with our API:

  - `X-Auth-Token: "{TOKEN}"` - token that you get from the [createAuthToken](/authentication?id=regular-auth-token) mutation (this is the only mutation that does not require authentication).
  - `Content-Type: application/json`

## Example request

This is an example request to get the user's basic information:

```
curl -H 'Content-Type: application/json' \
  -H "X-Auth-Token: {TOKEN}" \
  -X POST \
  -d '{ "query":"{ me { username }}"}' \
  https://api.lumar.io/graphql
```

Response will come in JSON format: 

```json
  {
    "me": {
      "username": "{USERNAME}"
    }
  }
```

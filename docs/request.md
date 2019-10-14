# Request
---
## GraphQL endpoint

Our GraphQL uses single endpoint:
```
https://canary-api.deepcrawl.com/
```

## Request method

When interacting with our API you send all requests to single endpoint using __POST__ method.

## Required headers

There are 3 required request headers to interact with our api:

  - `X-Auth-Token: "<your token>"` - token that you get from [createAuthToken](/authentication?id=regular-auth-token) mutation (it's the only mutation that does not require this header).
  - `Accept: "application/vnd.deepcrawl.meridian-preview"` - as Automator is currently still in beta, this header is required to access resources.
  - `Content-Type: application/json`

## Example request

This is an example request to get your basic user information:

```
curl -H 'Content-Type: application/json' \
  -H "X-Auth-Token: your token" \
  -H "Accept: application/vnd.deepcrawl.meridian-preview" \
  -X POST \
  -d '{ "query":"{ me { username }}"}' \
  https://canary-api.deepcrawl.com/
```

Response will come in JSON format: 

```json
  {
    "me": {
      "username": "your-username"
    }
  }
```
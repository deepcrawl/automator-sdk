# Lumar Protect Tools API

## Introduction

Lumar Protect Tools is a helper REST API that CI scripts are using to start and poll builds.
You can use this API along with Graph API to write your own scripts.

URL: https://tools.automator.deepcrawl.com

## Trigger Build

```
POST /start
```

This enpoint triggers a new build run. If there is a build already running, it will abort it and run a new one.

Available params:

`authToken` - Token for Graph API. You can find instruction for how to generate this token [here](authentication).

`testSuiteId` - ID of a test suite for which to run a build.

`ciBuildId` (optional) - Your internal build ID that can help you to identify the build in Protect.

Example request:

```
curl -s -X POST "https://tools.automator.deepcrawl.com/start" -H "Content-Type:application/json" -d "{\"authToken\":\"{TOKEN}\",\"testSuiteId\":\"{TEST_SUITE_ID}\"}"
```

Response:

```json
{
  "buildId": "{BUILD_ID}"
}
```

## Poll build

```
POST /poller
```

This endpoint polls for build status

Available params:

`authToken` - Token for Graph API. You can find instruction for how to generate this token [here](authentication).

`BuildId` - ID of a build to check.

Exampler request:

```
curl -s -X POST "https://tools.automator.deepcrawl.com/poller" -H "Content-Type:application/json" -d "{\"authToken\":\"{TOKEN}\",\"buildId\":"{BUILD_ID}"}"
```

If build is still running the response HTTP status will be `202` and the body will be empty.

If build has finished running the response HTTP status will be `200` and the example body will look like this:

```json
{
  "id": "{BUILD_ID}",
  "status": "Finished",
  "passed": true
}
```

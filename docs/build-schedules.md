# Build Schedules

---

Using build schedules, test suites can be scheduled at a given time. Repetition rate is also available and it can be used to repeat running the test suites at a given rate. The following repetition rates are available:

- `Hourly` (\*) - this is disabled in Automator application and should be used with caution. Having a build schedule running `Hourly` might involve making sure the test suites in it don't take more than 1 hour to run individually, otherwise, the builds won't finish.
- `EveryFourHours`
- `Daily`
- `Weekly`
- `Monthly`
- `EveryWeekday`

Build schedules are checked every 15 minutes, respectively at minute `00`, `15`, `30` and `45`. Having a build schedule set to start at any minute between those intervals, will make it run at the next check. e.g. If a build schedule is scheduled to run at 00:10, then it will run at 00:15.

Currently a test suite can only be linked to one build schedule at a time.

## Getting a build schedule by id

```graphql
{
  node(id: "{BUILD_SCHEDULE_ID}") {
    ... on BuildSchedule {
      name
      startAt
      repetitionRate
      nextRunAt
      lastRunStartedAt
      account {
        id
        name
      }
      buildScheduleTestSuites {
        nodes {
          id
          testSuite {
            id
            name
          }
          lastRunBuild {
            id
            status
            createdAt
          }
        }
      }
      createdAt
      updatedAt
    }
  }
}
```

!> `buildScheduleTestSuites` is used to obtain all links between the current build schedule and test suites, together with last build executed part of this link (`lastRunBuild`).

## Listing all build schedules in a given account

```graphql
{
  node(id: "{ACCOUNT_ID}") {
    ... on Account {
      buildSchedules {
        nodes {
          name
          startAt
          repetitionRate
          nextRunAt
          lastRunStartedAt
          account {
            id
            name
          }
          buildScheduleTestSuites {
            nodes {
              id
              testSuite {
                id
                name
              }
              lastRunBuild {
                id
                status
                createdAt
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
}
```

## Creating a build schedule

```graphql
{
  mutation {
    createBuildSchedule(input: {
      accountId: "{ACCOUNT_ID}"
      name: "{NAME}"
      startAt: {START_AT}
      repetitionRate: {REPETITION_RATE}
    }) {
      buildSchedule {
        id
      }
    }
  }
}
```

!> `name` is unique per Account.
!> `repetitionRate` is optional, meaning that build schedules can be non-repeatable.

## Updating a build schedule

```graphql
{
  mutation {
    updateBuildSchedule(input: {
      buildScheduleId: "{BUILD_SCHEDULE_ID}"
      name: "{NAME}"
      startAt: {START_AT}
      repetitionRate: {REPETITION_RATE}
    }) {
      buildSchedule {
        id
      }
    }
  }
}
```

!> Not specifying `startAt` will only update the repetition rate.
!> To make the build schedule non-repeatable, `null` can be set to `repetitionRate`.

## Deleting a build schedule

```graphql
{
  mutation {
    deleteBuildSchedule(input: { buildScheduleId: "{BUILD_SCHEDULE_ID}" }) {
      buildSchedule {
        id
      }
    }
  }
}
```

## Linking a test suite to a build schedule

```graphql
{
  mutation {
    linkTestSuiteToBuildSchedule(input: { testSuiteId: "{TEST_SUITE_ID}", buildScheduleId: "{BUILD_SCHEDULE_ID}" }) {
      buildScheduleTestSuite {
        id
        buildSchedule {
          id
        }
        testSuite {
          id
        }
      }
    }
  }
}
```

## Unlinking a test suite from a build schedule

```graphql
{
  mutation {
    unlinkTestSuiteFromBuildSchedule(input: { buildScheduleTestSuiteId: "{BUILD_SCHEDULE_TEST_SUITE_ID}" }) {
      buildScheduleTestSuite {
        id
      }
    }
  }
}
```

# Automatic Threshold

---

Instead of setting the thresholds manually for a test in a test suite, automatic threshold was introduced and it can be set on a test suite, in order to calculate the tests thresholds based on the latest 5 test results.

The automatic threshold can be set at the time of test suite creation or by updating the test suite.

!> At the moment, automatic threshold doesn't work with global templates. Marking a test suite as a global template, will reset the automatic threshold value to `false`. Trying to enable automatic threshold on a global template or on a child, will throw an error.

## Setting automatic threshold on a test suite

- Creating a test suite with automatic threshold enabled

```graphql
mutation {
  createTestSuite(
    input: {
      accountId: "{ACCOUNT_ID}"
      name: "{TEST_SUITE_NAME}"
      sitePrimary: "{TEST_SUITE_SITE_PRIMARY_URL}"
      automaticThreshold: true
    }
  ) {
    testSuite {
      id
      name
      automaticThreshold
    }
  }
}
```

- Updating a test suite, in order to enable automatic threshold

```graphql
mutation {
  updateTestSuite(input: { testSuiteId: "{TEST_SUITE_ID}", automaticThreshold: true }) {
    testSuite {
      id
      automaticThreshold
    }
  }
}
```

!> Disabling automatic threshold for a test suite can be achieved in the same way enabling is, but by setting it to `false`.

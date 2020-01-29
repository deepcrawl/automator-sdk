# URL File Uploads

## Create a URL file upload

To create a URL file upload, use the `CreateUrlFileUploadPayload` mutation.

Example mutation:
```graphql
mutation {
  CreateUrlFileUploadPayload(
    file: Upload,
    input: {
      crawlType: "list-crawl-type",
      testSuiteId: "test-suite-id",
      uploadBaseDomain: "http://test.com"
    }) {
      urlFileUpload {
        fileName
      }
  }
}
```
The `Upload` scalar type represents a file upload. `crawlType` and `testSuiteId` are the only required fields. For the full list of available fields see [List of available URL file upload fields](url-file-uploads?id=list-of-available-url-file-upload-fields) section.

## Update a URL file upload

To update a URL file upload, use the `updateUrlFileUpload` mutation.

Example mutation:
```graphql
mutation {
  updateUrlFileUpload(input: {
    uploadBaseDomain: "http://new-test.com"
  }) {
    urlFileUpload {
      uploadBaseDomain
    }
  }
}
```

For the full list of available fields see [List of available URL file upload fields](url-file-uploads?id=list-of-available-url-file-upload-fields) section.

## Delete a URL file upload

To delete a URL file upload, use the `deleteUrlFileUpload` mutation.

Example mutation:
```graphql
mutation {
  deleteUrlFileUpload(input: {
    urlFileUploadId: "url-file-upload-id"
  }) {
    urlFileUpload {
      id
    }
  }
}
```

## List of available URL file upload fields

<!-- tabs:start -->

#### ** Create **

Name | Type | Default
--- | --- | ---
`crawlType` | CrawlType |
`testSuiteId` | ObjectId |
`enabled` | Boolean | true
`uploadBaseDomain` | String | 

#### ** Update **

Name | Type
--- | ---
`urlFileUploadId` | ObjectId
`enabled` | Boolean
`uploadBaseDomain` | String

<!-- tabs:end -->

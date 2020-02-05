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

It may take a while to process a url file upload. The `status` field shows the current status of a url file upload. For the list of available upload statuses see [Available URL file upload statuses](url-file-uploads?available-url-file-upload-statuses)

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

## Available URL file upload statuses

Name | Description
`draft` | // Alek, any idea what about description for this?
`processing` | File upload is on progress.
`processed` | File upload is completed.
`errored` | File upload couldn't complete due to the error.

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

# URL File Uploads

## Create a URL file upload

To create a URL file upload, use the `createUrlFileUpload` mutation in [graphql multipart request](https://github.com/jaydenseric/graphql-multipart-request-spec#single-file).

Example curl request:
```bash
curl https://graph.deepcrawl.com/graphql \
  -H 'X-Auth-Token: <auth token>' \
  -H 'Accept: */*, application/vnd.deepcrawl.meridian-preview' \
  -F operations='{ "query": "mutation ($file: Upload) { createUrlFileUpload(file: $file, input: { crawlType: List, testSuiteId: \"{TEST_SUITE_ID}" }) { urlFileUpload { fileName } } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@url-list-file.csv
```
The `Upload` scalar type represents a file upload. The `crawlType`, `file` and `testSuiteId` are the only required fields. For the full list of available fields see [List of available URL file upload input fields](url-file-uploads?id=list-of-available-url-file-upload-input-fields) section.

It may take a while to process a url file upload. The `status` field shows the current status of a url file upload. For the list of available upload statuses see [Available URL file upload statuses](url-file-uploads?available-url-file-upload-statuses)

## Update a URL file upload

To update a URL file upload, use the `updateUrlFileUpload` mutation.

Example mutation:
```graphql
mutation {
  updateUrlFileUpload(input: {
    uploadBaseDomain: "{UPLOAD_BASE_DOMAIN}"
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
    urlFileUploadId: "{URL_FILE_UPLOAD_ID}"
  }) {
    urlFileUpload {
      id
    }
  }
}
```

## Available URL file upload statuses

Name | Description
--- | ---
`draft` | File upload has been created, but is not processing yet
`processing` | File upload is in progress.
`processed` | File upload is completed.
`errored` | File upload couldn't complete due to the error.

## List of available URL file upload input fields

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

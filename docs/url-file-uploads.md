# URL File Uploads

## Create a URL file upload

To create a URL file upload, use the `createUrlFileUpload` mutation in [graphql multipart request](https://github.com/jaydenseric/graphql-multipart-request-spec#single-file).

Example curl request:
```bash
curl https://graph.deepcrawl.com/graphql \
  -H 'X-Auth-Token: <auth token>' \
  -H 'Accept: */*, application/vnd.deepcrawl.meridian-preview' \
  -F operations='{ "query": "mutation ($file: Upload) { createUrlFileUpload(file: $file, input: { crawlType: List, testSuiteId: \"test-suite-id\" }) { urlFileUpload { fileName } } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@url-list-file.csv
```
The `Upload` scalar type represents a file upload. The `crawlType`, `file` and `testSuiteId` are the only required fields. For the full list of available fields see [List of available URL file upload input fields](url-file-uploads?id=list-of-available-url-file-upload-input-fields) section.

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

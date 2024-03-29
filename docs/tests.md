# Tests
---
## Listing test suite tests

Tests are individual assertions that we make during a build. To list the tests, you will need a test suite ID. See the [Test Suites](test-suites?id=listing-test-suites) section to find this.

The following query lists 50 tests:

```graphql
{
  node(id: "{TEST_SUITE_ID}") {
    ... on TestSuite {
      tests(first: 50) {
        nodes {
          id
          relativeThreshold
          severity
          reportTemplate {
            name
            code
          }
        }
      }
    }
  }
}
```

Every new test suite has 3 default tests assigned:
- Broken Pages (4xx Errors)
- 5xx Errors
- Max Fetch Time

## Adding test to tests suite

Lumar Protect tests are based on Lumar reports, to add test to a test suite, use the `createTest` mutation:

Example mutation:

```graphql
mutation {
  createTest(input: {
    testSuiteId: "{TEST_SUITE_ID}",
    reportTemplateCode: "{REPORT_TEMPLATE_CODE}"
  }) {
    test {
      id
    }
  }
}
```

`testSuiteId` and `reportTemplateCode` are the only required parameters. To see the full parameters and report template codes list see [List of available test fields](tests?id=list-of-available-test-fields)

## Updating a test

To update a test, use the `updateTest` mutation.

Example: 

```graphql
mutation {
  updateTest(input: {
    testId: "{TEST_ID}",
    relativeThreshold: {RELATIVE_THRESHOLD},
    severity: {SEVERITY}
  }) {
    test {
      id
      relativeThreshold
      severity
    }
  }
}
```

!> It's not possible to update the report template code for a test suite's test. You need to delete the test and create a new one with the new report template code.

?> Updating test won't affect previously completed builds and test results.


## Deleting a test from a test suite

To remove a test from a test suite, use the `deleteTest` mutation.

Example:

```graphql
mutation {
  deleteTest(input: {
    testId: "{TEST_ID}"
  }) {
    test {
      # Deleted test fields to be returned
      id
    }
  }
}
```

?> Removing a test from a test suite won't affect any previously completed builds and test results.

## List of available test fields

### Fields

<!-- tabs:start -->

#### ** Query **

Name | Type
--- | ---
`createdAt` | DateTime!
`updatedAt` | DateTime!
`severity` | Severity!
`reportTemplateCode` | String!
`id` | ObjectID!
`rawId` | String!
`relativeThreshold` | Int
`absoluteThreshold` | Int
`thresholdPredicate` | ThresholdPredicate!
`thresholdType` | ThresholdType!
`reportTemplate` | ReportTemplate!

#### ** Create **

Name | Type | Default
--- | --- | ---
`relativeThreshold` | Int | 10
`absoluteThreshold` | Int | 1
`thresholdPredicate` | ThresholdPredicate | "GreaterThanOrEqual"
`severity` | Severity | "Fail"
`testSuiteId` | ObjectID!
`reportTemplateCode` | String!
`thresholdType` | ThresholdType | "Relative"

#### ** Update **

Name | Type
--- | ---
`relativeThreshold` | Int
`absoluteThreshold` | Int
`thresholdPredicate` | ThresholdPredicate
`severity` | Severity
`testId` | ObjectID!
`thresholdType` | ThresholdType

<!-- tabs:end -->

### Report Template Codes

Code | Name | Description
--- | --- | ---
`4xx_errors` | Broken Pages (4xx Errors) | All HTML pages which return a 200 HTTP code in the response header.
`5xx_errors` | 5xx Errors | URLs that return any 5xx Server Error HTTP status code, such as a 503, often caused by a temporary server performance problem or a permanent issue.
`max_load_time` | Max Fetch Time | All URLs exceeding the maximum fetch time specified in Advanced settings > Thresholds (default: 2s).
`missing_titles` | Missing Titles | All pages with a blank or missing HTML title tags.
`empty_pages` | Empty Pages | All indexable pages with less content than the Content Size setting specified in Advanced settings > Thresholds.
`pages_without_canonical_tag` | Pages without Valid Canonical Tag | All indexable pages which are missing a canonical tag, or with conflicting canonical URLs in the HTTP header and HTML head.
`missing_h1_tags` | Missing H1 Tags | All pages without any H1 tags.
`canonicalized_noindexed_pages` | Canonicalized and Noindexed Pages | Pages which are canonicalised to another page, but which also contains a noindex directive.
`disallowed_js_css_uncrawled` | Disallowed JS/CSS | JavaScript and CSS files which are disallowed in robots.txt.
`duplicate_pages` | Duplicate Pages | Pages that share an identical title, description and near identical content with other pages found in the same crawl, excluding the primary page from each duplicated set. The primary page from each duplicated set of pages is based on the highest DeepRank.
`excessive_redirects_in` | Excessive Redirects In | Pages which have more than 30 redirects in from other URLs.
`broken_js_css` | Broken JS/CSS | JavaScript and CSS files which return a non-200 status code.
`disallowed_urls` | Disallowed URLs | All URLs which were disallowed in the robots.txt file on the live site, or from a custom robots.txt file in our Advanced Settings.
`301_redirects` | 301 Redirects | URLs that redirect to another URL using a 301 HTTP status code (a permanent redirect).
`canonicalized_pages` | Canonicalized Pages | Pages with URLs that are different to the canonical URL specified in the canonical tag in either the HTML or HTTP header.
`failed_urls` | Failed URLs | URLs which were crawled, but did not respond within the Lumar timeout period of 9 seconds.
`max_external_links` | High External Linking | All pages exceeding the maximum number of external links specified in Advanced settings > Report settings (default: 10 links).
`http_pages` | HTTP Pages | All pages using the non-secure HTTP scheme.
`javascript_redirects` | Javascript Redirects | Pages which, when rendered, were redirected to another URL by Javascript.
`max_content_size` | Max Content Size | All pages with more than a maximum content size specified in Advanced settings > Thresholds (default: 51,200bytes).
`max_description_length` | Max description Length | All pages with a description tag exceeding the max length specified in Advanced settings > Thresholds (default: 230).
`max_html_size` | Max HTML Size | All pages that exceed the maximum HTML size specified in Advanced settings > Thresholds (default: 204,800bytes).
`max_links` | Max Links | All pages exceeding the maximum number of links specified in Advanced settings > Thresholds.
`max_mobile_description_length` | Max Mobile description Length | All pages with a description tag exceeding the 200 characters (the average maximum length of a mobile description snippet in Google).
`max_redirections` | Max Redirections | Redirect chains which exceed the maximum number of redirects specified in Advanced settings > Thresholds (default: 4 redirections).
`max_title_length` | Max Title Length | All pages with HTML titles exceeding the max length specified in Advanced settings > Thresholds (default: 600 pixels).
`max_url_length` | Max URL Length | All URLs that exceed the maximum URL length specified in Advanced settings > Thresholds (default: 1024 characters).
`meta_refresh_redirect` | Meta Redirect | All pages with a meta refresh tag to a different URL.
`no_descriptions_`&_no_snippets | No descriptions & No Snippets | All pages with a no-snippet tag and without a description tag.
`non_301_redirects` | Non-301 Redirects | All 3xx (non-301) and meta refresh redirects chains found in the crawl.
`non_reciprocal_mobile_amp_desktop` | Non-reciprocal Mobile/AMP | Pages which have a mobile rel alternate link from another page or are AMP pages, but do not correctly canonicalise back; or those which have rel alternate links to a mobile or AMP page that does not reciprocate.
`amphtml_non_rel_alted` | Non-rel Alted AMP Pages | AMP pages which do not have a rel=amphtml link from another page.
`duplicate_body_content` | Pages with Duplicate Body | All pages with body content shared with at least one other page in the same crawl.
`pages_with_duplicate_descriptions` | Pages with Duplicate descriptions | All pages with an HTML description tag duplicated with another page included in the crawl.
`pages_with_duplicate_titles` | Pages with Duplicate Titles | All pages with an HTML title tag duplicated with another page included in the crawl.
`redirection_loop` | Redirect Loops | URLs chains which redirect back to themselves.
`short_descriptions` | Short descriptions | All pages with a description tag less than the minimum description length specified in Advanced settings > Thresholds (default: 50 characters).
`short_titles` | Short Titles | All pages with a title tag less than the minimum title length specified in Advanced settings > Thresholds (default: 10 characters).
`thin_pages` | Thin Pages | All pages with less than the minimum content size specified in Advanced settings > Thresholds.
`unauthorised_pages` | Unauthorised Pages | Pages which return a 401, 403, or 407 HTTP response code, indicating that the content could not be served, and therefore will not be indexed in search engines.
`uncategorised_http_response_codes` | Uncategorised HTTP Response Codes | 
`unlinked_paginated_pages` | Unlinked Paginated Pages | 

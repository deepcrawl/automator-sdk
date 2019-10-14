# Tests
---
## Listing test suite tests

To list test that test suite will run you should know your test suite id. On how to get it check [Test Suites](test-suites?id=listing-test-suites) section.

Example query to list 50 tests would look like this:

```graphql
{
  node(id: "test-suite-id") {
    ... on TestSuite {
      tests(first: 50) {
        nodes {
          id
          threshold
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

Every new tests suite has 3 default test assigned:
- Broken Pages (4xx Errors)
- 5xx Errors
- Max Fetch Time

## Adding test to tests suite

Automator tests are based on DeepCrawl reports, to add test to a test suite, you need to use `createTest` mutation:

Example mutation:

```graphql
mutation {
  createTest(input: {
    testSuiteId: "test-suite-id",
    reportTemplateCode: "5xx_errors"
  }) {
    test {
      id
    }
  }
}
```

`testSuiteId` and `reportTemplateCode` are the only required parameters. To see the full parameters and report template codes list see [List of available test fields](tests?id=list-of-available-test-fields)

## Updating a test

To update a test you need to use `updateTest` mutation.

Example: 

```graphql
mutation {
  updateTest(input: {
    testId: "test-id",
    threshold: 20,
    severity: Warning
  }) {
    test {
      id
      threshold
      severity
    }
  }
}
```

!> It's not posible to update report template code for test suite test. You'd have to delete test and create a new one with different report template code.

?> Updating test won't affect your already completed builds and test results.


## Deleting a test from a test suite

To remove a test form test suite you need to use `deleteTest` mutation.

Example:

```graphql
mutation {
  deleteTest(input: {
    testId: "test-id"
  }) {
    test {
      # Deleted test fields to be returned
      id
    }
  }
}
```

?> Removing test from a test suite won't affect your already completed builds and test results.

## List of available test fields

### Fields

Name | Type | Default
--- | --- | ---
`threshold` | Float | 10
`severity` | Severity | "Fail"
`testSuiteId` | ObjectID!
`reportTemplateCode` | String!

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
`failed_urls` | Failed URLs | URLs which were crawled, but did not respond within the DeepCrawl timeout period of 9 seconds.
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

# Overview
---

Automator API uses [GraphQL](https://graphql.github.io/) data query language.
GraphQL offers flexible way of interacting with your Automator data.

Our API allows two operations:
 - Query - for querying data
 - Mutation - for interacting with data

<!-- TODO: Add info about filters, pagination and ordering -->
<!-- TODO: Add list of available field types -->
<!-- TODO: Add embedded resources to field lists -->
<!-- TODO: Consider separating query fields from mutation params, currently some query fields are missing coz I copied them from create input params. Or add a `settable` and `gettable` column if field can be queried/updated -->

The following documentation describes how to connect to our API and achieve common tasks.

If you want to explore our GraphQL in more detail please see the [schema playground](https://canary-api.deepcrawl.com/).

## Query

A GraphQL query is for getting the data from our API. A basic query looks like:

```graphql
{
  typeName(
    # query params
  ) {
    nodes {
      # type fields
    }
  }
}
```

- `typeName` - is a resource name like `me`, `node`, a list of available types is [here]()
- `query params` - set of parameters to limit, filter, order, or paginate the results
- `nodes` - required keyword if returning multiple results
- `type fields` - fields to query

There are two special types: `node` and `nodes`. `node` returns a single object based on it's ID. `nodes` returns multiple objects for multiple IDs.

Example queries: 

```graphql
{
  node(id: "type-object-id") {
    ... on typeName {
      # type fields
    }
  }
}
```

```graphql
{
  nodes(ids: ["type-object-id-1", "type-object-id-2"]) {
    ... on typeName {
      # type fields
    }
  }
}
```

### Query params

There are 6 available query params that can be used:

Name | Type | Description
--- | --- | ---
`first` | Int | Number of first results to return
`after` | String | ID of a resource after which results should be returned. This can be used for pagination.
`last` | Int | Number of last results to return
`before` | String | ID of a resource before which results should be returned. This can be used for pagination.
`filters` | [TypeFilter!] | Array of filters in the form of `[{field1Predicate: value, field2Predicate: value}, {field3Predicate: value}]`.
`orderBy` | [TypeOrder!] | Array of order objects, e.g. `[{direction: DESC, field: fieldName}]`. Available directions are `DESC` and `ASC`.

## Mutation
GraphQL mutatations are for interacting with resources. A basic mutation looks like:

```graphql
mutation {
  mutationName(
    # mutation input params
  ) {
    # mutation output fields
  }
}
```

- `mutation` - required keyword
- `mutationName`- name of a mutation to run. For instance: `createBuild`, `updateTestSuite`, etc.
- `mutation input params` - params specific for each mutation.
- `mutation output fields` - usually a mutated type name with type fields
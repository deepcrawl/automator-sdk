# Overview
---

Automator API is using [GraphQL](https://graphql.github.io/) data query language.
GraphQL offers flexible way of interacting with your Automator data.

Our API allows two operations:
 - Query - for querying data
 - Mutation - for interacting with data

<!-- TODO: Add info about filters, pagination and ordering -->
<!-- TODO: Add list of available field types -->
<!-- TODO: Add embedded resources to field lists -->
<!-- TODO: Consider separating query fields from mutation params, currently some query fields are missing coz I copied them from create input params. Or add a `settable` and `gettable` column if field can be queried/updated -->

Following documatation describes how to connect to our api and how to interact with main resources.

If you want to explore our GraphQL in more detail please see our [schema playground](https://canary-api.deepcrawl.com/).
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "node-fetch";

import { getAuthTokenGql } from "./graphql/getAuthTokenGql";

export async function getAuthToken(url: string, userKeyId: string, userKeySecret: string): Promise<string> {
  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: url,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetch: <any>fetch,
    }),
  });

  const response = await apolloClient.mutate({
    mutation: getAuthTokenGql,
    variables: {
      userKeyId,
      userKeySecret,
    },
  });

  return <string>response.data.createSessionUsingUserKey.token;
}

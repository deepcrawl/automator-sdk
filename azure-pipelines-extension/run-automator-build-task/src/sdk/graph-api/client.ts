import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import fetch from "node-fetch";

import { URL_FOR_AUTH_TOKEN } from "@common/constants";
import { getAuthTokenGQL } from "@sdk/graph-api/gql/get-auth-token.gql";

class GraphAPIClient {
  private readonly apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: URL_FOR_AUTH_TOKEN,
        // TODO: https://github.com/apollographql/apollo-link/issues/513
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fetch: <any>fetch,
      }),
    });
  }

  public async getAuthToken(userKeyId: string, userKeySecret: string): Promise<string> {
    const response = await this.apolloClient.mutate({
      mutation: getAuthTokenGQL,
      variables: {
        userKeyId,
        userKeySecret,
      },
    });
    return <string>response.data.createSessionUsingUserKey.token;
  }
}

export const graphAPIClient = new GraphAPIClient();

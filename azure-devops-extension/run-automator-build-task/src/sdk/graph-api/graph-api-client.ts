import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import fetch from "node-fetch";

import { deleteAuthTokenGQL } from "@sdk/graph-api/gql/delete-auth-token.gql";
import { getAuthTokenGQL } from "@sdk/graph-api/gql/get-auth-token.gql";
import { IGraphAPIClient } from "@sdk/graph-api/interfaces/graph-api-client.interface";

export interface IGraphAPIClientOptions {
  url: string;
}

export class GraphAPIClient implements IGraphAPIClient {
  private readonly apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor({ url }: IGraphAPIClientOptions) {
    this.apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: url,
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

  public async deleteAuthToken(token: string): Promise<string> {
    const response = await this.apolloClient.mutate({
      mutation: deleteAuthTokenGQL,
      context: {
        headers: {
          "X-Auth-Token": token,
        },
      },
    });
    return <string>response.data.deleteSession.token;
  }
}

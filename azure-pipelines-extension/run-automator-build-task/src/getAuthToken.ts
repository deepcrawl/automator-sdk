import {ApolloClient, gql, HttpLink, InMemoryCache} from "@apollo/client/core";
import fetch from "node-fetch";

export async function getAuthToken(
  url: string,
  userKeyId: string,
  userKeySecret: string
) {
    const apolloClient = new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
          uri: url,
          fetch: <any>fetch,
        }),
    });

    const getAuthTokenGql = gql`
        mutation CreateSessionUsingUserKey(
            $userKeyId: ObjectID!
            $userKeySecret: String!
            ) {
            createSessionUsingUserKey(input: { userKeyId: $userKeyId, secret: $userKeySecret }) {
                token
            }
        }
    `;
    const response = await apolloClient.mutate({
        mutation: getAuthTokenGql,
        variables: {
            userKeyId,
            userKeySecret
        }
    }); 
    return response.data.createSessionUsingUserKey.token;
}

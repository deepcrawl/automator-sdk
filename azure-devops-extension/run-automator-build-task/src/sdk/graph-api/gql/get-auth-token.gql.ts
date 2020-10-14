import { gql } from "@apollo/client/core";

export const getAuthTokenGQL = gql`
  mutation CreateSessionUsingUserKey($userKeyId: ObjectID!, $userKeySecret: String!) {
    createSessionUsingUserKey(input: { userKeyId: $userKeyId, secret: $userKeySecret }) {
      token
    }
  }
`;

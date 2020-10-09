import { gql } from "@apollo/client/core";

export const deleteAuthTokenGQL = gql`
  mutation {
    deleteSession {
      token
    }
  }
`;

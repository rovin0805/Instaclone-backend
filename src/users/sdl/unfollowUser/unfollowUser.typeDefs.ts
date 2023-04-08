import { gql } from 'apollo-server-express';

export default gql`
  type UnfollowResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(username: String!): UnfollowResult
  }
`;

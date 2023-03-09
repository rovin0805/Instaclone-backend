import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    seeProfile(username: String!): User
  }

  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User

    login(username: String!, password: String!): LoginResult
  }

  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
`;

export default typeDefs;

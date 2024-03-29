import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: String
    photos(page: Int!): [Photo]
    createdAt: String!
    updatedAt: String!
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;

export default typeDefs;

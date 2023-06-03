import { gql } from 'apollo-server-express';

export default gql`
  type Comments {
    id: Int!
    user: User!
    photo: Photo!
    payload: String!
    isMe: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

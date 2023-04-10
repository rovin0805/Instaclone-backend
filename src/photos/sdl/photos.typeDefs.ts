import { gql } from 'apollo-server-express';

export default gql`
  type Photo {
    id: Int!
    file: String!
    caption: String
    user: User!
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }
`;

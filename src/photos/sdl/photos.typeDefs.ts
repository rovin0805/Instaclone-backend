import { gql } from 'apollo-server-express';

export default gql`
  type Photo {
    id: Int!
    file: String!
    caption: String
    user: User!
    hashtags: [Hashtag]
    likes: Int!
    isMe: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;

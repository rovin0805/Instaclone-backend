import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      bio: String
      avatar: Upload
      email: String
      password: String
    ): MutationResponse!
  }
`;

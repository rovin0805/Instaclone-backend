import { gql } from "apollo-server";

export default gql`
  type SearchedUsersResult {
    ok: Boolean!
    error: String
    searchedUsers: [User]
  }
  type Query {
    searchUsers(keyword: String!, lastId: Int): SearchedUsersResult!
  }
`;

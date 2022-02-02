import gql from "graphql-tag";

const viewAllUsers = gql`
  query viewAllUsers(
    $userType: String
    $authorityId: String
    $searchKey: String
    $page: Int
    $size: Int
  ) {
    viewAllUsers(
      userType: $userType
      authorityId: $authorityId
      searchKey: $searchKey
      page: $page
      size: $size
    ) {
      id
      name
      username
      userType
      userAuthorities
    }
  }
`;

export { viewAllUsers };

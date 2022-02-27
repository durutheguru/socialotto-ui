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
      userAuthorities {
        authorityId
        fileReferences
      }
    }
  }
`;

const viewUserDetails = gql`
  query viewUserDetails($userType: String, $username: String) {
    viewUserDetails(userType: $userType, username: $username) {
      id
      name
      username
      userType
      userAuthorities {
        authorityId
        fileReferences
      }
    }
  }
`;

const getUserCashoutInfo = gql`
  query getUserCashoutInfo($username: String, $email: String) {
    fetchUserWalletInfo(username: $username) {
      bankCode
      accountNumber
    }

    fetchBanks {
      bankCode
      bankName
    }

    fetchContract(username: $email) {
      username
      chargeType
      value
      cap
    }
  }
`;

export { viewAllUsers, viewUserDetails, getUserCashoutInfo };

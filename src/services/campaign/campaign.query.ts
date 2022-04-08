import gql from "graphql-tag";

const searchCampaigns = gql`
  query searchCampaigns(
    $searchKey: String
    $status: CampaignStatus
    $page: Int
    $size: Int
  ) {
    searchCampaigns(
      searchKey: $searchKey
      status: $status
      page: $page
      size: $size
    ) {
      id
      name
      description
      targetFunds
      totalFundsRaised
      campaignFiles {
        reference
        fileType
        publicUrl
      }
      owner {
        name
        username
      }
      endDate
      status
    }
  }
`;

const searchCampaignNames = gql`
  query searchCampaignNames($searchKey: String, $status: CampaignStatus, $page: Int, $size: Int) {
    searchCampaigns(searchKey: $searchKey, status: $status, page: $page, size: $size) {
      id
      name
      wallet {
        id
      }
    }
  }
`;

export { searchCampaigns, searchCampaignNames };

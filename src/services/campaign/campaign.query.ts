import gql from 'graphql-tag';

const searchCampaigns = gql`
query searchCampaigns($searchKey: String, $page: Int, $size: Int) {
    searchCampaigns(searchKey: $searchKey, page: $page, size: $size) {
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
`

export {
    searchCampaigns,
};

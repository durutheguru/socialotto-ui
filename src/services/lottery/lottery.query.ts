import gql from "graphql-tag";



const searchLotteries = gql `
	query searchLotteries($searchKey: String, $status: LotteryStatus, $page: Int, $size: Int) {
        searchLotteries(searchKey: $searchKey, status: $status, page: $page, size: $size) {
            id
            name
            description
            lotteryStatus
            ticketCost
            totalFundsRaised
            endDate
            lotteryFiles {
                reference
                fileType
                publicUrl
            }
            owner {
                username
            }
            stageDescriptions {
                id
                stage
                evaluationTime
            }
        }
	}
`;


export {
    searchLotteries,
};



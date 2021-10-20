import gql from "graphql-tag";

const lotteriesQuery = gql`
	query searchLotteries($searchKey: String, $page: Int, $size: Int) {
        searchLotteries(searchKey: $searchKey, page: $page, size: $size) {
            id
            name
            lotteryStatus
            ticketCost
            endDate
            lotteryFiles {
                reference
                fileType
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
    lotteriesQuery,
};

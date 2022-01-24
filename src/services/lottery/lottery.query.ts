import gql from "graphql-tag";

const searchLotteries = gql`
  query searchLotteries(
    $searchKey: String
    $status: LotteryStatus
    $page: Int
    $size: Int
  ) {
    searchLotteries(
      searchKey: $searchKey
      status: $status
      page: $page
      size: $size
    ) {
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

const evaluateSettlement = gql`
  query evaluateSettlement($lotteryId: ID!, $expense: Float!) {
    evaluateSettlement(lotteryId: $lotteryId, expense: $expense) {
      lotteryId
      lotteryName
      lotteryBalance
      transfers {
        amount
        sourceWalletId
        sourceWalletName
        destinationWalletId
        destinationWalletName
      }
    }
  }
`;

export { searchLotteries, evaluateSettlement };

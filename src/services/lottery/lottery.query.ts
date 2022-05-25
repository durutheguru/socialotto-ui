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

const fetchLotteryExpenseRequests = gql`
  query fetchLotteryExpenseRequests(
    $approvalStatus: ApprovalStatus
    $page: Int
    $size: Int
  ) {
    fetchLotteryExpenseRequests(
      approvalStatus: $approvalStatus
      page: $page
      size: $size
    ) {
      id
      lotteryId
      lotteryTotalFunds
      lotteryTitle
      amount
      approvalStatus
      statusMessage
    }
  }
`;

const getLotteryExpenseProposal = gql`
  query getLotteryExpenseProposal($expenseId: ID!) {
    getLotteryExpenseProposal(expenseId: $expenseId) {
      expense {
        id
        lotteryId
        lotteryTotalFunds
        amount
        lotteryTitle
        approvalStatus
        statusMessage
      }

      expenseBreakdowns {
        description
        amount
      }
    }
  }
`;

const lotteryById = gql`
  query lotteryById($id: ID!) {
    lotteryById(id: $id) {
      id
      name
      lotteryStatus
      ticketCost
      endDate
      lotteryFiles {
        reference
      }

      stageDescriptions {
        id
        stage
        evaluationTime
      }
      totalFundsRaised
    }
  }
`;

export {
  searchLotteries,
  evaluateSettlement,
  fetchLotteryExpenseRequests,
  getLotteryExpenseProposal,
  lotteryById,
};

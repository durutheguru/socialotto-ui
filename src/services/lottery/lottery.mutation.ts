import gql from "graphql-tag";

const LotteryExpenseAction = gql`
  mutation LotteryExpenseAction($input: LotteryExpenseApproval) {
    lotteryExpenseAction(action: $input) {
      id
      lotteryId
      amount
      approvalStatus
      statusMessage
    }
  }
`;

export { LotteryExpenseAction };

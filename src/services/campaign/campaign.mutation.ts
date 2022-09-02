import gql from "graphql-tag";

const newLotteryExpense = gql`
  mutation NewLotteryExpense($input: LotteryExpenseRequest) {
    newLotteryExpense(expense: $input) {
      id
      lotteryId
      amount
      approvalStatus
      statusMessage
    }
  }
`;

export { newLotteryExpense };

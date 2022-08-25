import gql from "graphql-tag";
const saveContract = gql`
  mutation SaveContract(
    $input: SettlementContractInput
    $walletData: WalletCashoutInfoInput
  ) {
    saveContract(contract: $input, walletData: $walletData) {
      username
      chargeType
      value
      cap
    }
  }
`;

export { saveContract };

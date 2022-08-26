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

const enableNGO = gql`
  mutation {
    enableNGO(
      ngoDetails: {
        username: "jolayemi+023x@gmail.com"
        website: "http://www.jolaz.com"
        primaryContact: {
          firstName: "Jolayemi"
          lastName: "LopoLopo"
          phone: "08087172355"
          email: "jolaz@gmail.com"
          nationalIdNumber: "38918487818783"
          nationalIdPhoto: "skjaiu29sk9-2789sb22-37sbka"
        }
        secondaryContact: {
          firstName: "Femi"
          lastName: "LopoLopo"
          phone: "08087172311"
          email: "femi@gmail.com"
          nationalIdNumber: "38918487811294"
          nationalIdPhoto: "skjaiu29sk9-2789sb22-37sbka"
        }
        ngoReferenceUpload: "skjaiu29sk9-2789sb22-37sbka"
        ngoRefererCacDocument: "skjaiu29sk9-2789sb22-37sbka"
        cacDocument: "skjaiu29sk9-2789sb22-37sbka"
        ngoAgreementContract: "skjaiu29sk9-2789sb22-37sbka"
      }
    ) {
      username
      website
      primaryContact {
        firstName
        lastName
      }
      secondaryContact {
        firstName
        lastName
      }
      cacDocument
      ngoAgreementContract
    }
  }
`;

export { saveContract, enableNGO };

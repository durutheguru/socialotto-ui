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

// const enableNGO = gql`
//   mutation {
//     enableNGO(
//       ngoDetails: {
//         username: String
//         website: String
//         primaryContact: {
//           firstName: String
//           lastName: String
//           phone: String
//           email: String
//           nationalIdNumber: String
//           nationalIdPhoto: String
//         }
//         secondaryContact: {
//           firstName: String
//           lastName: String
//           phone: String
//           email: String
//           nationalIdNumber: String
//           nationalIdPhoto: String
//         }
//         ngoReferenceUpload: String
//         ngoRefererCacDocument: String
//         cacDocument: String
//         ngoAgreementContract: String
//       }
//     ) {
//       username
//       website
//       primaryContact {
//         firstName
//         lastName
//       }
//       secondaryContact {
//         firstName
//         lastName
//       }
//       cacDocument
//       ngoAgreementContract
//     }
//   }
// `;

const enableNGO = gql`
  mutation EnableNGO($ngoDetails: NGODetailsInputDTO!) {
    enableNGO(ngoDetails: $ngoDetails) {
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

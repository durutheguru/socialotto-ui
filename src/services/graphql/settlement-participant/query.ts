


import gql from "graphql-tag";

const getSettlementParticipants = gql`
  {
    getSettlementParticipants {
        walletId
        walletName
        chargeType
        value
        cap
    }
  }
`;


export {
    getSettlementParticipants,
};




import gql from 'graphql-tag';


const WalletWithdrawalUpdateAction = gql`
    mutation WalletUpdateApproval($input: WalletUpdateApproval) {
        newWalletUpdateRequest(walletUpdateApproval: $input) {
            walletId
            approvalId
            approvalStatus
        }
    }
`;


export {
    WalletWithdrawalUpdateAction,
};



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


const ApproveWalletUpdateAction = gql`
    mutation WalletUpdateApproval($approvalId: String) {
        approveWalletUpdateRequest(approvalId: $approvalId) {
            walletId
            approvalId
            approvalStatus
        }
    }

`;


const FetchUserWalletInfo = gql`
    query FetchUserWalletInfo($username: String) {
        fetchUserWalletInfo(username: $username) {
            bankCode
            accountNumber
        }
    }
`;


export {
    WalletWithdrawalUpdateAction,
    ApproveWalletUpdateAction,
    FetchUserWalletInfo,
};


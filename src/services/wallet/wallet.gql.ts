
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


const InitializeWalletCashout = gql`
    mutation WalletCashOutInitResponse($input: WalletCashOutInitRequest) {
        initializeCashoutFromWallet(cashOutInitRequest: $input) {
            amount
            reference
        }
    }
`;


const CompleteCashoutRequest = gql`
    mutation WalletCashOutResponse($input: WalletCashOutRequest) {
        completeCashoutRequest(cashOutRequest: $input) {
            responseMessage
            responseCode
            requestSuccessful
            responseBody{
                dateCreated reference status amount totalFee 
            }
        }
    }
`;


export {
    WalletWithdrawalUpdateAction,
    ApproveWalletUpdateAction,
    FetchUserWalletInfo,
    InitializeWalletCashout,
    CompleteCashoutRequest,
};



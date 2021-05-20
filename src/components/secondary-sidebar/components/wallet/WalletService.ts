import Web, { APIErrorCallback, APISuccessCallback } from "@/components/util/Web";


export default class WalletService {


    public static getWallet(
        successCallback: APISuccessCallback,
        errorCallback: APIErrorCallback,
    ) {
        Web.get('/api/v1/wallet', successCallback, errorCallback);
    }


}



import { Web } from '@/components/util';
import PageRequest from '@/components/core/PageRequest';
import { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';


export default class LotteryUserService {


    public static getLotteryUsers(
        pageRequest: PageRequest, successHandler: APISuccessCallback, errorHandler?: APIErrorCallback
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL + '&projection=userDetails', successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/lottery_user?projection=userDetails&page='
                + pageRequest.page + '&size=' + pageRequest.size,
                successHandler, errorHandler
            );
        }
    }


    public static searchLotteryUsers(
        query: string, 
        pageRequest: PageRequest, 
        successHandler: APISuccessCallback,
        errorHandler: APIErrorCallback
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL + '&projection=userDetails', successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/lottery_user/search/searchUsers?projection=userDetails&name=' + query
                + '&username=' + query + '&page=' + pageRequest.page + '&size=' + pageRequest.size, 
                successHandler, errorHandler
            );
        }
    }


    public static createLotteryUser(
        user: any,
        successHandler: APISuccessCallback,
        errorHandler?: APIErrorCallback
    ) {
        Web.post(
            '/api/v1/lottery_user', user, 
            successHandler, errorHandler
        );
    }


}


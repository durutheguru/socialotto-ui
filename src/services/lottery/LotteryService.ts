
import PageRequest from '@/components/core/PageRequest';
import { Web, Constants } from '@/components/util';
import { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';




export default class LotteryService {


    public static createLottery(
        lottery: any, 
        successHandler: APISuccessCallback,
        errorHandler: APIErrorCallback
    ) {
        Web.post(
            Constants.API_BASE + '/lottery', 
            lottery, successHandler, errorHandler
        );
    }


    public static getLotteries(
        pageRequest: PageRequest,
        successHandler: APISuccessCallback,
        errorHandler: APIErrorCallback,
    ) {
        Web.get(
            '/api/v1/lottery?page=' + pageRequest.page + '&size=' + pageRequest.size,
            successHandler, errorHandler,
        );
    }


}



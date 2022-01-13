
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

    public static getLotteryOwner(
        name: string,
        successHandler: APISuccessCallback,
        errorHandler: APIErrorCallback,
    ) {
        Web.get(
            '/api/v1/platform_user/search/findByNameContaining?name=' + name,
            successHandler, errorHandler,
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


    public static getLotteryDetails(
        lotteryId: string,
        successHandler: APISuccessCallback,
        errorHandler: APIErrorCallback,
    ) {
        Web.get(
            `/api/v1/lottery/${lotteryId}`,
            successHandler, errorHandler,
        );
    }


    public static joinLottery(
        lotteryEntry: any,
        successHandler: APISuccessCallback,
        errorHandler: APIErrorCallback,
    ) {
        Web.post(
            `/api/v1/user_lottery_entry`,
            lotteryEntry, successHandler, errorHandler
        );
    }


}



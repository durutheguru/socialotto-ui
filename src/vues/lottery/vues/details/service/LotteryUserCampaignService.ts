
import { Web } from '@/components/util';
import { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';



export default class LotteryUserCampaignService {


    public static registerUserCampaign(
        campaignId: number, successHandler: APISuccessCallback, errorHandler: APIErrorCallback
    ) {
        Web.post(
            '/api/v1/user_campaign',

            {
                campaignId,
            },

            successHandler, errorHandler
        );
    }


}




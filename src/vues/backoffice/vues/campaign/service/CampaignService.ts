
import { Web } from '@/components/util';
import PageRequest from '@/components/core/PageRequest';
import { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';

import '@/interceptors/back-office/campaigns/CampaignInterceptor';


export default class CampaignService {


    public static getCampaigns(
        pageRequest: PageRequest,
        successHandler: APISuccessCallback,
        errorHandler: APIErrorCallback
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL, successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/campaign?page=' + pageRequest.page + 
                '&size=' + pageRequest.size,
                successHandler, errorHandler
            );
        }
    }


    public static searchCampaigns(
        query: string,
        pageRequest: PageRequest,
        successHandler: APISuccessCallback,
        errorHandler?: APIErrorCallback
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL, successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/campaign/search/searchCampaign?name=' + query 
                + '&desc=' + query,
                successHandler, errorHandler
            );
        }
    }


    public static getCampaignByStatus(
        status: string,
        pageRequest: PageRequest,
        successHandler: APISuccessCallback,
        errorHandler?: APIErrorCallback
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL, successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/campaign/search/byStatus?projection=campaignDetails' + 
                '&sort=id,desc&status=' + status, successHandler, errorHandler
            );
        }
    }


    public static saveCampaign(
        campaign: any,
        successHandler: APISuccessCallback, 
        errorHandler: APIErrorCallback
    ) {
        Web.post('/api/v1/campaign_request', campaign, successHandler, errorHandler);
    }


    public static treatCampaignApproval(
        approval: any,
        successHandler: APISuccessCallback,
        errorHandler: APIErrorCallback
    ) {
        Web.post('/api/v1/campaign_approval', approval, successHandler, errorHandler);
    }


    public static getCampaignStatusClass(status: string) {
        switch (status) {
            case 'ACTIVE':
            case 'APPROVED':
                return 'bg-success';
            case 'COMPLETED':
            case 'AWAITING_APPROVAL':
                return 'bg-info';
            case 'CANCELLED':
            case 'DISAPPROVED':
                return 'bg-important';
        }
    }

}





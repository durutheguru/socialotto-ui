import InterceptConfig, { InterceptResponse } from '@/interceptors/InterceptConfig';
import { default as data } from '@/interceptors/back-office/campaigns/campaign-responses.json';
import BaseInterceptor from '@/interceptors/BaseInterceptor';
import InterceptorRegistry from '@/interceptors/InterceptorRegistry';


export default class CampaignInterceptor extends BaseInterceptor {


    public interceptConfigs: InterceptConfig[] = [
        {
            url: '/api/v1/campaign?page=0&size=10',
            method: 'GET',
            response: ((data as any).getAll as InterceptResponse)
        },

        {
            url: '/api/v1/campaign/search/searchCampaign?name=a&desc=a',
            method: 'GET',
            response: ((data as any).search as InterceptResponse)
        },
    ];


}

InterceptorRegistry.register(new CampaignInterceptor());

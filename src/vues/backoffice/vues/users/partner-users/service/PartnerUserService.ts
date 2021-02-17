import { Web } from '@/components/util';
import PageRequest from '@/components/core/PageRequest';
import { APISuccessCallback, APIErrorCallback } from '@/components/util/Web';


export default class PartnerUserService {


    public static getPartnerUsers(
        pageRequest: PageRequest,
        successHandler: APISuccessCallback,
        errorHandler?: APIErrorCallback
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL + '&projection=userDetails', successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/partner_user?projection=userDetails&page=' 
                    + pageRequest.page + '&size=' + pageRequest.size, 
                successHandler, 
                errorHandler
            );
        }
    }


    public static searchPartnerUsers(
        query: string, 
        pageRequest: PageRequest, 
        successHandler: APISuccessCallback, 
        errorHandler?: APIErrorCallback
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL + '&projection=userDetails', successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/partner_user/search/searchUsers?projection=userDetails&name=' 
                + query + '&username=' + query + '&page=' + pageRequest.page + '&size=' + pageRequest.size, 
                successHandler, errorHandler
            );
        }
    }


    public static createPartnerUser(
        user: any, 
        successHandler: APISuccessCallback,
        errorHandler?: APIErrorCallback
    ) {
        Web.post(
            '/api/v1/partner_user', user, 
            successHandler, errorHandler
        );
    }


}


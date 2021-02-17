import { Web } from '@/components/util';
import PageRequest from '@/components/core/PageRequest';
import { APISuccessCallback, APIErrorCallback} from '@/components/util/Web';


export default class PartnerService {


    public static savePartner(
        partner: any, successHandler: APISuccessCallback, errorHandler?: APIErrorCallback
    ) {
        Web.post('/api/v1/partner', partner, successHandler, errorHandler);
    }


    public static getPartners(
        pageRequest: PageRequest,
        successHandler: APISuccessCallback, 
        errorHandler: APIErrorCallback
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL, successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/partner?page='
                + pageRequest.page + '&size=' + pageRequest.size,
                successHandler, errorHandler
            );
        }
    }


    public static getAllPartners(
        successHandler: APISuccessCallback, 
        errorHandler: APIErrorCallback
    ) {
        Web.get('/api/v1/partner/search/findBy?sort=name,asc', successHandler, errorHandler);
    }


    public static getAllPartnersMinified(
        successHandler: APISuccessCallback, 
        errorHandler: APIErrorCallback
    ) {
        Web.get(
            '/api/v1/partner/search/findBy?projection=partnerMinDetails&sort=name,asc', 
            successHandler, errorHandler
        );
    }


    public static searchPartnerNames(
        query: string, 
        pageRequest: PageRequest,
        successHandler: APISuccessCallback,
        errorHandler?: APIErrorCallback
    ) {
        if (pageRequest.URL) {
            Web.getAbsolute(pageRequest.URL, successHandler, errorHandler);
        } else {
            Web.get(
                '/api/v1/partner/search/searchName?name=' 
                + query + '&page=' + pageRequest.page + '&size=' + pageRequest.size, 
                successHandler, errorHandler
            );
        }
    }


}




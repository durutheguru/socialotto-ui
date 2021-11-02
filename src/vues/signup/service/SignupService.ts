import { Web } from '@/components/util';
import { APIErrorCallback, APISuccessCallback } from "@/components/util/Web";



export default class SignupService {


    public static signupPlatformUser(
        platformUser: any, 
        successHandler: APISuccessCallback,
        errorHandler: APIErrorCallback
    ) {
        Web.post('/api/v1/user_signup', platformUser, successHandler, errorHandler);
    }


}

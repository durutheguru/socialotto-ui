import { Web } from "../../components/util"
export default class EmailService {
    public static sendPassword(credentials: any,  successHandler: (response: any) => any, errorHandler?: (error: any) => any) {
        Web.post(
            '/api/v1/password_reset', credentials, successHandler, errorHandler,
        );
    }
}
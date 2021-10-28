import { Web } from "../../../components/util";

export default class PasswordReset {
    public static doReset(
        credentials: any, successHandler: (response: any) => any, errorHandler?: (error: any) => any,
    ) {
        Web.post(
            '/api/v1/password_reset/update', credentials, successHandler, errorHandler,
        );
    }
};

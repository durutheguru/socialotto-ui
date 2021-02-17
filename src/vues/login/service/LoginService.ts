import { Web } from '../../../components/util';
import '@/interceptors/login/LoginInterceptor';


export default class LoginService {

    public static doLogin(
        credentials: any, successHandler: (response: any) => any, errorHandler?: (error: any) => any,
    ) {
        Web.post(
            '/login', credentials, successHandler, errorHandler,
        );
    }


    public static doLogout() {
        localStorage.clear();
        Web.navigate('/login');
    }


}


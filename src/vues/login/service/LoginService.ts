import { Web } from '../../../components/util';
import '@/interceptors/login/LoginInterceptor';
import store from '@/store';


export default class LoginService {

    
    public static doLogin(
        credentials: any, successHandler: (response: any) => any, errorHandler?: (error: any) => any,
    ) {
        Web.post(
            '/login', credentials, successHandler, errorHandler,
        );
    }


    public static doTwitterLogin(
        credentials: any, successHandler: (response: any) => any, errorHandler?: (error: any) => any,
    ) {
        Web.post(
            '/twitter/oauth', credentials, successHandler, errorHandler,
        );
    }


    public static doLogout() {
        localStorage.clear();
        Web.navigate('/login');
    }


    public static isUserLoggedIn() {
        return store.getters['authToken/loggedIn'];
    }


    public static isUserActive() {
        return store.getters['authToken/isUserActive'];
    }


}


import InterceptConfig, { InterceptResponse } from '@/interceptors/InterceptConfig';
import {default as data} from '@/interceptors/login/login-responses.json';
import BaseInterceptor from '../BaseInterceptor';
import InterceptorRegistry from '../InterceptorRegistry';



export default class LoginInterceptor extends BaseInterceptor {


    public interceptConfigs: InterceptConfig[] = [
        {
            url: '/login',
            method: 'POST',
            response: ((data as any).default as InterceptResponse)
        }
    ];


}


InterceptorRegistry.register(new LoginInterceptor());


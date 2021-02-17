import InterceptConfig from '@/interceptors/InterceptConfig';
import BaseInterceptor from '../BaseInterceptor';
import InterceptorRegistry from '../InterceptorRegistry';



export default class AuthCheckInterceptor extends BaseInterceptor {


    public interceptConfigs: InterceptConfig[] = [
        {
            url: '/api/v1/auth',
            method: 'GET',
            response: {
                headers: {},
                body: {},
                status: 200
            },
        }
    ];


}


InterceptorRegistry.register(new AuthCheckInterceptor());


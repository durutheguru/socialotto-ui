import InterceptConfig from '@/interceptors/InterceptConfig';
import BaseInterceptor from '@/interceptors/BaseInterceptor';
import InterceptorRegistry from '@/interceptors/InterceptorRegistry';


export default class BackOfficeUsersInterceptor extends BaseInterceptor {


    public interceptConfigs: InterceptConfig[] = [
        {
            url: '/api/v1/back_office_user',
            method: 'POST',
            response: {
                headers: {},
                body: {},
                status: 201
            },
        }
    ];

}

InterceptorRegistry.register(new BackOfficeUsersInterceptor());


import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Log from '@/components/util/Log';
import IInterceptor from './IInterceptor';


export default class InterceptorRegistry {

    public static interceptors: IInterceptor[] = [];

    public static BASE_URL: string = process.env.VUE_APP_BASE_URL;

    private static mock: MockAdapter = new MockAdapter(axios, { onNoMatch: 'passthrough' });


    public static register(interceptor: IInterceptor) {
        const interceptorsEnabled = (process.env.VUE_APP_ENABLE_INTERCEPTORS === 'true');

        if (!interceptorsEnabled) {
            Log.info('Interceptors disabled. Ignoring Interceptor registration.');
            return;
        }
        
        for (const config of interceptor.interceptConfigs) {
            switch (config.method) {
                case 'GET': {
                    Log.info('Registering GET handler for ' + InterceptorRegistry.BASE_URL + config.url);
                    InterceptorRegistry.mock
                        .onGet(InterceptorRegistry.BASE_URL + config.url)
                        .reply(
                            config.response.status, 
                            config.response.body,
                            config.response.headers
                        );
                    break;
                }

                case 'POST': {
                    Log.info('Registering POST handler for ' + InterceptorRegistry.BASE_URL + config.url);
                    InterceptorRegistry.mock
                        .onPost(InterceptorRegistry.BASE_URL + config.url)
                        .reply(
                            config.response.status, 
                            config.response.body,
                            config.response.headers
                        );
                    break;
                }
            }
        }

        this.interceptors.push(interceptor);
    }


}


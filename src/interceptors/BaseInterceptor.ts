import { AxiosError } from 'axios';
import IInterceptor from './IInterceptor';
import InterceptConfig from '@/interceptors/InterceptConfig';


export default class BaseInterceptor implements IInterceptor {

    public interceptConfigs: InterceptConfig[] = [];


    public getMatchingUrl(url: string): string | undefined {
        const intercept = this.getMatchingInterceptConfig(url);
        if (intercept) {
            return intercept.url;
        }
    }


    public hasMatchingUrl(url: string): boolean {
        const intercept = this.getMatchingInterceptConfig(url);
        return !!intercept;
    }


    private getMatchingInterceptConfig(url: string): InterceptConfig | null {
        const intercept = this.interceptConfigs.filter((config: InterceptConfig) => {
            return url.indexOf(config.url) > -1;
        });

        if (intercept.length) {
            return intercept[0];
        }
        
        return null;
    }


}




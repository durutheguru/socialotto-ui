import InterceptConfig from './InterceptConfig';


export default interface IInterceptor {

    interceptConfigs: InterceptConfig[];

    getMatchingUrl: (url: string) => string | undefined;

    hasMatchingUrl(url: string): boolean;

}



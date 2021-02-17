import axios, { AxiosRequestConfig } from 'axios';
import store from '../../store';
import { Constants, Log } from '.';


axios.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        const matchingExcludePaths = Constants.authExcludeApiPaths.filter((value: string, index: number) => {
            config.url = config.url || '';
            return config.url.indexOf(value) > -1;
        });

        if (matchingExcludePaths.length === 0 && config.url?.startsWith(process.env.VUE_APP_BASE_URL)) {
            config.headers.Authorization = store.getters['authToken/apiToken'];
        }

        return config;
    },
);


export type APISuccessCallback = (response: any) => any;
export type APIErrorCallback = (error: any) => any;
export type SSECallback = (event: any) => void;


function isSSECallback(obj: SSECallback): obj is SSECallback {
    return !!(obj as SSECallback);
}


export default class Web {


    public static BASE_URL: string = process.env.VUE_APP_BASE_URL;


    public static get(
        url: string, successCallback: APISuccessCallback, errorCallback?: APIErrorCallback,
    ) {
        Web.getAbsolute(Web.BASE_URL + url, successCallback, errorCallback);
    }


    public static getAbsolute(
        url: string, successCallback: APISuccessCallback, errorCallback?: APIErrorCallback,
    ) {
        axios.get(url)
        .then(successCallback)
        .catch(errorCallback);
    }


    public static post(
        url: string, data: any, successCallback: APISuccessCallback, errorCallback?: APIErrorCallback,
    ) {
        Web.postAbsolute(Web.BASE_URL + url, data, successCallback, errorCallback);
    }


    public static postAbsolute(
        url: string, data: any, successCallback: APISuccessCallback, errorCallback?: APIErrorCallback,
    ) {
        axios.post(url, data)
        .then(successCallback)
        .catch(errorCallback);
    }


    public static navigate(url: string) {
        window.location.href = url;
    }


    public static sse(
        url: string, eventHandlerObject: any, messageCallback: SSECallback | null): EventSource {
        const eventSource = new EventSource(Web.BASE_URL + url);

        for (const handler in eventHandlerObject) {
            if (isSSECallback(eventHandlerObject[handler])) {
                Log.info(`Handler ${handler} is SSE Callback`);

                eventSource.addEventListener(
                    handler, eventHandlerObject[handler]
                );
            } else {
                Log.info(`Handler ${handler} not SSE Callback`);
            }
        }

        if (messageCallback) {
            eventSource.onmessage = messageCallback;
        }

        return eventSource;
    }


}

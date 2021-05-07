
export default class Constants {


    public static API_BASE: string = '/api/v1';


    // Event Related Constants
    public static dialogClosedEvent: string = 'close-dialog';

    public static routeUpdateEvent: string = 'route-updated';

    public static routeClearedEvent: string = 'route-cleared';

    public static fileUploadEvent: string = 'file-upload';

    public static newStoreDataEvent: string = 'new-store-data';

    public static defaultEventTriggerTimeout: number = 400;

    public static previousPageNavigationEvent: string = 'previous-page-nav';
    
    public static nextPageNavigationEvent: string = 'next-page-nav';



    // APIs to exclude authorization
    public static authExcludeApiPaths: string[] = [
        '/login',
        '/oauth/login',
        '/twitter/oauth',
    ];


    // Regex constants
    public static regexps: any = {
        AUTH_TOKEN: /^Bearer .+\.(.*)(\..+)+$/,
        EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    };


    // Misc
    public static defaultPagination: any = {
        page: 0,
        size: 10,
    };


    public static lotteryStages: string[] = [
        'FIRST', 'SECOND', 'THIRD',
    ];

    
    public static campaignTypes: string[] = [
        'SINGLE', 'RECURRING'
    ];


}



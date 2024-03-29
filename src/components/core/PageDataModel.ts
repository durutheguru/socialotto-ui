import { Util } from '../util';
import Log from '@/components/util/Log';
import Constants from '../util/Constants';
import PageResponseResolver from './resolver/PageResponseResolver';
import HalJsonPageResponseResolver from './resolver/HalJsonPageResponseResolver';



const defaultPageData = () => {
    return {

        next: {},

        previous: {},

        number: Constants.defaultPagination.page,

        size: Constants.defaultPagination.size,

        totalElements: 0,

        totalPages: 0,

        minTimeStamp: 0,

        maxTimeStamp: 0,
    };

};


const defaultPageModel = () => {

    return {
        loading: false,

        error: '',

        list: [],

        entityKeyName: '',

        searchResults: false,

        searchQuery: '',

        pageData: defaultPageData(),
    };

};



export default class PageDataModel {

    public loading: boolean = false;

    public error: string = '';

    public list: any = [];

    public pageData: any = defaultPageData();

    public searchResults: boolean = false;

    public searchQuery: string = '';

    public static defaultResolver: PageResponseResolver = new HalJsonPageResponseResolver();


    constructor(
        private entityKeyName: string, // string value used to extract entity from page response
        public loadEntityFunction?: (url?: string) => void, // function to invoke to load entity
        public searchEntityFunction?: (query: string, url?: string) => void, // function to invoke when searching entity
    ) { }


    public initialize() {
        if (!!this.loadEntityFunction) {
            this.loadEntityFunction();
        }
    }


    public clearPageData() {
        this.pageData = defaultPageData();
    }


    public setLoading(loading: boolean) {
        if (loading) {
            this.error = '';
            Log.info('Loading ' + this.entityKeyName);
        }

        this.loading = loading;
    }


    public setError(error: string) {
        this.error = error;
    }


    public assignResponse(response: any, isSearchResult: boolean = false) {
        this.searchResults = isSearchResult;
        this.list = response.data._embedded[this.entityKeyName];
        this.pageData = response.data.page;
        this.pageData.next = response.data._links.next || {};
        this.pageData.previous = response.data._links.prev || {};
    }


    public next() {
        if (!this.searchResults) {
            if (!!this.loadEntityFunction) {
                Log.info('Loading Next ' + this.entityKeyName + ' ...');
                this.loadEntityFunction(
                    this.pageData.next.href
                );
            }
        } else {
            Log.info('Searching Next ' + this.entityKeyName + ' ...');
            if (!!this.searchEntityFunction) {
                this.searchEntityFunction(
                    this.searchQuery, this.pageData.next.href
                );
            }
        }
    }


    public previous() {
        if (!this.searchResults) {
            if (!!this.loadEntityFunction) {
                Log.info('Loading Previous ' + this.entityKeyName + ' ...');
                this.loadEntityFunction(
                    this.pageData.previous.href
                );
            }
        } else {
            Log.info('Searching Previous ' + this.entityKeyName + ' ...');
            if (!!this.searchEntityFunction) {
                this.searchEntityFunction(
                    this.searchQuery, this.pageData.previous.href
                );
            }
        }
    }


    public hasElements(): boolean {
        return !!this.pageData.totalElements;
    }


    public canNext(): boolean {
        return !!this.pageData.next.href;
    }


    public canPrevious(): boolean {
        return !!this.pageData.previous.href;
    }


    public static newModel(entity: string): any {
        return {
            ...defaultPageModel(),

            entityKeyName: entity
        };
    }


    public static appendModelData(
        model: any,
        response: any,
        isSearchResult: boolean = false,
        getters?: any,
        resolver?: PageResponseResolver,
    ) {
        model.searchResults = isSearchResult;

        if (!!resolver) {
            resolver.append(model, response, getters);
        } else {
            PageDataModel.defaultResolver.append(model, response, getters);
        }
    }


    public static prependModelData(
        model: any,
        response: any,
        isSearchResult: boolean = false,
        getters: any,
        resolver?: PageResponseResolver
    ) {
        model.searchResults = isSearchResult;

        if (!!resolver) {
            resolver.prepend(model, response, getters);
        } else {
            PageDataModel.defaultResolver.prepend(model, response, getters);
        }
    }


    /**
     * 
     * @param basePath 
     * @returns 
     */
    public static getPrependUrl(basePath: string, maxTimeStamp: any): string {
        if (Util.isValidPositiveNumber(maxTimeStamp)) {
            return `${basePath}?after=${maxTimeStamp}`;
        }

        return basePath;
    }


    public static getAppendUrl(basePath: string, minTimeStamp: number): string {
        if (Util.isValidPositiveNumber(minTimeStamp)) {
            return `${basePath}?before=${minTimeStamp}`;
        }

        return basePath;
    }


}



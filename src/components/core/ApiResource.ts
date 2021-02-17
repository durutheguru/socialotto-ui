

const plainResource = {
    error: '',

    loading: false,

    data: {},
};


export default class ApiResource {


    public constructor(
        public error: string,

        public loading: boolean,

        public data: any
    ) {}


    public static create() {
        return new ApiResource(
            '', false, {}
        );
    }


    public static plain() {
        return {
            ...plainResource,
        };
    }


}



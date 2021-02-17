

export default class ApiResourceList {


    public constructor(
        public error: string,

        public loading: boolean,

        public data: any[]
    ) {}


    public static createDefault() {
        return new ApiResourceList(
            '', false, []
        );
    }


}


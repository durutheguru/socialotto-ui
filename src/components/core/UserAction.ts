
export default class UserAction {

    public constructor(
        public title: string,
        public icon: string,
        public executable: () => void
    ) {}


}




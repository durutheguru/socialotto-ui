
import store from '@/store';


export default class Security {


    public static hasAuthorization(auth: string): boolean {
        const authorizations = store.getters['authToken/authorizations'];
        return authorizations != null && authorizations.length && authorizations.indexOf(auth) >= 0;
    }


}


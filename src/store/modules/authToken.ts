import Web from '@/components/util/Web';
import UserAuthContext from '@/components/auth/UserAuthContext';
import '@/interceptors/auth/AuthCheckInterceptor';
import { Log } from '@/components/util';


const state = {
    loggedIn: false,
    authToken: null,
    userEnabled: null,
};


const getters = {

    apiToken(context: any) {
        return context.authToken;
    },

    loggedIn(context: any) {
        return context.loggedIn;
    },

    isUserActive(context: any) {
        return context.userEnabled;
    }

};


const mutations = {

    apiToken(context: any, token: string) {
        context.loggedIn = true;
        context.authToken = token;

        const userAuthContext = UserAuthContext.getInstance();
        userAuthContext.initialize(token);

        context.userEnabled = userAuthContext.isEnabled();
        Log.info(`Context State: context.userEnabled ${context.userEnabled}`);
    },

};


const actions = {

    async authenticate(context: any) {
        return new Promise((resolve, reject) => {
            Web.get(
                '/api/v1/auth',

                (response: any) => {
                    resolve(true);
                },

                (error: any) => {
                    resolve(false);
                },
            );
        });
    },

};


export default {
    namespaced : true,
    state,
    getters,
    actions,
    mutations,
};


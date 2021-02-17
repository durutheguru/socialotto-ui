import store from '../../store';
import { Log, Web, Util } from '../../components/util';


const authRoute = async (to: any, next: any) => {
    Log.info('Auth Logged In: ' + store.getters['authToken/loggedIn']);

    if (store.getters['authToken/loggedIn']) {
        const authenticated = await store.dispatch('authToken/authenticate');
        if (!authenticated) {
            navigateLogin(to, next);
        } else {
            navigatePath(next);
        }
    } else {
        navigateLogin(to, next);
    }
};


const navigateLogin = (to: any, next: any) => {
    store.commit('entryUrl', to.path);
    Web.navigate('/login');
};


const navigatePath = (next: any) => {
    const url = store.getters.entryUrl;

    if (Util.isValidString(url)) {
        next(url);
        store.commit('entryUrl', null);
    } else {
        next();
    }
};


export default function(to: any, from: any, next: any) {
    if (to.matched.some((record: any) => record.meta.skipAuth)) {
        next();
        return;
    }

    authRoute(to, next);
}


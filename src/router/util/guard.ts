import store from '../../store';
import { Log, Web, Util } from '../../components/util';


const authRoute = async (to: any, next: any) => {
    Log.info('Auth Logged In: ' + store.getters['authToken/loggedIn']);

    if (store.getters['authToken/loggedIn']) {
        const authenticated = await store.dispatch('authToken/authenticate');
        if (!authenticated) {
            navigateLogin(to, next);
        } else {
            let userActive = store.getters['authToken/isUserActive'];
            if (userActive === true || true) {
                navigatePath(next);
            } else if (userActive === false) {
                Web.navigate('/user_activation');
            } else {
                Log.warn('userActive flag undefined. Unable to proceed');
            }
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


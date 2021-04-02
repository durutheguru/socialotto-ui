import { Component } from 'vue-property-decorator';

import BaseVue from '../../components/BaseVue';
import { Log, Util } from '../../components/util';
import '@/components/util/Validation';
import UserAuthContext from '@/components/auth/UserAuthContext';

import LoginService from './service/LoginService';
import UserLoginToken from './core/UserLoginToken';

import WithRender from './login.html';
import store from '@/store';
import { ListFormat } from 'typescript';


@WithRender
@Component
export default class LoginComponent extends BaseVue {

    private loading: boolean = false;

    private username: string = '';

    private password: string = '';

    private secret: string = '';

    private loginError: string = '';


    public mounted() {
        /**
         * check presence of URL parameters.
         * if present:
         *   * decrypt
         *   * call endpoint to login and fetch access token and refresh token
         *   * store accesstoken in local storage
         *   * navigate to next page
         * if not present:
         *      check presence of local accesstoken. 
         *   *   if present, validate token
         *   *          if valid, enter next page
         *   *          else show login page
         *   *   else:
         *          show login page
         * 
         */
        
        if (this.isURLParamsSet()) {
            const userToken = this.getURLParams();

            this.username = atob(decodeURIComponent(userToken.username));
            this.password = atob(decodeURIComponent(userToken.key));
            this.secret = atob(decodeURIComponent(userToken.secret));

            Log.info(`I: ${this.username}, TN: ${this.password}, SS: ${this.secret}`);
            this.doLogin();
        } else {
            Log.info('URL params not set');
        }
    }


    private isURLParamsSet(): boolean {
        const query = this.$route.query;

        const id = query.i as string;
        const key = query.tn as string;
        const secret = query.ss as string;

        return Util.isValidString(id) && Util.isValidString(key) && Util.isValidString(secret);
    }


    private getURLParams(): UserLoginToken {
        const query = this.$route.query;

        return new UserLoginToken(
            query.i as string, query.tn as string, query.ss as string,
        );
    }


    private doLogin() {
        this.loading = true;
        this.loginError = '';

        LoginService.doLogin(
            {
                username: this.username,
                password: this.password,
                secret: this.secret,
            },

            (response: any) => {
                this.loading = false;
                store.commit('authToken/apiToken', response.headers.authorization);
                this.$router.push({path: UserAuthContext.getInstance().homeUrl()});
                Log.info('Logged In: ' + JSON.stringify(response));
            },

            (error: any) => {
                this.loading = false;
                this.extractLoginError(error);
                Log.error('Logged Error: ' + JSON.stringify(error));
            },
        );
    }


    private extractLoginError(error: any) {
        if (error.response) {
            if (error.response.status === 401) {
                this.loginError = 'Invalid Username / Password';
                return;
            } else if (error.response.status === 0) {
                this.loginError = 'Cannot Reach Server';
                return;
            }
        }

        this.loginError = 'Unknown Error Occurred';
    }


}



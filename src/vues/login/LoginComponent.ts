import { Component } from 'vue-property-decorator';

import BaseVue from '../../components/BaseVue';
import ErrorCode from '@/components/util/ErrorCode';
import { Log, Web, Util } from '../../components/util';
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

    private username: string = '';

    private email: string = '';

    private password: string = '';

    private secret: string = '';

    private loading: boolean = false;

    private loginUrl: string | undefined = process.env.VUE_APP_BASE_URL;

    private loginError: string = '';

    private agree: boolean = false;


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
        
        // if (this.isLoginFailureURLParamsSet()) {
        //     this.handleLoginFailureURLParams();
        // } else if (this.isLoginSuccessURLParamsSet()) {
        //     this.handleLoginSuccessURLParams();
        // } else {
        //     Log.info('URL params not set');
        // }
        if (this.isLoginFailureURLParamsSet()) {
            this.handleLoginFailureURLParams();
        } else {
            Log.info('URL params not set');
        }
    }


    private isLoginFailureURLParamsSet(): boolean {
        const query = this.$route.query;

        const error = query.err as string;

        return Util.isValidString(error);
    }


    private handleLoginFailureURLParams() {
        const query = this.$route.query;
        const error = query.err as string;
        this.loginError = ErrorCode.map.get(error) || "";
    }


    private isLoginSuccessURLParamsSet(): boolean {
        const query = this.$route.query;

        const id = query.i as string;
        const key = query.tn as string;
        const secret = query.ss as string;

        return Util.isValidString(id) && Util.isValidString(key) && Util.isValidString(secret);
    }


    private handleLoginSuccessURLParams() {
        const userToken = this.getURLParams();

        this.username = atob(decodeURIComponent(userToken.username));
        this.password = atob(decodeURIComponent(userToken.key));
        this.secret = atob(decodeURIComponent(userToken.secret));

        Log.info(`U: ${this.username}, SS: ${this.secret}`);
        this.doCredentialVerification();
    }


    private getURLParams(): UserLoginToken {
        const query = this.$route.query;

        return new UserLoginToken(
            query.i as string, query.tn as string, query.ss as string,
        );
    }


    private doCredentialVerification() {
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
                LoginService.handleSuccessfulLogin(response, this);
            },

            (error: any) => {
                this.loading = false;
                this.extractLoginError(error);
                Log.error('Logged Error: ' + JSON.stringify(error));
            },
        );
    }


    private doLogin() {
        this.loading = true;
        this.loginError = '';

        LoginService.doTwitterLogin(
            {
                email: this.email
            },

            (response: any) => {
                this.loading = false;
                Log.info('Logged In: ' + JSON.stringify(response));
                Web.navigate(response.data);
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



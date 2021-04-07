
import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';

import WithRender from './activation.html';
import LoginService from '../login/service/LoginService';


@WithRender
@Component
export default class UserActivationComponent extends BaseVue {


    public mounted() {
        if (!LoginService.isUserLoggedIn() || LoginService.isUserActive()) {
            LoginService.doLogout();
        }
    }


    public goToLogin() {
        LoginService.doLogout();
    }


}



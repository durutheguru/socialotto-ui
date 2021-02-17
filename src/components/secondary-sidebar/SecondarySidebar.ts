import $ from 'jquery';
import { Component } from 'vue-property-decorator';
import BaseVue from '../BaseVue';
import NavMenuList from '@/components/nav-menu-list/NavMenuList';
import { Log, Constants } from '@/components/util';
import { EventBus } from '@/components/core/Event';
import UserAction from '@/components/core/UserAction';

import LoginService from '@/vues/login/service/LoginService';

import WithRender from './secondary-sidebar.html';


@WithRender
@Component({
    components: {
        NavMenuList,
    },
})
export default class SecondarySidebar extends BaseVue {


    private actions: UserAction[] = [];


    public mounted() {
        Log.info('Setting up Secondary Sidebar Event Handlers');

        EventBus.$on(Constants.routeUpdateEvent, (data: any) => {
            Log.info('Route Updated: ' + JSON.stringify(data));

            this.setUserActions(data.actions);
        });

        EventBus.$on(Constants.routeClearedEvent, (data: any) => {
            Log.info('Route Cleared.');

            this.clearUserActions();
        });
    }


    private setUserActions(newActions: UserAction[]) {
        this.actions = newActions;
    }


    private execute(action: UserAction) {
        action.executable();
        $('.sb-toggle-right').click();
    }


    private logout() {
        LoginService.doLogout();
    }


    private clearUserActions() {
        this.actions = [];
    }


}


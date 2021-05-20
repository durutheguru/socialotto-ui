import $ from 'jquery';
import { Component } from 'vue-property-decorator';
import BaseVue from '../BaseVue';
import NavMenuList from '@/components/nav-menu-list/NavMenuList';
import { Log, Constants } from '@/components/util';
import { EventBus } from '@/components/core/Event';
import UserAction from '@/components/core/UserAction';

import LoginService from '@/vues/login/service/LoginService';

import Wallet from './components/wallet/Wallet';

import WithRender from './secondary-sidebar.html';


@WithRender
@Component({
    components: {
        Wallet,
    },
})
export default class SecondarySidebar extends BaseVue {


    private visibleSidebar: boolean = true;


    private actions: UserAction[] = [];


    private selectedView: any;


    private views: any[] = [
        {
            name: 'WALLET_VIEW',
        },

        {
            name: 'MESSAGES_VIEW',
        },

        {
            name: 'NOTIF_VIEW',
        },
    ];


    public mounted() {
        if (window.innerWidth < 1201) {
            this.visibleSidebar = false;
        }

        this.setView('WALLET_VIEW');

        this.registerEventListeners();
    }


    private isView(viewName: string) {
        return this.selectedView != null && this.selectedView.name.toUpperCase() === viewName.toUpperCase();
    }


    private setView(viewName: string) {
        let view = this.views.filter(v => v.name.toUpperCase() === viewName.toUpperCase());
        if (!this.isValidArray(view)) {
            Log.info(`No Matching View name`);
            return;
        }

        this.selectedView = view[0];
        this.$forceUpdate();
        Log.info(`Selected View: ${this.selectedView.name}`);
    }


    private registerEventListeners() {
        Log.info('Setting up Secondary Sidebar Event Handlers');

        let self = this;

        EventBus.$on(Constants.routeUpdateEvent, (data: any) => {
            Log.info('Route Updated: ' + JSON.stringify(data));

            self.setUserActions(data.actions);
        });

        EventBus.$on(Constants.routeClearedEvent, (data: any) => {
            Log.info('Route Cleared.');

            self.clearUserActions();
        });

        EventBus.$on(Constants.sidebarToggleEvent, (data: any) => {
            Log.info('Sidebar Toggled.');

            self.visibleSidebar = !self.visibleSidebar;
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth < 1201) {
                self.visibleSidebar = false;
            } else {
                self.visibleSidebar = true;
            }
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


    private hideSidebar() {
        this.visibleSidebar = false;
    }


    private clearUserActions() {
        this.actions = [];
    }


}



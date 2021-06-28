
import WithRender from './notification.html';
import { Component } from 'vue-property-decorator';

import BaseVue from "@/components/BaseVue";


@WithRender
@Component
export default class Notification extends BaseVue {


    public mounted() {
        this.fetchUserNotifications();
    }


    public fetchUserNotifications() {
        this.$store.dispatch('notification/loadNotifications');
    }


    public get notifications() {
        return this.$store.getters['notification/getNotifications'];
    }


}


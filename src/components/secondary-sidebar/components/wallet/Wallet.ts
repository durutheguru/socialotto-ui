
import WithRender from './wallet.html';
import { Component } from 'vue-property-decorator';

import BaseVue from "@/components/BaseVue";
import ApiResource from '@/components/core/ApiResource';


@WithRender
@Component
export default class Wallet extends BaseVue {


    private wallet: ApiResource = ApiResource.create();


    public mounted() {
        this.fetchUserWallet();
        this.fetchWalletActivity();
    }


    private fetchUserWallet() {
        this.$store.dispatch('wallet/fetchWallet');
    }


    public get walletBalance() {
        return this.$store.getters['wallet/getWalletBalance'];
    }


    public fetchWalletActivity() {
        this.$store.dispatch('wallet/activity/loadActivities');
    }


    public get walletActivities() {
        return this.$store.getters['wallet/activity/getActivities'];
    }





}


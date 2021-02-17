import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';

import WithRender from './lottery-home.html';
import { Log, Web } from '@/components/util';


@Component
@WithRender
export default class LotteryHomeComponent extends BaseVue {


    public mounted() {
        this.$store.dispatch('lottery/loadCampaigns');
    }


    public get lotteries() {
        return this.$store.state.lottery.campaigns;
    }


    public showCampaignDetails(campaign: any) {
        Web.navigate(`/lottery/${campaign.id}`);
    }


}


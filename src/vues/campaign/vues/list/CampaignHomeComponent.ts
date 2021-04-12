import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import { Log, Web } from '@/components/util';

import WithRender from './campaign-home.html';

@Component
@WithRender
export default class CampaignHomeComponent extends BaseVue {


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


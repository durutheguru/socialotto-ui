import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import FloatingActionButton from '@/components/floating-action-button/FloatingActionButton';
import CreateCampaignDialog from '@/vues/campaign/dialog/create-campaign/CreateCampaignDialog';

import { Log, Web } from '@/components/util';

import WithRender from './campaign-home.html';

@Component({
    components: {
        // FloatingActionButton,
        CreateCampaignDialog,
    },
})
@WithRender
export default class CampaignHomeComponent extends BaseVue {


    private dialogOpts: any = {
        userDetails: {
            visible: false,
            selectedUser: {},
        },

        createCampaign: {
            visible: false,
        },
    };


    public mounted() {
        this.$store.dispatch('lottery/loadCampaigns');
    }


    public showCreateCampaignDialog() {
        Log.info('Creating Campaign Dialog');
        this.dialogOpts.createCampaign.visible = true;
    }


    public hideCreateCampaignDialog() {
        this.dialogOpts.createCampaign.visible = false;
    }


    public get lotteries() {
        return this.$store.state.lottery.campaigns;
    }


    public showCampaignDetails(campaign: any) {
        Web.navigate(`/lottery/${campaign.id}`);
    }


}



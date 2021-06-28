import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import FloatingActionButton from '@/components/floating-action-button/FloatingActionButton';
import CreateCampaignDialog from '@/vues/campaign/dialog/create-campaign/CreateCampaignDialog';
import store from '@/store';
import { Constants, Log, Web } from '@/components/util';

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
        this.loadCampaigns();
    }


    private loadCampaigns() {
        this.$store.dispatch('campaign/loadCampaigns');
    }


    private fetchOlderCampaigns() {
        this.$store.dispatch('campaign/appendCampaigns');
    }


    public showCreateCampaignDialog() {
        Log.info('Creating Campaign Dialog');
        this.dialogOpts.createCampaign.visible = true;
    }


    public hideCreateCampaignDialog() {
        this.dialogOpts.createCampaign.visible = false;
        this.loadCampaigns();
    }


    public get campaigns() {
        return store.getters['campaign/getCampaigns'];
    }


    public get campaignsLoading() {
        return store.getters['campaign/getCampaignsLoading'];
    }


    public showCampaignDetails(campaign: any) {
        this.$router.push(`/campaign/${campaign.id}`);
    }

    public get canCreateCampaign() {
        return this.$store.getters['authToken/isAuthorized'](
            Constants.AUTHORITIES.CAN_CREATE_CAMPAIGN,
        );
    }


}



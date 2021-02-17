import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import { Log } from '@/components/util';

import CampaignService from '@/vues/backoffice/vues/campaign/service/CampaignService';
import UserCampaignRegistrationDialog from './dialog/UserCampaignRegistrationDialog';

import WithRender from './lottery-detail.html';



@WithRender
@Component({
    components: {
        UserCampaignRegistrationDialog,
    }
})
export default class LotteryDetailComponent extends BaseVue {


    private dialogOpts: any = {

        userCampaignRegistration: {
            visible: false,
        },

    };


    public mounted() {
        Log.info(`Lottery Details ID: ${this.$route.params.id}`);
        this.$store.dispatch('lottery/loadCampaignDetails', this.$route.params.id);
    }


    public get selectedCampaign() {
        return this.$store.state.lottery.selectedCampaign.data;
    }


    private getApprovalClass(status: string) {
        return CampaignService.getCampaignStatusClass(status);
    }


    private showUserRegistrationDialog() {
        this.dialogOpts.userCampaignRegistration.visible = true;
    }


    private hideUserRegistrationDialog() {
        this.dialogOpts.userCampaignRegistration.visible = false;
    }


}




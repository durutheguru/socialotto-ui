
import { Component, Prop } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import Modal from '@/components/modal/Modal';

import LotteryUserCampaignService from '../service/LotteryUserCampaignService';

import WithRender from './user-campaign-registration-dialog.html';
import { Constants, Util } from '@/components/util';


@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class UserCampaignRegistrationDialog extends BaseVue {


    @Prop({default: false})
    private visible!: boolean;

    @Prop()
    private campaign: any;

    private errorMsg: string = '';

    private loading: boolean = false;



    public register() {
        this.errorMsg = '';
        this.loading = true;

        LotteryUserCampaignService.registerUserCampaign(
            this.campaign.id,

            (response: any) => {
                this.loading = false;
                this.close();
            },

            (error: any) => {
                this.loading = false;
                this.errorMsg = Util.extractError(error);
            },
        );
    }
    

    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


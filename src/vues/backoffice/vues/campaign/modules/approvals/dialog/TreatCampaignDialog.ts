import WithRender from './treat-campaign-dialog.html';

import { Component, Prop } from 'vue-property-decorator';

import Modal from '@/components/modal/Modal';
import BaseVue from '@/components/BaseVue';
import { Constants, Log, Util } from '@/components/util';
import CampaignService from '../../../service/CampaignService';



@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class TreatCampaignDialog extends BaseVue {


    @Prop({default: false})
    private visible!: boolean;


    @Prop()
    private campaign!: any;


    private error: string = '';


    private loading: boolean = false;


    private approval!: any;


    public mounted() {
        this.approval = {
            campaignId: this.campaign.id,
            approvalAction: '',
        };
    }


    public treatCampaign() {
        Log.info(`Treating Campaign Approval: ${JSON.stringify(this.approval)}`);

        this.loading = true;

        CampaignService.treatCampaignApproval(
            this.approval,

            (response) => {
                this.loading = false;
                this.close();
            },

            (error) => {
                this.loading = false;
                this.error = Util.extractError(error);
            }
        );
    }


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}





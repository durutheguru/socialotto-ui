
import WithRender from './create-campaign-dialog.html';
import { Component, Prop } from 'vue-property-decorator';

import Modal from '@/components/modal/Modal';
import BaseVue from '@/components/BaseVue';
import { Log, Constants, Util } from '@/components/util';
import WizardPageToggle from '@/components/modal/wizard/WizardPageToggle';
import StageDescription from '@/vues/backoffice/vues/campaign/model/StageDescription';
import ApiResource from '@/components/core/ApiResource';



@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class CreateCampaignDialog extends BaseVue {


    @Prop({default: false})
    private visible!: boolean;


    private saveCampaign!: ApiResource;


    private campaign!: any;


    private formWizard: WizardPageToggle = new WizardPageToggle(
        'BASIC_DETAILS',
        'UPLOAD_IMAGES',
        'CONFIRMATION',
    );


    public mounted() {
        this.saveCampaign = ApiResource.create();

        this.campaign = {
            name: '',
            description: '',
            campaignImages: []
        };
    }


    private addStage() {
        Log.info('Adding New Stage');
        this.campaign.stageDescriptions.push(
            StageDescription.defaultStage(Util.uuid())
        );
        this.$forceUpdate();

        Log.info(`Stage Count: ${this.campaign.stageDescriptions.length}`);
    }


    private deleteStage(index: number) {
        this.campaign.stageDescriptions = this.campaign.stageDescriptions.filter((s: any, i: number) => {
            return i !== index;
        });
        this.$forceUpdate();
    }


    private canDeleteStage(index: number): boolean {
        return (this.campaign.stageDescriptions.length > 1) && 
            (index === this.campaign.stageDescriptions.length - 1);
    }


    private createCampaign() {
        Log.info(`Campaign Data Post: ${JSON.stringify(this.campaign)}`);
        const campaignRequest = this.prepareCampaignRequest();
        this.validateCampaignRequest(campaignRequest);

        this.saveCampaign.error = '';
        this.saveCampaign.loading = true;

        // CampaignService.saveCampaign(
        //     campaignRequest,

        //     (response) => {
        //         this.saveCampaign.loading = false;
        //         this.close();
        //     },

        //     (error) => {
        //         this.saveCampaign.loading = false;
        //         this.saveCampaign.error = Util.extractError(error);
        //     }
        // );
    }


    private prepareCampaignRequest(): any {
        const request = this.campaign;

        request.stageDescriptions.forEach(
            (stage: StageDescription) => {
                stage.evaluationTime = stage.evaluationTime.replace('T', ' ');
            }
        );

        Log.info(`Campaign Data Post Request: ${JSON.stringify(request)}`);

        return request;
    }


    private validateCampaignRequest(campaignRequest: any) {
        // implement client-side validation of Campaign request
    }


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


import { Component, Prop } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import Modal from '@/components/modal/Modal';

import WithRender from './create-campaign-dialog.html';
import { Constants, Util, Log } from '@/components/util';
import CampaignService from '../../service/CampaignService';
import PartnerService from '../../../partner/service/PartnerService';
import ApiResourceList from '@/components/core/ApiResourceList';
import WizardPageToggle from '@/components/modal/wizard/WizardPageToggle';
import StageDescription from '../../model/StageDescription';
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


    private saveCampaign: ApiResource = ApiResource.create();


    private campaign: any = {
        name: '',
        description: '',
        campaignImages: [],
        partnerId: '',
        startDate: '',
        endDate: '',
        stageDescriptions: [
            StageDescription.defaultStage()
        ],
        campaignType: ''
    };


    private partners: ApiResourceList = ApiResourceList.createDefault();


    private formWizard: WizardPageToggle = new WizardPageToggle(
        'BASIC_DETAILS',
        'MORE_DETAILS',
        'STAGES',
        'UPLOAD_IMAGES',
        'CONFIRMATION',
    );


    public mounted() {
        this.loadPartners();
    }


    private loadPartners() {
        this.partners.loading = true;

        PartnerService.getAllPartnersMinified(
            (response) => {
                this.partners.loading = false;
                this.partners.data = response.data._embedded.partners;
            },

            (error) => {
                this.partners.loading = false;
                this.partners.error = Util.extractError(error);
            }
        );
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

        CampaignService.saveCampaign(
            campaignRequest,

            (response) => {
                this.saveCampaign.loading = false;
                this.close();
            },

            (error) => {
                this.saveCampaign.loading = false;
                this.saveCampaign.error = Util.extractError(error);
            }
        );
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
        // implement client-side validation of campaign request
    }


    private close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


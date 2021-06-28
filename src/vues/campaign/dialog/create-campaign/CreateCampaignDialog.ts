
import WithRender from './create-campaign-dialog.html';
import { Component, Prop } from 'vue-property-decorator';

import Modal from '@/components/modal/Modal';
import BaseVue from '@/components/BaseVue';
import { Log, Constants, Util } from '@/components/util';
import WizardPageToggle from '@/components/modal/wizard/WizardPageToggle';
import StageDescription from '@/vues/backoffice/vues/campaign/model/StageDescription';
import ApiResource from '@/components/core/ApiResource';
import FileUploader from '@/components/file-uploader/FileUploader';
import { EventBus } from '@/components/core/Event';
import CampaignService from '@/services/campaign/CampaignService';



@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class CreateCampaignDialog extends BaseVue {


    @Prop({default: false})
    private visible!: boolean;

    private campaign!: any;

    private fileUploader!: FileUploader;

    private formWizard: WizardPageToggle = new WizardPageToggle(
        'BASIC_DETAILS',
        'UPLOAD_IMAGES',
        'CONFIRMATION',
    );

    private saveCampaign: ApiResource = ApiResource.create();



    public mounted() {
        this.campaign = {
            name: '',
            description: '',
        };

        this.fileUploader = new FileUploader(
            '/upload', 3
        );

        this.addEventListeners();
    }


    private addEventListeners() {
        let self = this;

        EventBus.$on(
            Constants.fileUploadEvent,

            (data: any) => {
                self.$forceUpdate();
            },
        );
    }


    private get canDisplayTitle(): boolean {
        return !(this.isValidString(this.saveCampaign.error) || this.saveCampaign.loading);
    }


    public fileChanged(event: any) {
        this.fileUploader.fileChange(event);
        this.$forceUpdate();
    }


    private createCampaign() {
        let self = this;

        Log.info(`Campaign Data Post: ${JSON.stringify(this.campaign)}`);
        const campaignRequest = this.prepareCampaignRequest();
        
        if (!self.validateCampaignRequest(campaignRequest)) {
            return;
        }

        self.saveCampaign.error = '';
        self.saveCampaign.loading = true;

        CampaignService.saveCampaign(
            campaignRequest,

            (response) => {
                self.saveCampaign.loading = false;
                self.close();
            },

            (error) => {
                self.saveCampaign.loading = false;
                self.saveCampaign.error = Util.extractError(error);
            },
        );
    }


    private prepareCampaignRequest() {
        let request = {
            campaign: {
                name: this.campaign.name, 
                description: this.campaign.description,
            },
            
            fileRefs: this.fileUploader.uploads.map((val) => val.getReference()),
        };

        Log.info(`Campaign Request: ${request}`);

        return request;
    }


    private validateCampaignRequest(campaignRequest: any): boolean {
        // implement client-side validation of Campaign request

        if (!campaignRequest.fileRefs.length) {
            this.saveCampaign.error = 'File Upload is required';
            return false;
        }

        return true;
    }


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


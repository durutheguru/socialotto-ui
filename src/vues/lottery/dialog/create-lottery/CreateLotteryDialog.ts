
import WithRender from './create-lottery-dialog.html';
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
import ApiResourceList from '@/components/core/ApiResourceList';
import PageRequest from '@/components/core/PageRequest';



@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class CreateLotteryDialog extends BaseVue {


    @Prop({ default: false })
    private visible!: boolean;

    private formWizard: WizardPageToggle = new WizardPageToggle(
        'BASIC_DETAILS',
        'MORE_DETAILS',
        'UPLOAD_IMAGES',
        'SELECT_CAMPAIGNS',
        'CONFIRMATION',
    );

    private searchEvent: string = 'campaign-search-event';

    private saveLottery: ApiResource = ApiResource.create();

    private lottery!: any;

    private fileUploader!: FileUploader;

    private searchCampaigns: ApiResourceList = ApiResourceList.createDefault();



    public mounted() {
        let self = this;

        self.lottery = {
            name: '',
            description: '',
            lotteryImages: [],
            endDate: '',
            ticketCost: '',
            timeOfEvaluation: '',
            winnersCount: '',
            campaignSearch: '',
            dateOfEvaluation: '',
            stageDescriptions: [
                StageDescription.defaultStage()
            ]
        };

        self.fileUploader = new FileUploader(
            '/upload', 3
        );

        self.addEventListeners();
    }


    private addEventListeners() {
        let self = this;

        EventBus.$on(
            Constants.fileUploadEvent,

            (data: any) => {
                self.$forceUpdate();
            },
        );

        EventBus.$on(
            self.searchEvent,

            (data: any) => {
                self.searchActiveCampaigns();
            },
        );
    }


    private addStage() {
        Log.info('Adding New Stage');
        this.lottery.stageDescriptions.push(
            StageDescription.defaultStage(Util.uuid())
        );
        this.$forceUpdate();

        Log.info(`Stage Count: ${this.lottery.stageDescriptions.length}`);
    }


    private deleteStage(index: number) {
        this.lottery.stageDescriptions = this.lottery.stageDescriptions.filter((s: any, i: number) => {
            return i !== index;
        });
        this.$forceUpdate();
    }


    private canDeleteStage(index: number): boolean {
        return (this.lottery.stageDescriptions.length > 1) &&
            (index === this.lottery.stageDescriptions.length - 1);
    }


    private createLottery() {
        Log.info(`Lottery Data Post: ${JSON.stringify(this.lottery)}`);
        const lotteryRequest = this.prepareLotteryRequest();

        if (!this.validateLotteryRequest(lotteryRequest)) {
            return;
        }

        this.saveLottery.error = '';
        this.saveLottery.loading = true;

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


    private prepareLotteryRequest(): any {
        const request = this.lottery;

        request.stageDescriptions.forEach(
            (stage: StageDescription) => {
                stage.evaluationTime = stage.evaluationTime.replace('T', ' ');
            }
        );

        Log.info(`Lottery Data Post Request: ${JSON.stringify(request)}`);

        return request;
    }


    private validateLotteryRequest(lotteryRequest: any): boolean {
        // implement client-side validation of lottery request
        if (lotteryRequest.dateOfEvaluation <= lotteryRequest.endDate) {
            this.saveLottery.error = 'Date of Lottery must come after End of Registration';
            return false;
        }

        return true;
    }


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


    private get canDisplayTitle(): boolean {
        return !(this.isValidString(this.saveLottery.error) || this.saveLottery.loading);
    }


    private get hasImages(): boolean {
        Log.info(`Has Images: ${this.lottery.lotteryImages.length > 0}`);
        return this.lottery.lotteryImages.length > 0;
    }


    public fileChanged(event: any) {
        this.fileUploader.fileChange(event);
        this.$forceUpdate();
    }


    public searchActiveCampaigns() {
        this.searchCampaigns.data = [];

        if (!this.isValidString(this.lottery.campaignSearch)) {
            return;
        }

        let self = this;

        self.searchCampaigns.error = '';
        self.searchCampaigns.loading = true;

        Util.throttle(
            {
                key: "lottery-campaigns-search",

                run: () => {

                    CampaignService.searchActiveCampaign(
                        self.lottery.campaignSearch, 
            
                        new PageRequest(0, 4), 
            
                        (response) => {
                            self.searchCampaigns.data = response.data.content;
                        },
                    );
                },

                time: 500,
            }
        );
        
    }


    public lotteryStages = Constants.lotteryStages;


}


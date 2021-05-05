
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
import LotteryService from '@/services/lottery/LotteryService';
import CampaignService from '@/services/campaign/CampaignService';
import ApiResourceList from '@/components/core/ApiResourceList';
import PageRequest from '@/components/core/PageRequest';
import { LocalDate, LocalDateTime, LocalTime, ZonedDateTime, ZoneId } from '@js-joda/core';



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

    private lottery!: any;

    private fileUploader!: FileUploader;

    private searchCampaigns: ApiResourceList = ApiResourceList.createDefault();

    private saveLottery: ApiResource = ApiResource.create();



    public mounted() {
        let self = this;

        self.lottery = {
            name: '',
            description: '',
            lotteryImages: [],
            endDate: '',
            ticketCost: '',
            dateOfEvaluation: '',
            timeOfEvaluation: '',
            winnersCount: '',
            campaignSearch: '',
            stageDescriptions: [
                StageDescription.defaultStage(),
            ],
            selectedCampaigns: [],
            minRegistrationEndDate: LocalDate.now().plusDays(1),
            maxRegistrationEndDate: LocalDate.now().plusDays(14),
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
        let self = this;

        Log.info(`Lottery Data Post: ${JSON.stringify(self.lottery)}`);
        const lotteryRequest = this.prepareLotteryRequest();

        if (!this.validateLotteryRequest(lotteryRequest)) {
            return;
        }

        self.saveLottery.error = '';
        self.saveLottery.loading = true;

        LotteryService.createLottery(
            lotteryRequest, 

            (response: any) => {
                self.saveLottery.loading = false;
                self.close();
            },

            (error: any) => {
                self.saveLottery.loading = false;
                self.saveLottery.error = self.extractError(error);
                Log.error(`Error while creating Lottery: ${error}`);
            }
        );
    }


    private prepareLotteryRequest(): any {
        let self = this;

        this.lottery.stageDescriptions.forEach(
            (stage: StageDescription) => {
                stage.evaluationTime = stage.evaluationTime.replace('T', ' ');
            }
        );

        let lotteryStageDescription = this.lottery.stageDescriptions[0];

        let request = {
            lottery: {
                name: this.lottery.name, 
                description: this.lottery.description,
                endDate: this.lottery.endDate,
                ticketCost: this.lottery.ticketCost,
                stageDescriptions: [
                    {
                        stage: lotteryStageDescription.stage,
                        winnersCount: lotteryStageDescription.winnersCount,
                        evaluationTime: ZonedDateTime.of(
                            LocalDateTime.of(
                                LocalDate.parse(this.lottery.dateOfEvaluation),
                                LocalTime.parse(this.lottery.timeOfEvaluation)
                            ),
                
                            ZoneId.systemDefault(),
                        ).withFixedOffsetZone().toString(),
                    },
                ], 
            },
            fileRefs: this.fileUploader.uploads.map((val) => val.getReference()),
            beneficiaries: this.lottery.selectedCampaigns.map(
                (val: any) => {
                    return {
                        wallet: val.wallet
                    };
                },
            ),
        };

        Log.info(`Lottery: ${JSON.stringify(this.lottery)}`);
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


    private clearCampaignSearch() {
        this.lottery.campaignSearch = '';
        this.searchCampaigns.clear();
    }


    public addSelectedCampaign(campaign: any) {
        if (!this.canAddCampaign(campaign)) {
            Log.info(`Campaign ID ${campaign.id} already added`);
        } else {
            this.lottery.selectedCampaigns.push(campaign);
        }

        this.clearCampaignSearch();
    }


    private canAddCampaign(campaign: any) {
        return this.lottery.selectedCampaigns.length < 3 && 
            this.lottery.selectedCampaigns
            .filter((val: any) => val.id === campaign.id).length === 0;
    }


    public removeSelectedCampaign(campaign: any) {
        this.lottery.selectedCampaigns = this.lottery.selectedCampaigns
            .filter((val: any) => val.id !== campaign.id);
        
        this.$forceUpdate();
    }


    public lotteryStages = Constants.lotteryStages;


}


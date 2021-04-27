
import WithRender from './create-lottery-dialog.html';
import { Component, Prop } from 'vue-property-decorator';

import Modal from '@/components/modal/Modal';
import BaseVue from '@/components/BaseVue';
import { Log, Constants, Util } from '@/components/util';
import BackOfficeUserService from '@/vues/backoffice/vues/users/backoffice-users/service/BackOfficeUserService';
import WizardPageToggle from '@/components/modal/wizard/WizardPageToggle';
import StageDescription from '@/vues/backoffice/vues/campaign/model/StageDescription';
import ApiResource from '@/components/core/ApiResource';



@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class CreateLotteryDialog extends BaseVue {


    @Prop({default: false})
    private visible!: boolean;


    private saveLottery: ApiResource = ApiResource.create();


    private lottery!: any;


    private formWizard: WizardPageToggle = new WizardPageToggle(
        'BASIC_DETAILS',
        'MORE_DETAILS',
        'UPLOAD_IMAGES',
        'SELECT_CAMPAIGNS',
        'CONFIRMATION',
    );


    public mounted() {
        this.lottery = {
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


    public lotteryStages = Constants.lotteryStages;


}


import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import { Log } from '@/components/util';

import CampaignService from '@/services/campaign/CampaignService';
import JoinLotteryDialog from './dialog/join-lottery/JoinLotteryDialog';

import WithRender from './lottery-detail.html';
import LotteryService from '@/services/lottery/LotteryService';
import ApiResource from '@/components/core/ApiResource';

import File from '@/components/file/File';


@WithRender
@Component({
    components: {
        File,
        JoinLotteryDialog,
    },
})
export default class LotteryDetailComponent extends BaseVue {


    private dialogOpts: any = {

        joinLottery: {
            visible: false,
        },

    };

    private lottery: ApiResource = ApiResource.create();


    public mounted() {
        Log.info(`Lottery Details ID: ${this.$route.params.id}`);

        this.getDetails();
    }


    private getDetails() {
        let self = this;
        self.lottery.error = '';
        self.lottery.loading = true;

        LotteryService.getLotteryDetails(
            self.$route.params.id,

            (response: any) => {
                self.lottery.loading = false;
                self.lottery.data = response.data;
            },

            (error: any) => {
                self.lottery.loading = false;
                self.lottery.error = self.extractError(error);
                Log.error(self.lottery.error);
                self.$router.push('/lottery');
            }
        );
    }


    private getApprovalClass(status: string) {
        return CampaignService.getCampaignStatusClass(status);
    }


    private showJoinLotteryDialog() {
        this.dialogOpts.joinLottery.visible = true;
    }


    private hideJoinLotteryDialog() {
        this.dialogOpts.joinLottery.visible = false;
        this.getDetails();
    }


}




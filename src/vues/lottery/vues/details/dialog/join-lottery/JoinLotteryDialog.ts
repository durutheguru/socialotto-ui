
import WithRender from './join-lottery-dialog.html';

import { Component, Prop } from 'vue-property-decorator';


import Modal from '@/components/modal/Modal';
import BaseVue from '@/components/BaseVue';

import { Log, Constants, Util } from '@/components/util';
import ApiResource from '@/components/core/ApiResource';
import LotteryService from '@/services/lottery/LotteryService';



@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class JoinLotteryDialog extends BaseVue {


    @Prop()
    private lotteryId!: number;


    @Prop()
    private ticketCost!: number;


    @Prop({default: false})
    private visible!: boolean;


    private enterLottery: ApiResource = ApiResource.create();


    private lotteryEntry: any = {
        lotteryId: null,
        entries: 0
    };


    public mounted() {
        this.lotteryEntry = {
            lotteryId: this.lotteryId,
            entries: 1,
        };
    }


    public get totalPayment() {
        Log.info(`Ticket Cost: ${this.ticketCost}, Entries: ${this.lotteryEntry.entries}`);
        return Util.currencyFormat(
            this.ticketCost * this.lotteryEntry.entries
        );
    }


    public joinLottery() {
        let self = this;
        self.enterLottery.error = '';
        self.enterLottery.loading = true;

        LotteryService.joinLottery(
            self.lotteryEntry,

            (response: any) => {
                self.enterLottery.loading = false;
                self.close();
            },

            (error: any) => {
                self.enterLottery.loading = false;
                self.enterLottery.error = self.extractError(error);
            }
        );
    }



    private get canDisplayTitle(): boolean {
        return !(this.isValidString(this.enterLottery.error) || this.enterLottery.loading);
    }


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}




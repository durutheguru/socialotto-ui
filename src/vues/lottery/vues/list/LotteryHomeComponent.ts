import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import CreateLotteryDialog from '../../dialog/create-lottery/CreateLotteryDialog';
import FloatingActionButton from '@/components/floating-action-button/FloatingActionButton';


import WithRender from './lottery-home.html';
import { Log, Web } from '@/components/util';


@Component({
    components: {
        CreateLotteryDialog,
    },
})
@WithRender
export default class LotteryHomeComponent extends BaseVue {



    private dialogOpts: any = {

        createLottery: {
            visible: false,
        },

    };



    public mounted() {
        this.$store.dispatch('lottery/loadCampaigns');
    }


    public showCreateLottery() {
        Log.info('Creating BackOffice User');
        this.dialogOpts.createLottery.visible = true;
    }


    public hideCreateLottery() {
        this.dialogOpts.createLottery.visible = false;
    }


    public get lotteries() {
        return this.$store.state.lottery.campaigns;
    }


    public viewLotteryDetails(id: number) {
        Web.navigate(`/lottery/${id}`);
    }


}


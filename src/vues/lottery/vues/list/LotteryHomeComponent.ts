import WithRender from './lottery-home.html';

import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import CreateLotteryDialog from '../../dialog/create-lottery/CreateLotteryDialog';
import FloatingActionButton from '@/components/floating-action-button/FloatingActionButton';
import store from '@/store';

import { Constants, Log, Web } from '@/components/util';
import { EventBus } from '@/components/core/Event';


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
        let self = this;

        EventBus.$on(
            Constants.newStoreDataEvent, 

            () => {
                self.$forceUpdate();
            }
        );

        this.$store.dispatch('lottery/loadLotteries');
    }


    public showCreateLottery() {
        Log.info('Creating BackOffice User');
        this.dialogOpts.createLottery.visible = true;
    }


    public hideCreateLottery() {
        this.dialogOpts.createLottery.visible = false;
    }


    public get lotteries() {
        return store.getters['lottery/getLotteries'];
    }


    public viewLotteryDetails(id: number) {
        Web.navigate(`/lottery/${id}`);
    }


}


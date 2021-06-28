import WithRender from './lottery-home.html';

import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import CreateLotteryDialog from '../../dialog/create-lottery/CreateLotteryDialog';
import FloatingActionButton from '@/components/floating-action-button/FloatingActionButton';
import store from '@/store';

import { Constants, Log, Util, Web } from '@/components/util';
import { EventBus } from '@/components/core/Event';


@Component({
    components: {
        CreateLotteryDialog,
    },
})
@WithRender
export default class LotteryHomeComponent extends BaseVue {


    private scrolledToBottom: boolean = false;


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
                self.scrolledToBottom = false;
            }
        );

        //#region to review and fix infinite scrolling logic
        // window.addEventListener('wheel', () => {
        //     Log.info('Window Scrolling...');

            
            // Util.throttle({
            //     key: 'lottery-infini-scroll-handle',
            //     run: () => {
            //         let mmax = Math.max(
            //             window.pageYOffset,
            //             document.documentElement.scrollTop,
            //             document.body.scrollTop,
            //             $('#main-route-section').scrollTop() || 0
            //         );
            //         let innerHeight = window.innerHeight;
            //         let offset = document.documentElement.offsetHeight;

            //         Log.info(`MMAX: ${mmax}, INNERH: ${innerHeight}, OFFSET: ${offset}`);

            //         let bottomOfWindow = mmax + innerHeight === offset;
        
            //         if (bottomOfWindow) {
            //             Log.info('At Bottom of Window');
        
            //             if (!self.scrolledToBottom) {
            //                 self.scrolledToBottom = true;
            //                 self.$store.dispatch('lottery/appendLotteries');
            //             }
            //         } else {
            //             Log.info('Not at Bottom of Window');
            //         }
            //     },
            //     time: 300,
            // });
            
        // });
        //#endregion

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


    public get lotteriesLoading() {
        return store.getters['lottery/getLotteriesLoading'];
    }


    public fetchNewerLotteries() {
        this.$store.dispatch('lottery/prependLotteries');
    }


    public fetchOlderLotteries() {
        this.$store.dispatch('lottery/appendLotteries');
    }


    public viewLotteryDetails(id: number) {
        this.$router.push(`/lottery/${id}`);
    }


    public get canCreateLottery() {
        return this.$store.getters['authToken/isAuthorized'](
            Constants.AUTHORITIES.CAN_CREATE_LOTTERY,
        );
    }


}




import WithRender from './join-lottery-dialog.html';

import { Component, Prop } from 'vue-property-decorator';


import Modal from '@/components/modal/Modal';
import BaseVue from '@/components/BaseVue';

import { Log, Constants, Util } from '@/components/util';
import ApiResource from '@/components/core/ApiResource';



@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class JoinLotteryDialog extends BaseVue {


    @Prop({default: false})
    private visible!: boolean;


    private enterLottery: ApiResource = ApiResource.create();


    private lotteryEntry: any = {
        lotteryId: null,
        entries: 1,
    };


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}





import { Component, Prop } from 'vue-property-decorator';

import Modal from '@/components/modal/Modal';
import BaseVue from '@/components/BaseVue';
import BasicUserDetails from '@/vues/backoffice/components/user-details/BasicUserDetails';
import { Log, Constants } from '@/components/util';

import WithRender from './back-office-user-details-dialog.html';


@WithRender
@Component({
    components: {
        Modal,
        BasicUserDetails,
    },
})
export default class BackOfficeUserDetailsDialog extends BaseVue {


    @Prop({default: false})
    private visible!: boolean;

    @Prop()
    private user: any;


    public mounted() {
        Log.info('Showing User Details: ' + JSON.stringify(this.user));
    }

    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


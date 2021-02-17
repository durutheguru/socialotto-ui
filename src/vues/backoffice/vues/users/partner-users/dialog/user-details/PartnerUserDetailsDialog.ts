
import { Component, Prop } from 'vue-property-decorator';
import BaseVue from '@/components/BaseVue';
import Modal from '@/components/modal/Modal';
import { Constants } from '@/components/util';
import BasicUserDetails from '@/vues/backoffice/components/user-details/BasicUserDetails';

import WithRender from './partner-user-details-dialog.html';



@WithRender
@Component({
    components: {
        Modal,
        BasicUserDetails,
    },
})
export default class PartnerUserDetailsDialog extends BaseVue {

    @Prop({default: false})
    private visible!: boolean;

    @Prop()
    private user: any;


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}




import { Component, Prop } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import Modal from '@/components/modal/Modal';

import WithRender from './create-partner-dialog.html';
import { Constants } from '@/components/util';
import PartnerService from '../../service/PartnerService';


@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class CreatePartnerDialog extends BaseVue {

    @Prop({default: false})
    private visible!: boolean;


    private error: string = '';


    private loading: boolean = false;


    private partner!: any;


    public mounted() {
        this.partner = {
            name: '',
            description: '',
            website: '',
        };
    }


    public createPartner() {
        this.error = '';
        this.loading = true;

        PartnerService.savePartner(
            this.partner, 

            (response: any) => {
                this.close();
            },

            (error: any) => {
                this.loading = false;
                this.error = this.extractError(error);
            }
        );
    }


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


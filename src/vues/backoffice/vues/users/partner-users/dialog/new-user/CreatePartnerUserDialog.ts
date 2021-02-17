
import { Component, Prop } from 'vue-property-decorator';
import BaseVue from '@/components/BaseVue';
import Modal from '@/components/modal/Modal';

import UserValidatorService from '../../../service/UserValidatorService';
import PartnerUserService from '@/vues/backoffice/vues/users/partner-users/service/PartnerUserService';
import { Constants } from '@/components/util';

import PartnerService from '@/vues/backoffice/vues/partner/service/PartnerService';
import WithRender from './create-partner-user-dialog.html';


@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class CreatePartnerUserDialog extends BaseVue {

    @Prop({default: false})
    private visible!: boolean;


    private error: string = '';


    private loading: boolean = false;


    private partners: any = {
        error: '',
        loading: false,
        list: [],
    };

    
    private user!: any;


    public mounted() {
        this.user = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        };

        this.loadPartners();
    }


    public loadPartners() {
        this.partners.loading = true;

        PartnerService.getAllPartners(
            (response: any) => {
                this.partners.loading = false;
                this.partners.list = response.data._embedded.partners;
            },

            (error: any) => {
                this.partners.loading = false;
            }
        );
    }


    public createUser() {
        this.error = '';

        if (!this.validUserModel()) {
            return;
        }

        this.loading = true;

        PartnerUserService.createPartnerUser(
            this.user,

            (response: any) => {
                this.close();
            },

            (error: any) => {
                this.loading = false;
                this.error = this.extractError(error);
            }
        );
    }


    public validUserModel() {
        return UserValidatorService.validate(this.user, this);
    }


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


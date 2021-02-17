
import WithRender from './create-back-office-user-dialog.html';
import { Component, Prop } from 'vue-property-decorator';

import Modal from '@/components/modal/Modal';
import BaseVue from '@/components/BaseVue';
import { Log, Constants } from '@/components/util';
import BackOfficeUserService from '@/vues/backoffice/vues/users/backoffice-users/service/BackOfficeUserService';



@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class CreateBackOfficeUserDialog extends BaseVue {


    @Prop({default: false})
    private visible!: boolean;


    private error: string = '';


    private loading: boolean = false;


    private user!: any;


    public mounted() {
        this.user = {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        };
    }


    public createUser() {
        this.error = '';

        if (!this.validUserModel()) {
            return;
        }

        this.loading = true;

        BackOfficeUserService.createBackOfficeUser(
            this.user,

            (response: any) => {
                this.close();
            },

            (error: any) => {
                Log.error('Error occurred: ' + JSON.stringify(error));
                this.loading = false;
                this.error = this.extractError(error);
            }
        );
    }


    public validUserModel() {
        if (this.user.password !== this.user.confirmPassword) {
            this.error = 'Please confirm password';
            return false;
        }

        return true;
    }


    public close() {
        this.$emit(Constants.dialogClosedEvent);
    }


}


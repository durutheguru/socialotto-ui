
import { Component, Prop } from 'vue-property-decorator';
import BaseVue from '@/components/BaseVue';
import Modal from '@/components/modal/Modal';

import WithRender from './create-lottery-user-dialog.html';
import UserValidatorService from '../../../service/UserValidatorService';
import LotteryUserService from '@/vues/backoffice/vues/users/lottery-users/service/LotteryUserService';
import { Constants } from '@/components/util';


@WithRender
@Component({
    components: {
        Modal,
    },
})
export default class CreateLotteryUserDialog extends BaseVue {

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

        LotteryUserService.createLotteryUser(
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



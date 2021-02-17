
import WithRender from './user-table.html';

import { Component, Prop } from 'vue-property-decorator';
import BaseVue from '@/components/BaseVue';
import PageDataModel from '@/components/core/PageDataModel';


@WithRender
@Component
export default class UserTable extends BaseVue {


    @Prop()
    private users!: PageDataModel;


    public showUserDetails(user: any) {
        this.$emit('user-details', user);
    }


}




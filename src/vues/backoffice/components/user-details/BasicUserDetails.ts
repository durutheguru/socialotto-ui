
import { Component, Prop } from 'vue-property-decorator';
import BaseVue from '@/components/BaseVue';

import WithRender from './basic-user-details.html';



@WithRender
@Component
export default class BasicUserDetails extends BaseVue {


    @Prop()
    private user!: any;


}


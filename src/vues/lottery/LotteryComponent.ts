import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import HeaderComponent from '@/components/header/Header';
import SecondarySidebar from '@/components/secondary-sidebar/SecondarySidebar';

import WithRender from './lottery.html';


@WithRender
@Component({
    components: {
        HeaderComponent,
        SecondarySidebar,
    },
})
export default class LotteryComponent extends BaseVue {

    
    


}



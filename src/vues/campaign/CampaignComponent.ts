import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import SecondarySidebar from '@/components/secondary-sidebar/SecondarySidebar';

import WithRender from './campaign.html';


@WithRender
@Component({
    components: {
        SecondarySidebar,
    },
})
export default class CampaignComponent extends BaseVue {

    
    


}



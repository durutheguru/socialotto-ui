import { Component } from 'vue-property-decorator';

import BaseVue from '../../components/BaseVue';
import SideMenu from '@/components/side-menu/SideMenu';
import SecondarySidebar from '@/components/secondary-sidebar/SecondarySidebar';

import WithRender from './back-office-home.html';


@WithRender
@Component({
    components: {
        SideMenu,
        SecondarySidebar,
    },
})
export default class BackOfficeHome extends BaseVue {


}

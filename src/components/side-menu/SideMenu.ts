import { Component } from 'vue-property-decorator';
import BaseVue from '@/components/BaseVue';
import NavMenuList from '@/components/nav-menu-list/NavMenuList';

import WithRender from './side-menu.html';



@WithRender
@Component({
    components: {
        NavMenuList,
    },
})
export default class SideMenu extends BaseVue {



}


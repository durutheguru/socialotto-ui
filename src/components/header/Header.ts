import { Component } from "vue-property-decorator";
import BaseVue from "../BaseVue";
import { EventBus } from "../core/Event";
import { Constants } from "../util";

import WithRender from './header.html'; 


@WithRender
@Component
export default class Header extends BaseVue {


    public toggleSidebar() {
        EventBus.$emit(Constants.sidebarToggleEvent);
    }


}

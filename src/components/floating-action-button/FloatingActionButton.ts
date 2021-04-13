import { Component } from "vue-property-decorator";
import BaseVue from "../BaseVue";
import { Log } from "../util";
// import CreateBackOfficeUserDialog from 
// "@/vues/backoffice/vues/users/backoffice-users/dialog/new-user/CreateBackOfficeUserDialog";


import WithRender from './floating-action.html';


@Component({
    components: {
        // CreateBackOfficeUserDialog,
    },
})
@WithRender
export default class FloatingActionButton extends BaseVue {


    private dialogOpts: any = {
        userDetails: {
            visible: false,
            selectedUser: {},
        },

        createUser: {
            visible: false,
        },
    };


    public showCreateBackOfficeUser() {
        Log.info('Creating BackOffice User');
        this.dialogOpts.createUser.visible = true;
    }


    public hideCreateBackOfficeUser() {
        this.dialogOpts.createUser.visible = false;
        
    }




}



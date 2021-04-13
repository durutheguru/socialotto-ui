import { Component } from 'vue-property-decorator';

import BaseVue from '@/components/BaseVue';
import FloatingActionButton from '@/components/floating-action-button/FloatingActionButton';
import CreateBackOfficeUserDialog from '@/vues/backoffice/vues/users/backoffice-users/dialog/new-user/CreateBackOfficeUserDialog';

import { Log, Web } from '@/components/util';

import WithRender from './campaign-home.html';

@Component({
    components: {
        // FloatingActionButton,
        CreateBackOfficeUserDialog,
    },
})
@WithRender
export default class CampaignHomeComponent extends BaseVue {


    private dialogOpts: any = {
        userDetails: {
            visible: false,
            selectedUser: {},
        },

        createUser: {
            visible: false,
        },
    };



    public mounted() {
        this.$store.dispatch('lottery/loadCampaigns');
    }


    public showCreateBackOfficeUser() {
        Log.info('Creating BackOffice User');
        this.dialogOpts.createUser.visible = true;
    }


    public hideCreateBackOfficeUser() {
        this.dialogOpts.createUser.visible = false;
        
    }


    public get lotteries() {
        return this.$store.state.lottery.campaigns;
    }


    public showCampaignDetails(campaign: any) {
        Web.navigate(`/lottery/${campaign.id}`);
    }


}


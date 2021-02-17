import WithRender from './campaign-approval-home.html';

import { Component } from 'vue-property-decorator';
import PaginatedContainerVue from '@/components/PaginatedContainerVue';
import PageDataModel from '@/components/core/PageDataModel';

import CampaignService from '../../service/CampaignService';
import PageRequest from '@/components/core/PageRequest';

import TreatCampaignDialog from './dialog/TreatCampaignDialog';


@WithRender
@Component({
    components: {
        TreatCampaignDialog,
    },
})
export default class CampaignApprovalHome extends PaginatedContainerVue {


    private dialogOpts: any = {

        treatCampaignApproval: {
            selectedCampaign: null,
            visible: false,
        },

    };


    private elements: PageDataModel = new PageDataModel(
        'campaigns', 
        this.loadCampaignsForApproval.bind(this),
    );


    public mounted() {
        this.elements.initialize();
    }


    private loadCampaignsForApproval(url?: string) {
        this.elements.setLoading(true);

        CampaignService.getCampaignByStatus(
            'AWAITING_APPROVAL',

            new PageRequest(
                this.elements.pageData.number,
                this.elements.pageData.size, 
                url
            ),

            (response: any) => this.handleSuccessResponse(response),
        );
    }


    private showTreatCampaignApproval(campaign: any) {
        this.dialogOpts.treatCampaignApproval.selectedCampaign = campaign;
        this.dialogOpts.treatCampaignApproval.visible = true;
    }


    private hideTreatCampaignApproval() {
        this.dialogOpts.treatCampaignApproval.visible = false;
        this.elements.initialize();
    }


    protected getPageDataModel(): PageDataModel {
        return this.elements;
    }


}


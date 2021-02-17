import { Component } from 'vue-property-decorator';
import WithRender from './campaign-home.html';

import PaginatedContainerVue from '@/components/PaginatedContainerVue';
import PageDataModel from '@/components/core/PageDataModel';
import SearchField from '@/components/search-field/SearchField';
import PageNavigator from '@/components/page-navigator/PageNavigator.vue';
import CampaignService from './service/CampaignService';
import PageRequest from '@/components/core/PageRequest';
import CreateCampaignDialog from '../campaign/dialog/new-campaign/CreateCampaignDialog';
import { EventTrigger } from '@/components/core/Event';
import { Constants } from '@/components/util';
import UserAction from '@/components/core/UserAction';



@WithRender
@Component({
    components: {
        SearchField,
        PageNavigator,
        CreateCampaignDialog,
    },
})
export default class CampaignHome extends PaginatedContainerVue {


    private dialogOpts: any = {
        
        createCampaign: {
            visible: false,
        },

    };


    private elements: PageDataModel = new PageDataModel(
        'campaigns',
        this.loadCampaigns.bind(this),
        this.searchCampaigns.bind(this)
    );


    public mounted() {
        this.elements.initialize();
        EventTrigger.trigger(
            Constants.routeUpdateEvent,

            {
                actions: [
                    new UserAction(
                        'Add Campaign',
                        'fa-plus',
                        () => {
                            this.showCreateCampaignDialog();
                        }
                    ),

                    new UserAction(
                        'Approve Campaign',
                        'fa-tasks',
                        () => {
                            this.$router.push({path: '/back-office/campaign/awaiting_approval'});
                        }
                    )
                ]
            }
        );
    }


    private loadCampaigns(url?: string) {
        this.elements.setLoading(true);

        CampaignService.getCampaigns(
            new PageRequest(
                this.elements.pageData.number, 
                this.elements.pageData.size,
                url
            ),

            (response: any) => this.handleSuccessResponse(response),

            (error: any) => this.handleErrorResponse(error)
        );
    }


    private searchCampaigns(query: string, url?: string) {
        this.elements.searchQuery = query;

        this.elements.clearPageData();
        this.elements.setLoading(true);

        CampaignService.searchCampaigns(
            query, 

            new PageRequest(
                this.elements.pageData.number,
                this.elements.pageData.size,
                url
            ),

            (response: any) => this.handleSuccessResponse(response, true),

            (error: any) => this.handleErrorResponse(error)
        );
    }


    public showCreateCampaignDialog() {
        this.dialogOpts.createCampaign.visible = true;
    }


    public hideCreateCampaignDialog() {
        this.dialogOpts.createCampaign.visible = false;
    }


    private getApprovalClass(status: string) {
        return CampaignService.getCampaignStatusClass(status);
    }


    public searchCleared() {
        const elements = this.getPageDataModel();

        elements.clearPageData();
        elements.initialize();
    }


    protected getPageDataModel(): PageDataModel {
        return this.elements;
    }


}


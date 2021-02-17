import { Component } from 'vue-property-decorator';
import WithRender from './partner-home.html';

import SearchField from '@/components/search-field/SearchField';
import PageNavigator from '@/components/page-navigator/PageNavigator.vue';
import PageDataModel from '@/components/core/PageDataModel';
import PaginatedContainerVue from '@/components/PaginatedContainerVue';
import { EventTrigger } from '@/components/core/Event';
import { Constants } from '@/components/util';
import UserAction from '@/components/core/UserAction';
import PartnerService from './service/PartnerService';
import PageRequest from '@/components/core/PageRequest';
import CreatePartnerDialog from './dialog/new-partner/CreatePartnerDialog';



@WithRender
@Component({
    components: {
        SearchField,
        PageNavigator,
        CreatePartnerDialog,
    }
})
export default class PartnerHome extends PaginatedContainerVue {

    private dialogOpts: any = {
        partnerDetails: {
            visible: false,
            selectedPartner: {},
        },

        createPartner: {
            visible: false,
        },
    };


    private elements: PageDataModel = new PageDataModel(
        'partners',
        this.loadPartners.bind(this),
        this.searchPartners.bind(this)
    );


    public mounted() {
        this.triggerRouteUpdate();
        this.elements.initialize();
    }


    public triggerRouteUpdate() {
        EventTrigger.trigger(
            Constants.routeUpdateEvent, 

            {
                actions: [
                    new UserAction(
                        'Add Partner',
                        'fa-plus',
                        () => {
                            this.showCreatePartnerDialog();
                        }
                    )
                ]
            }
        );
    }


    public showCreatePartnerDialog() {
        this.dialogOpts.createPartner.visible = true;
    }


    public hideCreatePartnerDialog() {
        this.dialogOpts.createPartner.visible = false;
        this.loadPartners();
    }


    private loadPartners(url?: string) {
        this.elements.setLoading(true);

        PartnerService.getPartners(
            new PageRequest(
                this.elements.pageData.number, 
                this.elements.pageData.size,
                url
            ),

            (response: any) => this.handleSuccessResponse(response),

            (error: any) => this.handleErrorResponse(error)
        );
    }


    private searchPartners(query: string, url?: string) {
        this.elements.searchQuery = query;

        this.elements.clearPageData();
        this.elements.setLoading(true);

        PartnerService.searchPartnerNames(
            this.elements.searchQuery, 

            new PageRequest(
                this.elements.pageData.number, 
                this.elements.pageData.size,
                url
            ),

            (response: any) => this.handleSuccessResponse(response, true),

            (error: any) => this.handleErrorResponse(error)
        );
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

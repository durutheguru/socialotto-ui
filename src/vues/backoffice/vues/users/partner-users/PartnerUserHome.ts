
import { Component } from 'vue-property-decorator';

import PageDataModel from '@/components/core/PageDataModel';
import PartnerUserService from '@/vues/backoffice/vues/users/partner-users/service/PartnerUserService';
import PageRequest from '@/components/core/PageRequest';
import PaginatedContainerVue from '@/components/PaginatedContainerVue';
import { EventTrigger } from '@/components/core/Event';
import { Constants, Log } from '@/components/util';
import UserAction from '@/components/core/UserAction';
import SearchField from '@/components/search-field/SearchField';
import UserTable from '@/vues/backoffice/components/user-table/UserTable';
import PageNavigator from '@/components/page-navigator/PageNavigator.vue';
import CreatePartnerUserDialog from './dialog/new-user/CreatePartnerUserDialog';
import PartnerUserDetailsDialog from './dialog/user-details/PartnerUserDetailsDialog';


import WithRender from './partner-users.html';



@WithRender
@Component({
    components: {
        SearchField,
        UserTable,
        PageNavigator,
        CreatePartnerUserDialog,
        PartnerUserDetailsDialog,
    },
})
export default class PartnerUserHome extends PaginatedContainerVue {


    private dialogOpts: any = {
        userDetails: {
            visible: false,
            selectedUser: {},
        },

        createUser: {
            visible: false,
        },
    };


    private elements: PageDataModel = new PageDataModel(
        'partnerUsers', 
        this.loadPartnerUsers.bind(this),
        this.searchPartnerUsers.bind(this)
    );


    public mounted() {
        EventTrigger.trigger(
            Constants.routeUpdateEvent, 

            {
                actions: [
                    new UserAction(
                        'Add Partner User',
                        'fa-plus',
                        () => {
                            this.showCreatePartnerUser();
                        }
                    ),

                    new UserAction(
                        'Upload Users',
                        'fa-cloud-upload',
                        () => {
                            this.uploadPartnerUsers();
                        }
                    )
                ],
            }
        );

        this.elements.initialize();
    }


    public loadPartnerUsers(url?: string) {
        this.elements.setLoading(true);

        PartnerUserService.getPartnerUsers(
            new PageRequest(
                this.elements.pageData.number, 
                this.elements.pageData.size, 
                url
            ), 

            (response: any) => this.handleSuccessResponse(response),

            (error: any) => this.handleErrorResponse(error)
        );
    }


    public searchPartnerUsers(
        query: string, url?: string
    ) {
        this.elements.searchQuery = query;

        this.elements.clearPageData();
        this.elements.setLoading(true);

        PartnerUserService.searchPartnerUsers(
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


    public showPartnerUserDetails(user: any) {
        this.dialogOpts.userDetails.selectedUser = user;
        this.dialogOpts.userDetails.visible = true;
    }


    public hidePartnerUserDetails() {
        this.dialogOpts.userDetails.visible = false;
    }


    public showCreatePartnerUser() {
        this.dialogOpts.createUser.visible = true;
    }


    public hideCreatePartnerUser() {
        this.dialogOpts.createUser.visible = false;
        this.loadPartnerUsers();
    }


    public uploadPartnerUsers() {
        Log.info('Uploading Partner Users');
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


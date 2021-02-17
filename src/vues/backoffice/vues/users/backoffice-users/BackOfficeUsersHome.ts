import { Component } from 'vue-property-decorator';

import BackOfficeUserService from '@/vues/backoffice/vues/users/backoffice-users/service/BackOfficeUserService';

import { Log, Constants } from '@/components/util';
import PageRequest from '@/components/core/PageRequest';
import { EventTrigger } from '@/components/core/Event';

import BackOfficeUserDetailsDialog from './dialog/user-details/BackOfficeUserDetailsDialog';
import CreateBackOfficeUserDialog from './dialog/new-user/CreateBackOfficeUserDialog';
import SearchField from '@/components/search-field/SearchField';
import UserAction from '@/components/core/UserAction';
import PageDataModel from '@/components/core/PageDataModel';
import UserTable from '@/vues/backoffice/components/user-table/UserTable';
import PaginatedContainerVue from '@/components/PaginatedContainerVue';
import PageNavigator from '@/components/page-navigator/PageNavigator.vue';

import WithRender from './backoffice-users.html';


@WithRender
@Component({
    components: {
        SearchField,
        UserTable,
        PageNavigator,
        BackOfficeUserDetailsDialog,
        CreateBackOfficeUserDialog,
    },
})
export default class BackOfficeUsersHome extends PaginatedContainerVue {


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
        'backOfficeUsers', 
        this.loadBackOfficeUsers.bind(this),
        this.searchBackOfficeUsers.bind(this)
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
                        'Add BackOffice User',
                        'fa-plus',
                        () => {
                            this.showCreateBackOfficeUser();
                        }
                    ),

                    new UserAction(
                        'Upload Users',
                        'fa-cloud-upload',
                        () => {
                            this.uploadBackOfficeUsers();
                        }
                    )
                ],
            }
        );
    }


    public loadBackOfficeUsers(url?: string) {
        this.elements.setLoading(true);

        BackOfficeUserService.getBackOfficeUsers(
            new PageRequest(
                this.elements.pageData.number, 
                this.elements.pageData.size, 
                url
            ), 

            (response: any) => this.handleSuccessResponse(response),

            (error: any) => this.handleErrorResponse(error)
        );
    }


    public searchBackOfficeUsers(
        query: string, url?: string
    ) {
        this.elements.searchQuery = query;

        this.elements.clearPageData();
        this.elements.setLoading(true);

        BackOfficeUserService.searchBackOfficeUsers(
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


    public showBackOfficeUserDetails(user: any) {
        this.dialogOpts.userDetails.selectedUser = user;
        this.dialogOpts.userDetails.visible = true;
    }


    public hideBackOfficeUserDetails() {
        this.dialogOpts.userDetails.visible = false; 
    }


    public showCreateBackOfficeUser() {
        Log.info('Creating BackOffice User');
        this.dialogOpts.createUser.visible = true;
    }


    public hideCreateBackOfficeUser() {
        this.dialogOpts.createUser.visible = false;
        this.loadBackOfficeUsers();
    }


    public uploadBackOfficeUsers() {
        Log.info('Uploading BackOffice Users');
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



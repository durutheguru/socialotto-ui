import { Component } from 'vue-property-decorator';
import SearchField from '@/components/search-field/SearchField';
import PageDataModel from '@/components/core/PageDataModel';
import LotteryUserService from '@/vues/backoffice/vues/users/lottery-users/service/LotteryUserService';
import PageRequest from '@/components/core/PageRequest';
import PageNavigator from '@/components/page-navigator/PageNavigator.vue';
import PaginatedContainerVue from '@/components/PaginatedContainerVue';
import { EventTrigger } from '@/components/core/Event';
import { Constants, Log } from '@/components/util';
import UserAction from '@/components/core/UserAction';
import UserTable from '@/vues/backoffice/components/user-table/UserTable';
import LotteryUserDetailsDialog from './dialog/user-details/LotteryUserDetailsDialog';
import CreateLotteryUserDialog from './dialog/new-user/CreateLotteryUserDialog';

import WithRender from './lottery-users.html';


@WithRender
@Component({
    components: {
        SearchField,
        UserTable,
        PageNavigator,
        LotteryUserDetailsDialog,
        CreateLotteryUserDialog,
    }
})
export default class LotteryUsersHome extends PaginatedContainerVue {


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
        'lotteryUsers',
        this.loadLotteryUsers.bind(this),
        this.searchLotteryUsers.bind(this)
    );


    public mounted() {
        EventTrigger.trigger(
            Constants.routeUpdateEvent, 

            {
                actions: [
                    new UserAction(
                        'Add Lottery User',
                        'fa-plus',
                        () => {
                            this.showCreateLotterUser();
                        }
                    ),

                    new UserAction(
                        'Upload Users',
                        'fa-cloud-upload',
                        () => {
                            this.uploadLotteryUsers();
                        }
                    )
                ]
            }
        );

        this.elements.initialize();
    }


    private loadLotteryUsers(url?: string) {
        this.elements.setLoading(true);

        LotteryUserService.getLotteryUsers(
            new PageRequest(
                this.elements.pageData.number, 
                this.elements.pageData.size, 
                url
            ),

            (response: any) => this.handleSuccessResponse(response),

            (error: any) => this.handleErrorResponse(error)
        );
    }


    private searchLotteryUsers(query: string, url?: string) {
        this.elements.searchQuery = query;

        this.elements.clearPageData();
        this.elements.setLoading(true);

        LotteryUserService.searchLotteryUsers(
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
        this.elements.clearPageData();
        this.elements.initialize();
    }


    public showLotteryUserDetails(user: any) {
        Log.info('Showing Lottery User Details');
        this.dialogOpts.userDetails.selectedUser = user;
        this.dialogOpts.userDetails.visible = true;
    }


    public hideLotteryUserDetails() {
        this.dialogOpts.userDetails.visible = false;
    }


    public showCreateLotterUser() {
        Log.info('Creating Lottery User');
        this.dialogOpts.createUser.visible = true;
    }


    public hideCreateLotteryUser() {
        this.dialogOpts.createUser.visible = false;
        this.loadLotteryUsers();
    }


    public uploadLotteryUsers() {
        Log.info('Uploading Lottery Users');
    }


    protected getPageDataModel(): PageDataModel {
        return this.elements;
    }


}



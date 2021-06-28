import { Web, Log, Util, Constants } from '@/components/util';

import ApiResource from '@/components/core/ApiResource';
import PageDataModel from '@/components/core/PageDataModel';
import PullStreamDataResponseResolver from '@/components/core/resolver/PullStreamDataResponseResolver';
import { EventBus } from '@/components/core/Event';

import WalletService from '@/components/secondary-sidebar/components/wallet/WalletService';



const getDefaultState = () => {
    return {

        activities: PageDataModel.newModel('activity'),
    
    };
};


const resolver = new PullStreamDataResponseResolver();


const state = getDefaultState();


const getters = {


    getState(context: any) {
        return context.activities;
    },

    getActivities(context: any) {
        return context.activities.list;
    },

    getActivitiesError(context: any) {
        return context.activities.error;
    },

    getActivitiesLoading(context: any) {
        return context.activities.loading;
    },

    getMinFetchedTimeStamp(context: any) {
        return context.activities.pageData.minTimeStamp;
    },

    getMaxFetchedTimeStamp(context: any) {
        return context.activities.pageData.maxTimeStamp;
    },

};


const mutations = {


    resetState(context: any) {
        Object.assign(context, getDefaultState());
    },


    appendActivities(context: any, activityUpdate: any) {
        Log.info(`Appending Activity Page Data: ${JSON.stringify(activityUpdate)}`);

        PageDataModel.appendModelData(
            context.activities, 

            activityUpdate.apiResponse, 

            activityUpdate.isSearchResult, 

            {
                getMinFetchedTimeStamp: getters.getMinFetchedTimeStamp(context),
                getMaxFetchedTimeStamp: getters.getMaxFetchedTimeStamp(context),
            },

            resolver,
        );

        EventBus.$emit(Constants.newStoreDataEvent);
    },


    prependActivities(context: any, activityUpdate: any) {
        Log.info(`Prepending Activity Page Data: ${JSON.stringify(activityUpdate)}`);

        PageDataModel.prependModelData(
            context.activities, 

            activityUpdate.apiResponse,

            activityUpdate.isSearchResult,

            {
                getMinFetchedTimeStamp: getters.getMinFetchedTimeStamp(context),
                getMaxFetchedTimeStamp: getters.getMaxFetchedTimeStamp(context),
            },

            resolver,
        );

        EventBus.$emit(Constants.newStoreDataEvent);
    },


    setActivitiesLoading(context: any, loading: boolean) {
        context.activities.loading = loading;
    },


    clearActivitiesError(context: any) {
        context.activities.error = '';
    },


    setActivitiesError(context: any, error: any) {
        Log.info(`Assigning Activity Error response: ${JSON.stringify(error)}`);
        context.activities.error = Util.extractError(error.apiError);
    },


};


const actions = {

    loadActivities(context: any) {
        context.commit('clearActivitiesError');
        context.commit('setActivitiesLoading', true);

        WalletService.getWalletActivity(
            (response: any) => {
                context.commit('resetState');
        
                context.commit('setActivitiesLoading', false);
                context.commit(
                    'appendActivities', 
                    {
                        apiResponse: response, 
                        isSearchResult: false,
                    },
                );
            },

            (error: any) => {
                context.commit('setActivitiesLoading', false);
                context.commit(
                    'setActivitiesError',
                    {
                        apiError: error,
                    },
                );
            }
        );
    },


    prependActivities(context: any) {
        Util.throttle(
            {
                key: 'wallet_activity_list_prepend',

                run: () => {
                    context.commit('clearActivitiesError');
                    context.commit('setActivitiesLoading', true);

                    Web.get(
                        PageDataModel.getPrependUrl(
                            '/api/v1/wallet/activity', 
                            context.getters.getMaxFetchedTimeStamp
                        ),
                        
                        (response: any) => {
                            context.commit('setActivitiesLoading', false);
                            context.commit(
                                'prependActivities', 
                                {
                                    apiResponse: response, 
                                    isSearchResult: false,
                                },
                            );
                        },
            
                        (error: any) => {
                            context.commit('setActivitiesLoading', false);
                            context.commit(
                                'setActivitiesError',
                                {
                                    apiError: error,
                                },
                            );
                        },
                    );
                },

                time: 1000,
            },
        );
    },


    appendActivities(context: any) {
        Util.throttle(
            {
                key: 'wallet_activity_list_append',

                run: () => {
                    context.commit('clearActivitiesError');
                    context.commit('setActivitiesLoading', true);

                    Web.get(
                        PageDataModel.getAppendUrl(
                            '/api/v1/wallet/activity', 
                            context.getters.getMinFetchedTimeStamp
                        ),
            
                        (response: any) => {
                            context.commit('setActivitiesLoading', false);
                            context.commit(
                                'appendActivities', 
                                {
                                    apiResponse: response, 
                                    isSearchResult: false,
                                },
                            );
                        },
            
                        (error: any) => {
                            context.commit('setActivitiesLoading', false);
                            context.commit(
                                'setActivitiesError',
                                {
                                    apiError: error,
                                },
                            );
                        },
                    );
                },

                time: 1000,
            },
        );
    },


};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};




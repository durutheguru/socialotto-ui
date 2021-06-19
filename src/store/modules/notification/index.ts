import { Web, Log, Util, Constants } from '@/components/util';

import ApiResource from '@/components/core/ApiResource';
import PageDataModel from '@/components/core/PageDataModel';
import PullStreamDataResponseResolver from '@/components/core/resolver/PullStreamDataResponseResolver';
import { EventBus } from '@/components/core/Event';

import store from '@/store';



const getDefaultState = () => {
    return {

        notifications: PageDataModel.newModel('notifications'),
    
    };
};


const resolver = new PullStreamDataResponseResolver();


const state = getDefaultState();


const getters = {


    getState(context: any) {
        return context.notifications;
    },

    getNotifications(context: any) {
        return context.notifications.list;
    },

    getNotificationsError(context: any) {
        return context.notifications.error;
    },

    getNotificationsLoading(context: any) {
        return context.notifications.loading;
    },

    getMinFetchedTimeStamp(context: any) {
        return context.notifications.pageData.minTimeStamp;
    },

    getMaxFetchedTimeStamp(context: any) {
        return context.notifications.pageData.maxTimeStamp;
    },

};


const mutations = {


    resetState(context: any) {
        Object.assign(context, getDefaultState());
    },


    appendNotifications(context: any, notificationsUpdate: any) {
        Log.info(`Appending Notifications Page Data: ${JSON.stringify(notificationsUpdate)}`);

        PageDataModel.appendModelData(
            context.notifications, 

            notificationsUpdate.apiResponse,

            notificationsUpdate.isSearchResult,

            {
                getMinFetchedTimeStamp: getters.getMinFetchedTimeStamp(context),
                getMaxFetchedTimeStamp: getters.getMaxFetchedTimeStamp(context),
            },

            resolver,
        );

        EventBus.$emit(Constants.newStoreDataEvent);
    },


    prependNotifications(context: any, notificationsUpdate: any) {
        Log.info(`Prepending Notifications Page Data: ${JSON.stringify(notificationsUpdate)}`);

        PageDataModel.prependModelData(
            context.notifications, 

            notificationsUpdate.apiResponse,

            notificationsUpdate.isSearchResult,

            {
                getMinFetchedTimeStamp: getters.getMinFetchedTimeStamp(context),
                getMaxFetchedTimeStamp: getters.getMaxFetchedTimeStamp(context),
            },

            resolver
        );

        EventBus.$emit(Constants.newStoreDataEvent);
    },


    setNotificationsLoading(context: any, loading: boolean) {
        context.notifications.loading = loading;
    },


    clearNotificationsError(context: any) {
        context.notifications.error = '';
    },


    setNotificationsError(context: any, notificationsError: any) {
        Log.info(`Assigning Notifications Error response: ${JSON.stringify(notificationsError)}`);
        context.notifications.error = Util.extractError(notificationsError.apiError);
    },


};


const actions = {

    loadNotifications(context: any) {
        context.commit('clearNotificationsError');
        context.commit('setNotificationsLoading', true);

        Web.get(
            '/api/v1/user_notifications?userId=' + store.getters['authToken/username'],

            (response: any) => {
                context.commit('resetState');
        
                context.commit('setNotificationsLoading', false);
                context.commit(
                    'appendNotifications', 
                    {
                        apiResponse: response, 
                        isSearchResult: false,
                    },
                );
            },

            (error: any) => {
                context.commit('setNotificationsLoading', false);
                context.commit(
                    'setNotificationsError',
                    {
                        apiError: error,
                    },
                );
            }
        );
    },


    prependNotifications(context: any) {
        Util.throttle(
            {
                key: 'notifications_list_prepend',

                run: () => {
                    context.commit('clearNotificationsError');
                    context.commit('setNotificationsLoading', true);

                    Web.get(
                        PageDataModel.getPrependUrl(
                            '/api/v1/user_notifications?userId=' + store.getters['authToken/username'], 
                            context.getters.getMaxFetchedTimeStamp
                        ),
                        
                        (response: any) => {
                            context.commit('setNotificationsLoading', false);
                            context.commit(
                                'prependNotifications', 
                                {
                                    apiResponse: response, 
                                    isSearchResult: false,
                                },
                            );
                        },
            
                        (error: any) => {
                            context.commit('setNotificationsLoading', false);
                            context.commit(
                                'setNotificationsError',
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


    appendNotifications(context: any) {
        Util.throttle(
            {
                key: 'notifications_list_append',

                run: () => {
                    context.commit('clearNotificationsError');
                    context.commit('setNotificationsLoading', true);

                    Web.get(
                        PageDataModel.getAppendUrl(
                            '/api/v1/user_notifications?userId=' + store.getters['authToken/username'], 
                            context.getters.getMinFetchedTimeStamp
                        ),
            
                        (response: any) => {
                            context.commit('setNotificationsLoading', false);
                            context.commit(
                                'appendNotifications', 
                                {
                                    apiResponse: response, 
                                    isSearchResult: false,
                                },
                            );
                        },
            
                        (error: any) => {
                            context.commit('setNotificationsLoading', false);
                            context.commit(
                                'setNotificationsError',
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



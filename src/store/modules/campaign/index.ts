import { Web, Log, Util, Constants } from '@/components/util';

import ApiResource from '@/components/core/ApiResource';
import PageDataModel from '@/components/core/PageDataModel';
import PullStreamDataResponseResolver from '@/components/core/resolver/PullStreamDataResponseResolver';
import { EventBus } from '@/components/core/Event';
import DefaultPageResponseResolver from '@/components/core/resolver/DefaultPageResponseResolver';
import PageResponseResolver from '@/components/core/resolver/PageResponseResolver';



const getDefaultState = () => {
    return {

        campaigns: PageDataModel.newModel('campaign'),
    
    };
};


const resolver = new DefaultPageResponseResolver();


const state = getDefaultState();


const getters = {

    getState(context: any) {
        return context.campaigns;
    },

    getCampaigns(context: any) {
        return context.campaigns.list;
    },

    getCampaignsError(context: any) {
        return context.campaigns.error;
    },

    getCampaignsLoading(context: any) {
        return context.campaigns.loading;
    },

    getCampaignsPage(context: any) {
        return context.campaigns.pageData.number;
    },

};


const mutations = {


    resetState(context: any) {
        Object.assign(context, getDefaultState());
    },


    appendCampaigns(context: any, campaignUpdate: any) {
        Log.info(`Appending Campaign Page Data: ${JSON.stringify(campaignUpdate)}`);

        PageDataModel.appendModelData(
            context.campaigns, 

            campaignUpdate.apiResponse,

            campaignUpdate.isSearchResult,

            {},

            resolver as PageResponseResolver,
        );

        EventBus.$emit(Constants.newStoreDataEvent);
    },


    prependCampaigns(context: any, campaignUpdate: any) {
        Log.info(`Prepending Campaign Page Data: ${JSON.stringify(campaignUpdate)}`);

        PageDataModel.prependModelData(
            context.campaigns, 

            campaignUpdate.apiResponse,

            campaignUpdate.isSearchResult,

            {},

            resolver as PageResponseResolver,
        );

        EventBus.$emit(Constants.newStoreDataEvent);
    },


    setCampaignsLoading(context: any, loading: boolean) {
        context.campaigns.loading = loading;
    },


    clearCampaignsError(context: any) {
        context.campaigns.error = '';
    },


    setCampaignsError(context: any, campaignError: any) {
        Log.info(`Assigning Campaign Error response: ${JSON.stringify(campaignError)}`);
        context.campaigns.error = Util.extractError(campaignError.apiError);
    },


};


const actions = {

    loadCampaigns(context: any) {
        context.commit('clearCampaignsError');
        context.commit('setCampaignsLoading', true);

        Web.get(
            '/api/v1/campaign_request',

            (response: any) => {
                context.commit('resetState');
        
                context.commit('setCampaignsLoading', false);
                context.commit(
                    'appendCampaigns', 
                    {
                        apiResponse: response, 
                        isSearchResult: false,
                    },
                );
            },

            (error: any) => {
                context.commit('setCampaignsLoading', false);
                context.commit(
                    'setCampaignsError',
                    {
                        apiError: error,
                    },
                );
            }
        );
    },


    appendCampaigns(context: any) {
        Util.throttle(
            {
                key: 'campaign_list_append',

                run: () => {
                    context.commit('clearCampaignsError');
                    context.commit('setCampaignsLoading', true);

                    Web.get(
                        '/api/v1/campaign_request?page=' + (context.getters.getCampaignsPage + 1),
            
                        (response: any) => {
                            context.commit('setCampaignsLoading', false);
                            context.commit(
                                'appendCampaigns', 
                                {
                                    apiResponse: response, 
                                    isSearchResult: false,
                                },
                            );
                        },
            
                        (error: any) => {
                            context.commit('setCampaignsLoading', false);
                            context.commit(
                                'setCampaignsError',
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


    loadCampaignDetails(context: any, campaignId: number) {
        Web.get(
            `/api/v1/campaign/${campaignId}?projection=campaignDetails`,

            (response: any) => {
                context.commit(
                    'setSelectedCampaign', 
                    {
                        apiResponse: response,
                    },
                );
            },

            (error: any) => {
                context.commit(
                    'setSelectedCampaignError',
                    {
                        apiError: error,
                    },
                );
            }
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


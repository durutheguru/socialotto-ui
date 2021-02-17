import { Web, Log, Util, Constants } from '@/components/util';

import ApiResource from '@/components/core/ApiResource';
import PageDataModel from '@/components/core/PageDataModel';


const state = {

    selectedCampaign: ApiResource.plain(),

    campaigns: PageDataModel.newModel('campaigns'),

};


const getters = { };


const mutations = {

    setCampaigns(context: any, campaignUpdate: any) {
        Log.info('Assigning Campaigns Page Data: ');

        PageDataModel.assignModelData(
            context.campaigns, 

            campaignUpdate.apiResponse,

            campaignUpdate.isSearchResult
        );
    },

    setCampaignsError(context: any, campaignError: any) {
        Log.info('Assigning Campaign Error response: ');
        context.campaigns.error = Util.extractError(campaignError.apiError);
    },


    setSelectedCampaign(context: any, campaignData: any) {
        Log.info('Setting Campaign Data');
        context.selectedCampaign.data = campaignData.apiResponse.data;
    },


    setSelectedCampaignError(context: any, campaignError: any) {
        context.selectedCampaign.error = Util.extractError(campaignError.apiError);
    }

};


const actions = {

    loadCampaigns(context: any) {
        Web.get(
            '/api/v1/campaign?projection=campaignDetails',

            (response: any) => {
                context.commit(
                    'setCampaigns', 
                    {
                        apiResponse: response, 
                        isSearchResult: false,
                    },
                );
            },

            (error: any) => {
                context.commit(
                    'setCampaignsError',
                    {
                        apiError: error,
                    },
                );
            }
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


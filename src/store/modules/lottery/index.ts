import { Web, Log, Util, Constants } from '@/components/util';

import ApiResource from '@/components/core/ApiResource';
import PageDataModel from '@/components/core/PageDataModel';
import PullStreamDataResponseResolver from '@/components/core/resolver/PullStreamDataResponseResolver';



const getDefaultState = () => {
    return {

        lotteries: PageDataModel.newModel('lottery'),
    
    };
};


const resolver = new PullStreamDataResponseResolver();


const state = getDefaultState();


const getters = { };


const mutations = {


    resetState(context: any) {
        Object.assign(context, getDefaultState())
    },


    appendLotteries(context: any, lotteryUpdate: any) {
        Log.info(`Appending Lottery Page Data: ${JSON.stringify(lotteryUpdate)}`);

        PageDataModel.appendModelData(
            context.lotteries, 

            lotteryUpdate.apiResponse,

            lotteryUpdate.isSearchResult,

            resolver
        );
    },


    prependLotteries(context: any, lotteryUpdate: any) {
        Log.info(`Prepending Lottery Page Data: ${JSON.stringify(lotteryUpdate)}`);

        PageDataModel.prependModelData(
            context.lotteries, 

            lotteryUpdate.apiResponse,

            lotteryUpdate.isSearchResult,

            resolver
        );
    },


    setLotteriesError(context: any, lotteryError: any) {
        Log.info(`Assigning Lottery Error response: ${JSON.stringify(lotteryError)}`);
        context.lotteries.error = Util.extractError(lotteryError.apiError);
    },


};


const actions = {

    loadLotteries(context: any) {
        context.commit('resetState');

        Web.get(
            '/api/v1/lottery',

            (response: any) => {
                context.commit(
                    'appendLotteries', 
                    {
                        apiResponse: response, 
                        isSearchResult: false,
                    },
                );
            },

            (error: any) => {
                context.commit(
                    'setLotteriesError',
                    {
                        apiError: error,
                    },
                );
            }
        );
    },


    prependLotteries(context: any) {
        Web.get(
            PageDataModel.getPrependUrl(
                '/api/v1/lottery', 
                context.lotteries
            ),

            (response: any) => {
                context.commit(
                    'prependLotteries', 
                    {
                        apiResponse: response, 
                        isSearchResult: false,
                    },
                );
            },

            (error: any) => {
                context.commit(
                    'setLotteriesError',
                    {
                        apiError: error,
                    },
                );
            }
        );
    },


    appendLotteries(context: any) {
        Web.get(
            PageDataModel.getAppendUrl(
                '/api/v1/lottery', 
                context.lotteries
            ),

            (response: any) => {
                context.commit(
                    'appendLotteries', 
                    {
                        apiResponse: response, 
                        isSearchResult: false,
                    },
                );
            },

            (error: any) => {
                context.commit(
                    'setLotteriesError',
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


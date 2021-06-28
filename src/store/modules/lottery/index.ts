import { Web, Log, Util, Constants } from '@/components/util';

import ApiResource from '@/components/core/ApiResource';
import PageDataModel from '@/components/core/PageDataModel';
import PullStreamDataResponseResolver from '@/components/core/resolver/PullStreamDataResponseResolver';
import { EventBus } from '@/components/core/Event';



const getDefaultState = () => {
    return {

        lotteries: PageDataModel.newModel('lottery'),
    
    };
};


const resolver = new PullStreamDataResponseResolver();


const state = getDefaultState();


const getters = {


    getState(context: any) {
        return context.lotteries;
    },

    getLotteries(context: any) {
        return context.lotteries.list;
    },

    getLotteriesError(context: any) {
        return context.lotteries.error;
    },

    getLotteriesLoading(context: any) {
        return context.lotteries.loading;
    },

    getMinFetchedTimeStamp(context: any) {
        return context.lotteries.pageData.minTimeStamp;
    },

    getMaxFetchedTimeStamp(context: any) {
        return context.lotteries.pageData.maxTimeStamp;
    },

};


const mutations = {


    resetState(context: any) {
        Object.assign(context, getDefaultState());
    },


    appendLotteries(context: any, lotteryUpdate: any) {
        Log.info(`Appending Lottery Page Data: ${JSON.stringify(lotteryUpdate)}`);

        PageDataModel.appendModelData(
            context.lotteries, 

            lotteryUpdate.apiResponse,

            lotteryUpdate.isSearchResult,

            {
                getMinFetchedTimeStamp: getters.getMinFetchedTimeStamp(context),
                getMaxFetchedTimeStamp: getters.getMaxFetchedTimeStamp(context),
            },

            resolver,
        );

        EventBus.$emit(Constants.newStoreDataEvent);
    },


    prependLotteries(context: any, lotteryUpdate: any) {
        Log.info(`Prepending Lottery Page Data: ${JSON.stringify(lotteryUpdate)}`);

        PageDataModel.prependModelData(
            context.lotteries, 

            lotteryUpdate.apiResponse,

            lotteryUpdate.isSearchResult,

            {
                getMinFetchedTimeStamp: getters.getMinFetchedTimeStamp(context),
                getMaxFetchedTimeStamp: getters.getMaxFetchedTimeStamp(context),
            },

            resolver
        );

        EventBus.$emit(Constants.newStoreDataEvent);
    },


    setLotteriesLoading(context: any, loading: boolean) {
        context.lotteries.loading = loading;
    },


    clearLotteriesError(context: any) {
        context.lotteries.error = '';
    },


    setLotteriesError(context: any, lotteryError: any) {
        Log.info(`Assigning Lottery Error response: ${JSON.stringify(lotteryError)}`);
        context.lotteries.error = Util.extractError(lotteryError.apiError);
    },


};


const actions = {

    loadLotteries(context: any) {
        context.commit('clearLotteriesError');
        context.commit('setLotteriesLoading', true);

        Web.get(
            '/api/v1/lottery',

            (response: any) => {
                context.commit('resetState');
        
                context.commit('setLotteriesLoading', false);
                context.commit(
                    'appendLotteries', 
                    {
                        apiResponse: response, 
                        isSearchResult: false,
                    },
                );
            },

            (error: any) => {
                context.commit('setLotteriesLoading', false);
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
        Util.throttle(
            {
                key: 'lottery_list_prepend',

                run: () => {
                    context.commit('clearLotteriesError');
                    context.commit('setLotteriesLoading', true);

                    Web.get(
                        PageDataModel.getPrependUrl(
                            '/api/v1/lottery', 
                            context.getters.getMaxFetchedTimeStamp
                        ),
                        
                        (response: any) => {
                            context.commit('setLotteriesLoading', false);
                            context.commit(
                                'prependLotteries', 
                                {
                                    apiResponse: response, 
                                    isSearchResult: false,
                                },
                            );
                        },
            
                        (error: any) => {
                            context.commit('setLotteriesLoading', false);
                            context.commit(
                                'setLotteriesError',
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


    appendLotteries(context: any) {
        Util.throttle(
            {
                key: 'lottery_list_append',

                run: () => {
                    context.commit('clearLotteriesError');
                    context.commit('setLotteriesLoading', true);

                    Web.get(
                        PageDataModel.getAppendUrl(
                            '/api/v1/lottery', 
                            context.getters.getMinFetchedTimeStamp
                        ),
            
                        (response: any) => {
                            context.commit('setLotteriesLoading', false);
                            context.commit(
                                'appendLotteries', 
                                {
                                    apiResponse: response, 
                                    isSearchResult: false,
                                },
                            );
                        },
            
                        (error: any) => {
                            context.commit('setLotteriesLoading', false);
                            context.commit(
                                'setLotteriesError',
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


import { Log, Util, Constants } from '@/components/util';

import { EventBus } from '@/components/core/Event';
import WalletService from '@/components/secondary-sidebar/components/wallet/WalletService';



const getDefaultState = () => {
    return {

        wallet: {
            error: '',
            loading: false,
            balance: 0.0,
        },
    
    };
};


const state = getDefaultState();


const getters = {


    getState(context: any) {
        return context.wallet;
    },

    getWalletId(context: any) {
        return context.wallet.walletId;
    },

    getWalletBalance(context: any) {
        return context.wallet.balance;
    },

    getWalletLoading(context: any) {
        return context.wallet.loading;
    },

    getWalletError(context: any) {
        return context.wallet.error;
    },

};


const mutations = {


    resetState(context: any) {
        Object.assign(context, getDefaultState());
    },


    updateWalletInfo(context: any, walletUpdate: any) {
        Log.info(`Updating Wallet Info: ${JSON.stringify(walletUpdate)}`);

        context.wallet = walletUpdate;
        EventBus.$emit(Constants.newStoreDataEvent);
    },


    setWalletLoading(context: any, loading: boolean) {
        context.wallet.loading = loading;
    },


    clearWalletError(context: any) {
        context.wallet.error = '';
    },


    setWalletError(context: any, walletError: any) {
        Log.info(`Assigning Wallet Error response: ${JSON.stringify(walletError)}`);
        context.wallet.error = Util.extractError(walletError.apiError);
    },


};


const actions = {

    fetchWallet(context: any) {
        context.commit('clearWalletError');
        context.commit('setWalletLoading', true);

        WalletService.getWallet(
            (response: any) => {
                context.commit('resetState');
        
                context.commit('setWalletLoading', false);
                context.commit(
                    'updateWalletInfo', response.data,
                );
            },

            (error: any) => {
                context.commit('setWalletLoading', false);
                context.commit(
                    'setWalletError',
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


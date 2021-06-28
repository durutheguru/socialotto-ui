import Vue from 'vue';
import Vuex from 'vuex';
import authToken from './modules/authToken';
import lottery from './modules/lottery';
import campaign from './modules/campaign';
import wallet from './modules/wallet';
import notification from './modules/notification';
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);

export default new Vuex.Store({

  state : {
    entryUrl : null,
  },


  getters : {

    entryUrl(context: any) {
      return context.entryUrl;
    },

  },


  mutations : {

    entryUrl(context: any, url: string) {
      context.entryUrl = url;
    },

  },


  modules : {
    authToken,
    lottery,
    campaign,
    wallet,
    notification,
  },


  plugins: [
    createPersistedState(),
  ],


});


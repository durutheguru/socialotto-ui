import Vue from 'vue';
import Vuex from 'vuex';
import authToken from './modules/authToken';
import lottery from './modules/lottery';
import campaign from './modules/campaign';
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
  },


  plugins: [
    createPersistedState(),
  ],


});



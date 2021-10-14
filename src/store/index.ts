import Vue from 'vue';
import Vuex from 'vuex';
import authToken from './modules/authToken';
import lottery from './modules/lottery';
import campaign from './modules/campaign';
import wallet from './modules/wallet';
import notification from './modules/notification';
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex);
let timer: any;
export default new Vuex.Store({

  state : {
    entryUrl : null,
    globalAlert: { show: false, text: "", type: "" },
    dropMenu: false
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
    
    setGlobalAlert(state, payload) {

			// Clear previous timer

			clearTimeout(timer);

			// update alert state

			state.globalAlert = payload;

			// set new timer

			timer = setTimeout(() => (state.globalAlert = { show: false, text: "", type: "" }), 5000);
		},

    setDropMenu(state, payload) {
      state.dropMenu = payload;
    }


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


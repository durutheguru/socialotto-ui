import Vue from "vue";
import Vuex from "vuex";
import authToken from "./modules/authToken";
import lottery from "./modules/lottery";
import campaign from "./modules/campaign";
import wallet from "./modules/wallet";
import notification from "./modules/notification";
import createPersistedState from "vuex-persistedstate";
import { Log } from "@/components/util";

Vue.use(Vuex);
let timer: any;
let timer2: any;
function defaultState() {
  return {
    entryUrl: null,
    globalAlert: { show: false, type: "", text: "" },
    openLogout: true,
    // globalAlert2: { show: false, text: "", type: "" },
    dropMenu: false,
    isNoticeMenu: false,
    isRecentsMenu: false,
    dropAuthMenu: false,
    userMenu: false,
    lastEventTarget: "",
    donateModal: false,
    currentCampaignId: "",
    currentLotteryId: "",
    pendingApprovalLoading: false,
    pendingDisapprovalLoading: false,
    campaignPendingApprovalLoading: false,
    campaignPendingDisapprovalLoading: false,
    isLotteryDisapproval: { show: false, lotteryId: "" },
    tbodyKey: 0,
  };
}
export default new Vuex.Store({
  state: defaultState(),

  getters: {
    entryUrl(context: any) {
      return context.entryUrl;
    },
  },

  mutations: {
    resetState(state) {
      Log.info("called");
      Object.assign(state, defaultState());
    },
    entryUrl(context: any, url: string) {
      context.entryUrl = url;
    },

    // setGlobalAlert2(state, payload) {
    //   // Clear previous timer
    //   clearTimeout(timer2);
    //   // update alert state
    //   state.globalAlert2 = payload;
    //   // set new timer
    //   timer2 = setTimeout(
    //     () => (state.globalAlert2 = { show: false, text: "", type: "" }),
    //     5000
    //   );
    // },

    setGlobalAlert(state, payload) {
      // Clear previous timer
      // clearTimeout(timer);
      // update alert state
      state.globalAlert = payload;
      // set new timer
      // timer = setTimeout(() => {
      //   const alert = document.getElementById("globalAlert") as HTMLElement;
      //   state.globalAlert = { show: false, type: "", text: "" };
      //   if (payload.show === true) {
      //     alert.click();
      //   }
      // }, 5000);
    },

    setOpenLogout(state, payload) {
      state.openLogout = payload;
    },

    setDropMenu(state, payload) {
      state.dropMenu = payload;
    },
    setDropAuthMenu(state, payload) {
      state.dropAuthMenu = payload;
    },
    setUserMenu(state, payload) {
      state.userMenu = payload;
    },
    setIsNoticeMenu(state, payload) {
      state.isNoticeMenu = payload;
    },
    setLastEventTarget(state, payload) {
      state.lastEventTarget = payload;
    },
    setIsRecentsMenu(state, payload) {
      state.isRecentsMenu = payload;
    },
    setDonateModal(state, payload) {
      state.donateModal = payload;
    },
    setCurrentCampaignId(state, payload) {
      state.currentCampaignId = payload;
    },
    setCurrentLotteryId(state, payload) {
      state.currentLotteryId = payload;
    },
    setIsLotteryDisapproval(state, payload) {
      state.isLotteryDisapproval = payload;
    },
    setPendingApprovalLoading(state, payload) {
      state.pendingApprovalLoading = payload;
    },

    setPendingDisapprovalLoading(state, payload) {
      state.pendingDisapprovalLoading = payload;
    },
    setTbodyKey(state, payload) {
      state.tbodyKey += payload;
    },
    setCampaignPendingApprovalLoading(state, payload) {
      state.campaignPendingApprovalLoading = payload;
    },
    setCampaignPendingDisapprovalLoading(state, payload) {
      state.campaignPendingDisapprovalLoading = payload;
    },
  },

  modules: {
    authToken,
    lottery,
    campaign,
    wallet,
    notification,
  },

  plugins: [createPersistedState()],
});

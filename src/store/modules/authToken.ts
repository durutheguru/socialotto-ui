import Web from "@/components/util/Web";
import UserAuthContext from "@/components/auth/UserAuthContext";
import "@/interceptors/auth/AuthCheckInterceptor";
import { Log } from "@/components/util";

const state = {
  username: "",
  loggedIn: false,
  authToken: null,
  userEnabled: null,
  authorizations: [],
};

const getters = {
  username(context: any) {
    return context.username;
  },

  apiToken(context: any) {
    return context.authToken;
  },

  loggedIn(context: any) {
    return context.loggedIn;
  },

  isUserActive(context: any) {
    return context.userEnabled;
  },

  authorizations(context: any) {
    return context.authorizations;
  },

  isAuthorized(context: any) {
    return (authority: string) => {
      return (
        context.authorizations.length > 0 &&
        context.authorizations.indexOf(authority) > -1
      );
    };
  },
};

const mutations = {
  apiToken(context: any, token: string) {
    context.loggedIn = true;
    context.authToken = token;

    const userAuthContext = UserAuthContext.getInstance();
    userAuthContext.initialize(token);

    context.username = userAuthContext.userId();
    context.userEnabled = userAuthContext.isEnabled();
    context.authorizations = userAuthContext.authorizationList();
    Log.info(`Context State: context.userEnabled ${context.userEnabled}`);
  },

  logout(context: any) {
    context.loggedIn = false;
    context.authToken = null;

    context.username = "";
    context.userEnabled = null;
    context.authorizations = [];
  },
};

const actions = {
  async authenticate(context: any) {
    return new Promise((resolve, reject) => {
      Web.get(
        "/api/v1/auth",

        (response: any) => {
          resolve(true);
        },

        (error: any) => {
          resolve(false);
        }
      );
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

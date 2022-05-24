import store from "../../store";
import { Log, Web, Util } from "../../components/util";

const authRoute = async (to: any, next: any) => {
  // Log.info("Auth Logged In: " + store.getters["authToken/loggedIn"]);

  if (store.getters["authToken/loggedIn"]) {
    // TODO: fix this, convert to checking the expiration on persisted token
    const authenticated = await store.dispatch("authToken/authenticate");
    if (!authenticated) {
      navigateLogin(to, next);
    } else {
      let userActive = store.getters["authToken/isUserActive"];
      if (userActive === true) {
        navigatePath(to, next);
      } else if (userActive === false) {
        Web.navigate("/user_activation");
      } else {
        Log.warn("userActive flag undefined. Unable to proceed");
      }
    }
  } else {
    navigateLogin(to, next);
  }
};

// const navigateLogin = (to: any, next: any) => {
//   store.commit("entryUrl", to.path);
//   Web.navigate("/login");
// };
const navigateLogin = (to: any, next: any) => {
  store.commit("entryUrl", to.path);
  Web.navigate("/login");
};

const navigatePath = (to: any, next: any) => {
  const url = store.getters.entryUrl;
  const authorizations = store.getters["authToken/authorizations"];

  if (to.meta.auth && to.meta.auth.length > 0) {
    if (!authorizations.some((auth: string) => to.meta.auth.includes(auth))) {
      Log.info("doesnt have auth");
      navigateLogin(to, next);
      return;
    }
  }

  if (Util.isValidString(url)) {
    next(url);
    store.commit("entryUrl", null);
  } else {
    next();
  }

  // else check meta property against user authorities. if it contains at least one of the auths then go to page else
  // go to landing page
};

export default function(to: any, from: any, next: any) {
  if (to.matched.some((record: any) => record.meta.skipAuth)) {
    next();
    return;
  }

  authRoute(to, next);
}

// if not authenticated, navigate to landing

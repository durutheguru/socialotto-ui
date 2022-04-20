import store from "../../store";
import { Log, Web, Util } from "../../components/util";

const authRoute = async (to: any, next: any) => {
  // Log.info("Auth Logged In: " + store.getters["authToken/loggedIn"]);

  if (store.getters["authToken/loggedIn"]) {
    const authenticated = await store.dispatch("authToken/authenticate");
    if (!authenticated) {
      navigateLandingPage(to, next);
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
    navigateLandingPage(to, next);
  }
};

// const navigateLogin = (to: any, next: any) => {
//   store.commit("entryUrl", to.path);
//   Web.navigate("/login");
// };
const navigateLandingPage = (to: any, next: any) => {
  store.commit("entryUrl", to.path);
  Web.navigate("/");
};

const navigatePath = (to: any, next: any) => {
  const url = store.getters.entryUrl;
  const authorizations = store.getters["authToken/authorizations"];
  // Log.info(authorizations);
  // Log.info(to.meta.auth);
  // if no meta auth then continue process
  if (to.meta.auth && to.meta.auth.length > 0) {
    // Log.info("auth");
    // Log.info("to: " + JSON.stringify(to));
    if (!authorizations.some((auth: string) => to.meta.auth.includes(auth))) {
      Log.info("doesnt have auth");
      navigateLandingPage(to, next);
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

<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll spartan">
    <div
      class="signupMainOuterDiv relative top-4 mx-auto sm:w-full max-w-sm sm:max-w-md mb-12 mt-12"
    >
      <div class="signupMain bg-white py-8 px-10  sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv">
          <h2 class="mt-3 text-center mainHeader dark-blue-text">
            Login to Socialotto
          </h2>
        </div>

        <validation-observer
          ref="observer"
          tag="form"
          role="form"
          v-slot="{ invalid }"
          class="space-y-6"
          @submit.prevent="doLogin"
          novalidate
        >
          <div>
            <label
              for="email"
              style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
              class="block text-sm font-medium"
            >
              Email address
            </label>
            <div class="mt-1">
              <validation-provider rules="email_required" v-slot="{ errors }">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  autocomplete="email"
                  v-model="platformUser.email"
                  required
                  :disabled="userLogin.loading"
                  :class="{
                    'border-red-400': errors.length > 0,
                  }"
                  class="spartan bg-white border-gray-300 border-2 border-blue-dark spartan text-base appearance-none block w-full px-3 py-2 placeholder-gray-400 focus:outline-none sm:text-sm"
                />
                <span class="text-red-500 spartan">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>

          <div>
            <label
              for="password"
              style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
              class="block text-sm font-medium "
            >
              Password
            </label>
            <div class="mt-1">
              <validation-provider rules="required" v-slot="{ errors }">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  autocomplete="current-password"
                  v-model="platformUser.password"
                  :class="{
                    'border-red-400': errors.length > 0,
                  }"
                  required
                  :disabled="userLogin.loading"
                  class="spartan border-gray-300 border-2 border-blue-dark bg-white appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                />
                <span class="text-red-500 spartan">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>

          <div class="text-sm mt-2 flex ">
            <router-link
              :to="'/forgotpassword'"
              class="ml-auto font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </router-link>
          </div>

          <div>
            <button
              type="submit"
              style="background-color: #4691A6;"
              :class="(invalid || userLogin.loading) && 'opacity-25'"
              :disabled="invalid || userLogin.loading"
              class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
              <i
                class="ml-px fa fa-spinner fa-spin"
                v-if="userLogin.loading"
              ></i>
            </button>
          </div>
        </validation-observer>

        <div>
          <div
            style="font-family: 'Spartan', sans-serif;
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 100%;
                text-align: center;
                color: #797979;
                margin-bottom: 32px;
                margin-top: 35px;
                "
          >
            <span>or continue with</span>
          </div>
        </div>

        <div>
          <form :action="loginUrl + '/google/oauth'" method="POST">
            <button
              type="submit"
              :disabled="userLogin.loading"
              style="background-color: #FF3D00; margin-bottom: 20px;"
              class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Google
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApiResource from "@/components/core/ApiResource";
import LoginService from "../login/service/LoginService";
import { Log, Util, Web } from "@/components/util";
import ErrorCode from "@/components/util/ErrorCode";
import UserLoginToken from "./core/UserLoginToken";
import BaseVue from "@/components/BaseVue";

// import LoginComponent from "./LoginComponent";

@Component({
  //   components: {
  //     LoginComponent,
  //   },
  name: "Login",
})
export default class Login extends BaseVue {
  private userLogin: ApiResource = ApiResource.create();

  private loginUrl: string | undefined = process.env.VUE_APP_BASE_URL;

  private platformUser: any = {
    email: "",
    password: "",
    secret: "",
  };

  public mounted() {
    /**
     * check presence of URL parameters.
     * if present:
     *   * decrypt
     *   * call endpoint to login and fetch access token and refresh token
     *   * store accesstoken in local storage
     *   * navigate to next page
     * if not present:
     *      check presence of local accesstoken.
     *   *   if present, validate token
     *   *          if valid, enter next page
     *   *          else show login page
     *   *   else:
     *          show login page
     *
     */

    // if (this.isLoginFailureURLParamsSet()) {
    //   this.handleLoginFailureURLParams();
    // } else if (this.isLoginSuccessURLParamsSet()) {
    //   this.handleLoginSuccessURLParams();
    // } else {
    //   Log.info("URL params not set");
    // }

    if (this.isLoginFailureURLParamsSet()) {
      this.handleLoginFailureURLParams();
    } else if (this.isLoginSuccessURLParamsSet()) {
      this.handleLoginSuccessURLParams();
    } else {
      Log.info("URL params not set");
    }
  }

  private isLoginFailureURLParamsSet(): boolean {
    const query = this.$route.query;

    const error = query.err as string;

    return Util.isValidString(error);
  }

  private handleLoginFailureURLParams() {
    const query = this.$route.query;
    const error = query.err as string;
    this.userLogin.error = ErrorCode.map.get(error) || "";
  }

  private isLoginSuccessURLParamsSet(): boolean {
    const query = this.$route.query;

    const id = query.i as string;
    const key = query.tn as string;
    const secret = query.ss as string;

    return (
      Util.isValidString(id) &&
      Util.isValidString(key) &&
      Util.isValidString(secret)
    );
  }

  private handleLoginSuccessURLParams() {
    const userToken = this.getURLParams();

    this.platformUser.email = atob(decodeURIComponent(userToken.username));
    this.platformUser.password = atob(decodeURIComponent(userToken.key));
    this.platformUser.secret = atob(decodeURIComponent(userToken.secret));

    Log.info(`U: ${this.platformUser.email}, SS: ${this.platformUser.secret}`);
    this.doCredentialVerification();
  }

  private getURLParams(): UserLoginToken {
    const query = this.$route.query;

    return new UserLoginToken(
      query.i as string,
      query.tn as string,
      query.ss as string
    );
  }

  private doCredentialVerification() {
    this.userLogin.loading = true;
    this.userLogin.error = "";

    LoginService.doLogin(
      {
        username: this.platformUser.email,
        password: this.platformUser.password,
        secret: this.platformUser.secret,
      },

      (response: any) => {
        this.userLogin.loading = false;
        LoginService.handleSuccessfulLogin(response, this);
      },

      (error: any) => {
        this.userLogin.loading = false;
        this.extractLoginError(error);
        Log.error("Logged Error: " + JSON.stringify(error));
        Util.handleGlobalAlert(true, "failed", JSON.stringify(error.message));
      }
    );
  }

  private doLogin() {
    this.userLogin.loading = true;
    this.userLogin.error = "";

    LoginService.doLogin(
      {
        username: this.platformUser.email,
        password: this.platformUser.password,
      },

      (response: any) => {
        this.userLogin.loading = false;
        Log.info("Logged In: " + JSON.stringify(response));
        LoginService.handleSuccessfulLogin(response, this);
      },

      (error: any) => {
        this.userLogin.loading = false;
        this.extractLoginError(error);
        Log.error("Logged Error: " + JSON.stringify(error));
        Util.handleGlobalAlert(true, "failed", this.userLogin.error);
      }
    );
  }

  private extractLoginError(error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        this.userLogin.error = "Invalid Username / Password";
        return;
      } else if (error.response.status === 0) {
        this.userLogin.error = "Cannot Reach Server";
        return;
      }
    }

    this.userLogin.error = "Unknown Error Occurred";
  }
}
</script>

<style scoped>
.signupHeader {
  position: fixed;
  width: 100%;
  height: 84px;
  left: 0px;
  top: 0px;
  /* background-color: #ffffff; */
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
  z-index: 1;
}

.customButton {
  background: #4691a6;
  border-radius: 8px;
  height: 40px;
}

.signupLogo {
  position: relative;
  width: 175px;
  height: 40px;
  /* left: 10%;
  top: 22px; */

  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 100%;

  letter-spacing: -0.14em;

  color: #4691a6;
}

a {
  height: 14px;
  /* margin: auto 0; */

  color: #767676;
}

.spartan {
  font-family: "Spartan", sans-serif;
}

.menuIcon {
  display: none;
  width: 24px;
  height: 24px;
  color: #4691a6;
}

.signupMain {
  position: relative;

  /* width: 520px; */
  /* height: 720px; */
  /* left: 460px; */
  /* margin: 0 auto 0; */
  /* top: 84px; */
  border: 2px solid #2c5662;
  /* box-sizing: border-box; */
  border-radius: 8px;
  /* padding: 0 60px; */
  /* display: flex; */
  /* align-items: center;
  flex-direction: column; */
  /* z-index: -1; */
}

@media only screen and (max-width: 640px) {
  .signupMain {
    border: none;
    padding-top: 0;
    padding-left: 5px;
    padding-right: 5px;
    --tw-bg-opacity: 1;
    background-color: rgba(249, 250, 251, var(--tw-bg-opacity)) !important;
  }

  .signupMainOuterDiv {
    margin-top: 0;
  }

  .mainHeaderDiv {
    margin-bottom: 35px !important;
  }
}

@media only screen and (max-height: 700px) {
  .smHeight {
    margin-top: 26px;
  }
}

.anchorDIv {
  width: 60%;
  display: flex;
  justify-content: flex-end;
}

@media only screen and (max-width: 900px) {
  .anchorDIv {
    display: none;
  }
  .innerHeaderDiv {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .signupLogo {
    display: none;
  }

  .menuIcon {
    display: flex;
  }
}

.mainHeader {
  position: relative;
  /* width: 268px; */
  /* height: 24px; */
  /* left: 583px; */
  /* margin: 0 auto 0; */
  /* top: 49px; */
  /* margin-bottom: 40px; */
  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  /* color: #2c5662; */
}

.mainHeaderDiv {
  margin-bottom: 20px;
}

.inputDiv {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 40px;
  width: 100%;
  margin-bottom: 24px;
}

.marginTop20 {
  margin-top: 20px;
}

input {
  position: relative;
  width: 100%;
  height: 48px;
  /* left: 520px; */
  /* top: 245px; */

  box-sizing: border-box;
  border-radius: 8px;
  padding: 0 24px;
}

.checkbox {
  width: 14px;
  height: 14px;
  /* left: 520px;
  top: 521px; */

  background: #595959;
  border: 2px solid #e1e1e1;
  box-sizing: border-box;
  border-radius: 2px;
  margin-right: 8px;
}

button {
  width: 100%;
  height: 48px;
  /* left: 520px;
top: 559px; */
  border: none;
  border-radius: 8px;
}

.buttonText {
  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  text-align: center;

  color: #ffffff;
}

::placeholder {
  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #797979;
}
</style>

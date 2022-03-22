<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll">
    <div
      class="signupMainOuterDiv relative top-4 mx-auto sm:w-full max-w-sm sm:max-w-md mb-12 mt-12"
    >
      <div class="signupMain bg-white py-8 px-10  sm:px-10 ">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv">
          <h2 class="mt-3 text-center mainHeader spartan">
            Signup to Socialotto
          </h2>
        </div>

        <validation-observer
          ref="observer"
          tag="form"
          role="form"
          v-slot="{ invalid }"
          class="space-y-6"
          @submit.prevent="handleSignup"
          novalidate
        >
          <div>
            <label
              for="name"
              style="font-family: 'Spartan', sans-serif;
              font-style: normal;
              font-weight: normal;
              font-size: 12px;
              line-height: 100%;
              color: #797979;"
              class="block text-sm font-medium "
            >
              Name
            </label>
            <div class="mt-1">
              <validation-provider rules="required" v-slot="{ errors }">
                <input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="name"
                  autocomplete="current-name"
                  v-model="platformUser.name"
                  :class="{
                    'border-red-400': errors.length > 0,
                  }"
                  required
                  :disabled="userSignup.loading || userLogin.loading"
                  class="border-gray-300 border-2 border-blue-dark appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                />
                <span class="text-red-500 spartan">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>

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
                  :disabled="userSignup.loading || userLogin.loading"
                  :class="{
                    'border-red-400': errors.length > 0,
                  }"
                  class="border-gray-300 border-2 border-blue-dark appearance-none block w-full px-3 py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
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
              <validation-provider
                name="confirm"
                mode="aggressive"
                rules="required|min:6"
                v-slot="{ errors }"
              >
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="(at least 6 characters)"
                  autocomplete="current-password"
                  v-model="platformUser.password"
                  :class="{
                    'border-red-400': errors.length > 0,
                  }"
                  required
                  :disabled="userSignup.loading || userLogin.loading"
                  class="border-gray-300 border-2 border-blue-dark appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
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
              Confirm password
            </label>
            <div class="mt-1">
              <validation-provider
                mode="aggressive"
                rules="required|password:@confirm"
                v-slot="{ errors }"
              >
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="confirm password"
                  autocomplete="current-password"
                  v-model="platformUser.confirmPassword"
                  :class="{
                    'border-red-400': errors.length > 0,
                  }"
                  required
                  :disabled="userSignup.loading || userLogin.loading"
                  class="border-gray-300 border-2 border-blue-dark appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                />
                <span class="text-red-500 spartan">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-end">
              <input
                id="terms"
                name="terms"
                value="true"
                v-model="agree"
                type="checkbox"
                class="checkbox"
              />
              <label
                for="agree"
                style="font-family: 'Spartan', sans-serif;
                  font-style: normal;
                  font-weight: normal;
                  font-size: 14px;
                  line-height: 100%;
                  text-align: center;
                  color: #797979;"
                class="ml-2 mb-0 block"
                :disabled="userSignup.loading || userLogin.loading"
              >
                I agree to the
                <span style="font-weight: 600;">terms of service</span>
              </label>
            </div>

            <!-- <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div> -->
          </div>

          <div>
            <button
              type="submit"
              style="background-color: #4691A6;"
              :class="
                (invalid ||
                  userSignup.loading ||
                  !passwordConfirmed ||
                  userLogin.loading ||
                  !agree) &&
                  'opacity-25'
              "
              :disabled="
                invalid ||
                  userSignup.loading ||
                  !passwordConfirmed ||
                  userLogin.loading ||
                  !agree
              "
              class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
              <i
                class="ml-px fa fa-spinner fa-spin"
                v-if="userSignup.loading || userLogin.loading"
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
              :disabled="userSignup.loading || userLogin.loading"
              style="background-color: #FF3D00; margin-bottom: 20px;"
              class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Google
            </button>
          </form>
        </div>

        <!-- <div>
          <button
            :disabled="userSignup.loading || userLogin.loading"
            style="background-color: #3B5998;"
            class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Facebook
          </button>
        </div> -->
      </div>
    </div>
  </div>
  <!-- <SignupComponent /> -->
</template>

<script lang="ts">
import { Log, Util } from "@/components/util";
import BaseVue from "@/components/BaseVue";
import { Component } from "vue-property-decorator";
import ApiResource from "@/components/core/ApiResource";
import SignupService from "./service/SignupService";
import LoginService from "../login/service/LoginService";
// import store from "@/store";
// import UserAuthContext from "@/components/auth/UserAuthContext";

@Component({
  name: "Signup",
})
export default class Signup extends BaseVue {
  private platformUser: any = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  private userSignup: ApiResource = ApiResource.create();

  private agree: boolean = false;

  private userLogin: ApiResource = ApiResource.create();

  // private pageName: string = String(this.$route.name);

  // mounted() {
  //   Log.info("name of route: " + String(this.$route.name));
  // }

  public loginUrl: string | undefined = process.env.VUE_APP_BASE_URL;

  public handleSignup() {
    const self = this;
    Log.info(this.platformUser.name);

    self.userSignup.error = "";
    self.userSignup.loading = true;

    SignupService.signupPlatformUser(
      {
        name: self.platformUser.name,
        email: self.platformUser.email,
        password: self.platformUser.password,
      },

      (response: any) => {
        self.userSignup.loading = false;
        Log.info("Signup was successful");
        self.userLogin.loading = false;

        // TODO login
        //  if response.status is 201 then loginService function

        LoginService.doLogin(
          {
            username: self.platformUser.email,
            password: self.platformUser.password,
          },
          (res: any) => {
            self.userLogin.loading = false;
            LoginService.handleSuccessfulLogin(res, this);
          },
          (error: any) => {
            self.userLogin.loading = false;
            self.userLogin.error = Util.extractError(error);
          }
        );
      },

      (error: any) => {
        self.userSignup.loading = false;
        self.userSignup.error = Util.extractError(error);
        Util.handleGlobalAlert(true, "failed", self.userSignup.error);
      }
    );
  }

  public get passwordConfirmed(): boolean {
    return this.platformUser.password === this.platformUser.confirmPassword;
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

/* .spartan {
  font-family: "Spartan", sans-serif;
} */

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
    /* --tw-bg-opacity: 1; */
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

  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  color: #2c5662;
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
/* position: relative;
    top: 40px;
    left: 0px; */
</style>

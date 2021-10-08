<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 "
  >
    <div class="signupHeader z-10 bg-gray-50 py-auto">
      <div
        class="mx-auto flex flex-row justify-between max-w-screen-xl h-full sm:w-11/12"
      >
        <span class="signupLogo my-auto">Socialotto</span>

        <div
          class="spartan flex my-auto relative right-0 flex justify-between"
          style="height: 40px; width: 552px;"
        >
          <a
            class="whitespace-nowrap inline-flex items-center justify-center"
            href=""
            >About Socialotto</a
          >
          <a
            class="whitespace-nowrap inline-flex items-center justify-center"
            href=""
            >Sign in</a
          >
          <a
            class="whitespace-nowrap inline-flex items-center justify-center"
            href=""
            >Sign up</a
          >
          <div
            class="customButton whitespace-nowrap inline-flex items-center justify-center px-4 py-2 text-white"
          >
            Support a campaign
          </div>
        </div>
      </div>
    </div>

    <div class="relative top-20 sm:mx-auto sm:w-full sm:max-w-md ">
      <div class="signupMain bg-white py-8 px-20  sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv">
          <h2 class="mt-3 text-center mainHeader">
            Signup to socialotto
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
              <validation-provider rules="required" v-slot="{ invalid }">
                <input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="name"
                  autocomplete="current-name"
                  v-model="platformUser.name"
                  v-bind:class="{ 'invalid-field': invalid }"
                  required
                  class="appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                />
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
              <validation-provider rules="email_required" v-slot="{ invalid }">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email"
                  autocomplete="email"
                  v-model="platformUser.email"
                  required
                  v-bind:class="{ 'invalid-field': invalid }"
                  class="appearance-none block w-full px-3 py-2  placeholder-gray-400 focus:outline-none sm:text-sm"
                />
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
              <validation-provider rules="required" v-slot="{ invalid }">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="(at least 6 characters)"
                  autocomplete="current-password"
                  v-model="platformUser.password"
                  v-bind:class="{ 'invalid-field': invalid }"
                  required
                  class="appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                />
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
              <validation-provider rules="required" v-slot="{ invalid }">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  placeholder="confirm password"
                  autocomplete="current-password"
                  v-model="platformUser.confirmPassword"
                  v-bind:class="{ 'invalid-field': invalid }"
                  required
                  class="appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                />
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
                v-if="userSignup.loading"
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
            <span>or one click signup via</span>
          </div>
        </div>

        <div>
          <button
            style="background-color: #FF3D00; margin-bottom: 20px;"
            class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Google
          </button>
        </div>

        <div>
          <button
            style="background-color: #3B5998;"
            class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Facebook
          </button>
        </div>
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
import store from "@/store";
import UserAuthContext from "@/components/auth/UserAuthContext";

@Component({
  name: "Signup",
})
export default class Signup extends BaseVue {
  public platformUser: any = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  private userSignup: ApiResource = ApiResource.create();

  private agree: boolean = false;

  private userLogin: ApiResource = ApiResource.create();

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
        LoginService.doLogin(
          {
            username: self.platformUser.email,
            password: self.platformUser.password,
          },
          (response: any) => {
            self.userLogin.loading = false;
            store.commit("authToken/apiToken", response.headers.authorization);
            this.$router.push({
              path: UserAuthContext.getInstance().homeUrl(),
            });
            Log.info("Logged In: " + JSON.stringify(response));
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
  margin: auto 0;
}

.spartan {
  font-family: "Spartan", sans-serif;
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

  border: 2px solid #2c5662;
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

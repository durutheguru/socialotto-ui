<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll spartan">
    <div
      class="signupMainOuterDiv relative top-4 mx-auto sm:w-full max-w-sm sm:max-w-md mb-12 mt-12"
    >
      <div class="signupMain sm:bg-white py-8 px-10 sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv">
          <div class="flex items-center justify-center mt-4">
            <!-- --------------resetpasswords svg----------- -->
            <ResetPasswordSvg />
          </div>

          <h2 class="my-8 text-center mainHeader">
            Reset Password
          </h2>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv grid  mb-4">
          <span class=" text-center spartan text-sm sm:text-xs  items-center">
            Please enter a new password that you can remember
          </span>
          <span class="mt-1 text-center spartan text-sm sm:text-xs items-center"
            >(minimum of 6 characters)</span
          >
        </div>

        <validation-observer
          ref="observer"
          tag="form"
          role="form"
          v-slot="{ invalid }"
          class="space-y-6"
          @submit.prevent="confirmChange"
          novalidate
        >
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
                name="password"
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
                  :disabled="passwordChange.loading"
                  class="spartan border-gray-300 border-2 border-blue-dark text-base appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
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
                rules="required|password:@password"
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
                  :disabled="passwordChange.loading"
                  class="spartan border-gray-300 border-2 border-blue-dark text-base appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                />
                <span class="text-red-500 spartan">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :class="
                (invalid ||
                  passwordChange.loading ||
                  platformUser.password !== platformUser.confirmPassword) &&
                  'opacity-25'
              "
              :disabled="
                invalid ||
                  passwordChange.loading ||
                  platformUser.password !== platformUser.confirmPassword
              "
              class="buttonText bg-blue-200 w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Confirm Change
              <i
                class="ml-px fa fa-spinner fa-spin"
                v-if="passwordChange.loading"
              ></i>
            </button>
          </div>
        </validation-observer>

        <!-- <div>
        <div
          class="buttonText bg-blue-200 w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Confirm Change
        </div>
      </div> -->
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md grid grid-rows-1 mb-4">
        <span class="text-center spartan text-base sm:text-sm items-center">
          I did not make this request.
          <router-link :to="'/login'">report</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Log, Util } from "@/components/util";
import ApiResource from "@/components/core/ApiResource";
import PasswordReset from "./service/PasswordReset";
// import { Util } from "../../components/util";
import LoginService from "../login/service/LoginService";
import BaseVue from "../../components/BaseVue";
import ResetPasswordSvg from "@/components/svg/ResetPassword.vue";

@Component({
  name: "ResetPassword",
  components: {
    ResetPasswordSvg,
  },
})
export default class ResetPassword extends BaseVue {
  private platformUser: any = {
    email: atob(
      String(
        this.$route.query && this.$route.query.e ? this.$route.query.e : ""
      )
    ),
    password: "",
    confirmPassword: "",
  };

  private passwordChange: ApiResource = ApiResource.create();

  private userLogin: ApiResource = ApiResource.create();

  private confirmChange() {
    const self = this;
    if (self.platformUser.password === self.platformUser.confirmPassword) {
      self.passwordChange.loading = true;
      self.passwordChange.error = "";

      PasswordReset.doReset(
        {
          email: self.platformUser.email,
          passwordResetToken: atob(String(this.$route.query.tn)),
          newPassword: self.platformUser.password,
        },

        (response: any) => {
          self.passwordChange.loading = false;
          self.userLogin.loading = true;
          self.userLogin.error = "";

          LoginService.doLogin(
            {
              username: self.platformUser.email,
              password: self.platformUser.password,
            },

            (res: any) => {
              self.userLogin.loading = false;
              Log.info("Logged In: " + JSON.stringify(res));
              LoginService.handleSuccessfulLogin(res, this);
              Util.handleGlobalAlert(true, "success", "Welcome!");
            },

            (error: any) => {
              self.userLogin.loading = false;
              self.userLogin.error = "Unknown Error Occurred";

              Log.error("Logged Error: " + JSON.stringify(error));
              Util.handleGlobalAlert(true, "failed", this.userLogin.error);
            }
          );
        },

        (error: any) => {
          this.passwordChange.loading = false;
          this.passwordChange.error = "an error occured";

          Util.handleGlobalAlert(true, "failed", this.passwordChange.error);
        }
      );
    } else {
      Util.handleGlobalAlert(true, "failed", "Passwords do not match!");
    }
  }
}
</script>

<style scoped>
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

input {
  position: relative;
  width: 100%;
  height: 48px;
  /* left: 520px; */
  /* top: 245px; */

  /* border: 2px solid #2c5662; */
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0 24px;
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

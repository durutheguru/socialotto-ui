<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll spartan">
    <div
      class="signupMainOuterDiv relative top-4 mx-auto sm:w-full max-w-sm sm:max-w-md mb-12 mt-12"
    >
      <div v-if="!emailSent" class="signupMain sm:bg-white py-8 px-10 sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv">
          <div class="flex items-center justify-center mt-4">
            <ForgotPasswordSvg />
          </div>

          <h2 class="my-8 text-center mainHeader spartan">
            Forgot Password
          </h2>
        </div>

        <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv grid  mb-2">
          <span class=" text-center spartan text-sm sm:text-xs  items-center">
            Please enter your email address for us to send your password reset
            link to get you back to your account
          </span>
          <!-- <span class="mt-1 text-center spartan text-sm sm:text-xs items-center"
          >reset link to get you back to your account</span
        > -->
        </div>

        <validation-observer
          ref="observer"
          tag="form"
          role="form"
          v-slot="{ invalid }"
          class="space-y-6 sm:mx-auto sm:w-full sm:max-w-md"
          @submit.prevent="sendPassword"
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
                  v-model="userEmail.email"
                  required
                  :disabled="sendUserPassword.loading"
                  :class="{
                    'border-red-400': errors.length > 0,
                  }"
                  class="spartan border-gray-300 border-2 border-blue-dark text-base appearance-none block w-full px-3 py-2  placeholder-gray-400 focus:bg-gray-50 focus:outline-none sm:text-sm"
                />
                <span class="text-red-500 spartan">{{ errors[0] }}</span>
              </validation-provider>
            </div>
          </div>

          <div>
            <button
              type="submit"
              style="background-color: #4691A6;"
              :class="invalid && 'opacity-25'"
              :disabled="invalid"
              class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Password Reset Link
              <i
                class="ml-px fa fa-spinner fa-spin"
                v-if="sendUserPassword.loading"
              ></i>
            </button>
          </div>
        </validation-observer>
        <div
          class="mt-4 sm:mx-auto sm:w-full sm:max-w-md grid grid-rows-1 mb-4"
        >
          <span class="text-center spartan text-base sm:text-sm items-center">
            I remember my password,
            <router-link :to="'/login'">take me back to login</router-link>
          </span>
        </div>
      </div>

      <YouGotMail v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApiResource from "@/components/core/ApiResource";
import EmailService from "../../components/mail/Mail";
import { Log, Util } from "../../components/util";
import YouGotMail from "./YouGotMail.vue";
import ForgotPasswordSvg from "@/components/svg/ForgotPasswordSvg.vue";

@Component({
  name: "Forgot_Password",
  components: {
    YouGotMail,
    ForgotPasswordSvg,
  },
})
export default class ForgotPassword extends Vue {
  private sendUserPassword: ApiResource = ApiResource.create();

  private userEmail: any = {
    email: "",
  };

  private emailSent = false;

  private sendPassword() {
    this.sendUserPassword.loading = true;

    Log.info("userEmail: " + this.userEmail);

    EmailService.sendPassword(
      this.userEmail,
      (response: any) => {
        this.sendUserPassword.loading = false;
        this.emailSent = true;
        Util.handleGlobalAlert(true, "success", "Password sent to email");
      },
      (error: any) => {
        this.sendUserPassword.loading = false;
        Util.handleGlobalAlert(true, "failed", Util.extractError(error));
      }
    );
  }
}
</script>

<style scoped>
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
</style>

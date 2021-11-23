<template>
  <div>
    <div class="signupMain sm:bg-white py-8 px-10 sm:px-10">
      <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv">
        <div class="flex items-center justify-center mt-4">
          <!-- ------You got mail svg------- -->
          <YouGotMailSvg />
        </div>

        <h2 class="my-8 text-center mainHeader">
          You've got mail!
        </h2>
      </div>

      <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv grid  mb-4">
        <span class=" text-center spartan text-sm sm:text-xs  items-center">
          An email has been sent to you with a link to reset your password.
          Please make use of this link within 24 hours to regain access to your
          account.
        </span>
        <!-- <span class="mt-1 text-center spartan text-sm sm:text-xs items-center"
          >reset link to get you back to your account</span
        > -->
      </div>

      <div>
        <router-link
          :to="'/login'"
          class="buttonText bg-blue-200 w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Login
        </router-link>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md grid grid-rows-1 mb-4">
      <span class="text-center spartan text-base sm:text-sm items-center">
        I did not make this reauest.
        <router-link :to="'/login'">report</router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import YouGotMailSvg from "@/components/svg/YouGotMailSvg.vue";

@Component({
  name: "GotMail",
  components: {
    YouGotMailSvg,
  },
})
export default class GotMail extends Vue {}
</script>

<style scoped></style>

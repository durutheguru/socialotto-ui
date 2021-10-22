<template>
  <div class="bg-white">
    <div class="max-w-screen-xl mx-auto pt-10">
      <div
        class="mt-4 mb-6 space-y-4 sm:mt-16 sm:space-y-0  sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 sm:gap-6 lg:max-w-4xl lg:mx-auto  xl:max-w-none xl:mx-0 "
      >
        <div class="footerLogo">Socialotto</div>
        <div class="">
          <h1 class="spartan font-bold text-xl text-grey-dark">Company</h1>
          <ul class="spartan text-xs  space-y-3">
            <li>Support a campaign</li>
            <li>Buy a lottery ticket</li>
            <li>Sign in</li>
            <li>Create an account</li>
          </ul>
        </div>

        <div class="">
          <h1 class="spartan font-bold text-xl text-grey-dark">Learn more</h1>
          <ul class="spartan text-xs  space-y-3">
            <li>How socialotto works</li>
            <li>Common questions</li>
            <li>Success stories</li>
            <li>Supported countries</li>
          </ul>
        </div>

        <div class="">
          <h1 class="spartan font-bold text-xl text-grey-dark">Contact</h1>
          <ul class="spartan text-xs space-y-3">
            <li>Request to create a campaign</li>
            <li>Support</li>
            <li>Report a case</li>
            <li>Create an account</li>
          </ul>
        </div>
      </div>

      <div class="py-6 justify-center">
        <div class="flex justify-center">
          <span class="spartan text-xs ">
            © 2021 Socialotto Terms Privacy Legal</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Footer",
})
export default class Footer extends Vue {}
</script>

<style scoped></style>

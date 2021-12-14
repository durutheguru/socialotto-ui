<template>
  <!-- <div class="wrapper "> -->
  <div class="background h-20 signupHeader">
    <div
      class="flex items-center justify-end h-full max-w-screen-xl spartan mx-auto"
    >
      <!-- <div>
          <router-link class="text-white" to="/back-office/lotteries"
            >Back to lottery page</router-link
          >
        </div> -->
      <div>
        <router-link class="text-white" to="/back-office"
          >Dashboard</router-link
        >
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "BackOfficeHeader",
})
export default class BackOfficeHeader extends Vue {}
</script>

<style scoped>
.background {
  background-color: #1d414b;
}
</style>

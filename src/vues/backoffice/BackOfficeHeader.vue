<template>
  <!-- <div class="wrapper "> -->
  <div class="background h-20 px-6">
    <div
      class="flex items-center justify-end h-full max-w-screen-xl spartan mx-auto"
    >
      <div class="flex items-center">
        <router-link class="text-white" to="/back-office"
          >Dashboard</router-link
        >
      </div>

      <div @click="openLogoutModal" class="ml-12 cursor-pointer">
        <svg
          class="h-6 w-6"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.71 3.56641C11.444 4.3007 11.9439 5.23616 12.1463 6.25452C12.3488 7.27287 12.2447 8.32838 11.8473 9.2876C11.4499 10.2468 10.777 11.0666 9.91364 11.6434C9.05032 12.2202 8.03535 12.5281 6.99707 12.5281C5.95879 12.5281 4.94383 12.2202 4.08051 11.6434C3.21719 11.0666 2.54428 10.2468 2.14687 9.2876C1.74946 8.32838 1.64539 7.27287 1.84782 6.25452C2.05026 5.23616 2.5501 4.3007 3.28416 3.56641"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 1.56641V7.39974"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index";

@Component({
  name: "BackOfficeHeader",
})
export default class BackOfficeHeader extends Vue {
  private openLogoutModal() {
    store.commit("setOpenLogout", true);
  }
}
</script>

<style scoped>
.background {
  background-color: #1d414b;
}
</style>

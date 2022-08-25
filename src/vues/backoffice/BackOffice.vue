<template>
  <div class="h-full w-full flex flex-col">
    <div
      style=" background-color: #e5f2f5;"
      class="w-full shadow-md showBackofficeNav px-6 py-4"
    >
      <button
        style="    border: 0.0625rem solid rgb(167 211 237) !important;"
        @click="toggle"
        class=" h-8 w-16 flex justify-center items-center rounded-sm"
      >
        <svg
          style="color: rgb(167 211 237)"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 "
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div class="h-full w-full flex ">
      <div
        style="min-width: 16rem;"
        class="backOfficeSidebar   overflow-y-auto overflow-x-hidden showBackofficeSidebar h-full"
      >
        <BackofficeSidebar />
      </div>
      <transition name="slideOut">
        <div
          v-if="open"
          class="backOfficeSidebar overflow-y-auto overflow-x-hidden showBackofficeNav fixed h-full z-20"
        >
          <MobileSideBar @close="close" />
        </div>
      </transition>
      <div class="w-full">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BackofficeSidebar from "./BackOfficeSidebar.vue";
// import BackOfficeHome from './BackOfficeHome';
import MobileSideBar from "./MobileSideBar.vue";
import { Log } from "@/components/util";

@Component({
  name: "BackOffice",
  components: {
    // BackOfficeHome,
    BackofficeSidebar,
    MobileSideBar,
  },
})
export default class BackOffice extends Vue {
  private open = false;
  private toggle() {
    this.open = !this.open;
  }

  private close() {
    this.open = false;
    Log.info("clicked route");
  }
}
</script>

<style lang="scss" src="@/sass/main.scss"></style>

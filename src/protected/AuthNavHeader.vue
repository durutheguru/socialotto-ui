<template>
  <div class="wrapper">
    <!-- <div class=" bg-blue-50 flex  justify-center  sm:px-6 lg:px-8 "> -->
    <div class="signupHeader navheaderPadding z-10 bg-blue-50 ">
      <div
        class="px-6 md:px-0 innerHeaderDiv mx-auto flex flex-row justify-between max-w-screen-xl h-full sm:w-11/12"
      >
        <span class="signupLogo my-auto">Socialotto</span>
        <div class="menuIcon my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </div>

        <div
          class=" spartan flex my-auto relative right-0 flex justify-end"
          style="height: 40px; width: 552px;"
        >
          <div class=" anchorDIv">
            <router-link
              class="spartan mr-6 my-auto items-center lg:flex whitespace-nowrap inline-flex items-center justify-center"
              :to="'/about'"
              >About Socialotto</router-link
            >
            <router-link
              v-if="pageName !== 'Login'"
              class="spartan mr-6 my-auto items-center lg:flex whitespace-nowrap inline-flex items-center justify-center"
              :to="'/login'"
              >Sign in
            </router-link>
            <router-link
              v-if="pageName !== 'Signup'"
              class="spartan my-auto mr-6 items-center lg:flex  whitespace-nowrap inline-flex items-center justify-center"
              :to="'/signup'"
              >Sign up</router-link
            >
          </div>
          <div
            class="customButton whitespace-nowrap inline-flex items-center justify-center px-4 py-2 text-white"
          >
            Support a campaign
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!-- <hamburger-menu /> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
// import { Log, Util } from "@/components/util";
// import { computed } from "vue";
import BaseVue from "@/components/BaseVue";
import { Component } from "vue-property-decorator";
// import ApiResource from "@/components/core/ApiResource";
// import store from "../../store/index";
// import HamburgerMenu from "./HamburgerMenu.vue";
// import SignupService from "./service/SignupService";
// import LoginService from "../login/service/LoginService";
// import store from "@/store";
// import UserAuthContext from "@/components/auth/UserAuthContext";

@Component({
  name: "AuthNavHeader",
  components: {
    // HamburgerMenu,
  },
})
export default class AuthNavHeader extends BaseVue {
  //   private get pageName(): string {
  //     return String(this.$route.name);
  //   }
  //   private mounted() {
  //     Log.info("name of route: " + String(this.$route.name));
  //   }
  //   private dropMenu() {
  //     store.commit("setDropMenu", true);
  //     // Log.info("dropMenu: " + );
  //   }
}
</script>

<style scoped></style>

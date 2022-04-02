<template>
  <div class="wrapper">
    <!-- <div class=" bg-blue-50 flex  justify-center  sm:px-6 lg:px-8 "> -->
    <div
      v-if="!isLoggedIn"
      class="signupHeader navheaderPadding z-10 bg-blue-50 "
    >
      <div
        class="px-6 md:px-0 innerHeaderDiv mx-auto flex flex-row justify-between max-w-screen-xl h-full sm:w-11/12"
      >
        <router-link
          class="signupLogo cursor-pointer my-auto no-underline"
          :to="'/'"
        >
          <span class="">Socialotto</span>
        </router-link>
        <div class="menuIcon my-auto" @click="dropMenu">
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
          <div class="spartan anchorDIv">
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
          <button
            @click="$router.push('/home')"
            class="cursor-pointer spartan customButton whitespace-nowrap inline-flex items-center justify-center px-4 py-2 text-white"
          >
            Support a campaign
          </button>
        </div>
      </div>
    </div>
    <AuthNavHeader v-else />
    <!-- </div> -->
    <hamburger-menu />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Log, Util } from "@/components/util";
// import { computed } from "vue";
import BaseVue from "@/components/BaseVue";
import { Component } from "vue-property-decorator";
import AuthNavHeader from "@/protected/AuthNavHeader.vue";
import ApiResource from "@/components/core/ApiResource";
import store from "../../store/index";
import HamburgerMenu from "./HamburgerMenu.vue";
// import SignupService from "./service/SignupService";
// import LoginService from "../login/service/LoginService";
// import store from "@/store";
// import UserAuthContext from "@/components/auth/UserAuthContext";

@Component({
  name: "NavHeader",
  components: {
    HamburgerMenu,
    AuthNavHeader,
  },
})
export default class NavHeader extends BaseVue {
  private get pageName(): string {
    return String(this.$route.name);
  }

  private get isLoggedIn(): boolean {
    return store.getters["authToken/loggedIn"];
  }

  private mounted() {
    Log.info("name of route: " + String(this.$route.name));
  }

  private dropMenu() {
    store.commit("setDropMenu", true);
    // Log.info("dropMenu: " + );
  }
}
</script>

<style scoped>
.signupHeader {
  /* padding-right: 20px; */
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

.anchorDIv {
  width: 60%;
  display: flex;
  justify-content: flex-end;
}

@media only screen and (max-width: 768px) {
  .anchorDIv {
    display: none;
  }
  /* .innerHeaderDiv { */
  /* padding-left: 2.5rem;
    padding-right: 2.5rem; */
  /* padding-left: 5px;
    padding-right: 5px; */
  /* } */

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

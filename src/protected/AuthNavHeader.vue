<template>
  <div class="wrapper">
    <!-- <div class=" bg-blue-50 flex  justify-center  sm:px-6 lg:px-8 "> -->
    <BackOfficeHeader v-if="isBackOfficeUser" />
    <div v-else class="signupHeader navheaderPadding z-10 bg-blue-50 ">
      <div
        class="px-6 md:px-0 innerHeaderDiv mx-auto flex flex-row justify-between max-w-screen-xl h-full sm:w-11/12"
      >
        <router-link
          class="my-auto focus:outline-none no-underline"
          :to="'/home'"
        >
          <span class="signupLogo ">Socialotto</span>
        </router-link>
        <div class="menuIcon my-auto " @click="dropAuthMenu">
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
          <div class=" anchorDIv" style="width: 60%; ">
            <!-- <ExpMenu /> -->
            <!-- -----Notifications----- -->
            <div
              @click="ToggleNotifications"
              class="relative spartan mr-6 my-auto items-center lg:flex whitespace-nowrap inline-flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 m-1 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <transition name="fade" id="noticeMenu">
                <Notificatons v-if="noticeMenu" />
              </transition>
            </div>

            <!-- -----Recent activities----- -->
            <div
              @click="ToggleRecentActivities"
              class="relative spartan mr-6 my-auto items-center lg:flex whitespace-nowrap inline-flex items-center justify-center"
            >
              <svg
                class="m-1.5 cursor-pointer"
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 10H17L14 19L8 1L5 10H1"
                  stroke="#767676"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <transition name="fade" id="recentsMenu">
                <RecentActivities v-if="recentsMenu" />
              </transition>
            </div>

            <!-- -----Avatar menu----- -->
            <div
              @click="dropUserMenu"
              class="dropdown spartan my-auto mr-6 items-center lg:flex  whitespace-nowrap inline-flex items-center justify-center"
            >
              <button class="menuAnchor h-full" data-dropdown-button>
                <img
                  class="inline-block h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </button>
              <!-- <input
                type="checkbox"
                id="profile-menu-label"
                class="menuAnchor h-6 w-6 hidden"
                data-dropdown-button
                @click="dropUserMenu"
              />

              <label class="profile-menu-label" for="profile-menu-label">
                <button class="profile-menu-button">
                  <img
                    class="inline-block h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </label> -->

              <!-- <div
                @click="dropUserMenu"
                class="fixed inset-0 h-full w-full z-10"
              ></div> -->
              <transition name="fade">
                <AvatarMenu v-if="userMenu" />
              </transition>
            </div>
          </div>
          <div
            class=" customButton whitespace-nowrap inline-flex items-center justify-center px-4 py-2 text-white"
          >
            <span>Support a campaign</span>
          </div>
        </div>
      </div>
    </div>

    <!-- </div> -->
    <auth-hamburger-menu />
    <router-view @click="clearDropDowns"></router-view>
    <donate-modal />
  </div>
</template>

<script lang="ts">
import { Log, Util } from "@/components/util";
// import { computed } from "vue";
import BaseVue from "@/components/BaseVue";
import { Component } from "vue-property-decorator";
import AvatarMenu from "./AvatarMenu.vue";
import Notificatons from "./Notifications.vue";
import RecentActivities from "./RecentActivities.vue";
import DonateModal from "@/vues/campaign/vues/campaignDetails/DonateModal.vue";
// import ExpMenu from "./expMenu.vue";
// import ApiResource from "@/components/core/ApiResource";
import store from "../store/index";
import AuthHamburgerMenu from "./AuthHamburgerMenu.vue";
import BackOfficeHeader from "@/vues/backoffice/BackOfficeHeader.vue";

@Component({
  name: "AuthNavHeader",
  components: {
    AuthHamburgerMenu,
    AvatarMenu,
    Notificatons,
    RecentActivities,
    DonateModal,
    BackOfficeHeader,

    // ExpMenu,
  },
})
export default class AuthNavHeader extends BaseVue {
  private created() {
    store.commit("setUserMenu", false);
    store.commit("setIsNoticeMenu", false);
    store.commit("setIsRecentsMenu", false);
  }

  private get userMenu(): boolean {
    return store.state.userMenu;
  }

  private get noticeMenu(): boolean {
    return store.state.isNoticeMenu;
  }

  // private hide () {
  //   store.commit("setIsNoticeMenu", false);
  // }

  private get recentsMenu(): boolean {
    return store.state.isRecentsMenu;
  }

  private ToggleNotifications() {
    // this.notifications = !this.notifications;
    store.commit("setIsNoticeMenu", !this.noticeMenu);
  }

  private ToggleRecentActivities() {
    // this.recentActivities = !this.recentActivities;
    store.commit("setIsRecentsMenu", !this.recentsMenu);
  }

  private dropAuthMenu() {
    store.commit("setDropAuthMenu", true);
    // Log.info("dropMenu: " + );
  }
  private dropUserMenu() {
    store.commit("setUserMenu", !this.userMenu);
    // Log.info("dropMenu: " + );
  }

  private clearDropDowns() {
    store.commit("setUserMenu", false);
    // Log.info("dropMenu: " + );
  }
}
</script>

<style scoped></style>

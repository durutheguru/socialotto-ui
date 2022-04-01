<template>
  <div
    class="dd-menu z-30 right-0 top-0 object-right-top  mt-10 w-48 max-w-xs sm:px-0 "
  >
    <div class="pointy ml-auto"></div>

    <div class="z-30 dropDownMenu">
      <div class="overflow-hidden pt-2">
        <div class="z-20 relative grid gap-0 sm:gap-0 ">
          <router-link
            to="/user"
            class=" p-3 block space-y-1 hover:bg-gray-50 transition ease-in-out duration-150"
          >
            <p
              class=" mb-0 spartan text-base leading-6 font-medium text-gray-900"
            >
              My Profile
            </p>
          </router-link>
          <router-link
            v-if="canCreateCampaign"
            to="/create_campaign"
            class=" p-3 block space-y-1 hover:bg-gray-50 transition ease-in-out duration-150"
          >
            <p
              class=" mb-0 spartan text-base leading-6 font-medium text-gray-900"
            >
              Create Campaign
            </p>
          </router-link>
          <a
            href="#"
            class=" p-3 block space-y-1 hover:bg-gray-50 transition ease-in-out duration-150"
          >
            <p
              class=" mb-0 spartan text-base leading-6 font-medium text-gray-900"
            >
              About Socialotto
            </p>
          </a>
          <a
            href="#"
            class=" p-3 block space-y-1 hover:bg-gray-50 transition ease-in-out duration-150"
          >
            <p
              class=" mb-0 spartan text-base leading-6 font-medium text-gray-900"
            >
              Contact us
            </p>
          </a>
          <div
            @click="logout"
            class=" p-3 block space-y-1 hover:bg-gray-50 transition ease-in-out duration-150"
          >
            <p
              class=" mb-0 spartan text-base leading-6 fs-14 font-medium text-gray-900"
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Log, Util, Security } from "@/components/util";
import LoginService from "@/vues/login/service/LoginService";
import store from "../store/index";

@Component({
  name: "AvatarMenu",
  props: {
    //   ref: ref
  },
})
export default class AvatarMenu extends Vue {
  // $refs!: {
  //   avatarMenu: HTMLFormElement;
  // };
  // private avatarMenu: any = document.getElementById("avatarMenu");

  private canCreateCampaign = Security.hasAuthorization("CAN_CREATE_CAMPAIGN");

  private get isLoggedIn() {
    return store.getters["authToken/loggedIn"];
  }

  private mounted() {
    // Util.clickOutside("avatarMenu", "dropdown", "setUserMenu");
  }

  public logout() {
    // store.commit("resetState");
    store.commit("authToken/logout");
    this.$router.push("/");
    // LoginService.doLogout();
    // Log.info(this.isLoggedIn);
    // window.localStorage.clear();
    // Log.info(this.isLoggedIn);
  }
}
</script>

<style scoped></style>

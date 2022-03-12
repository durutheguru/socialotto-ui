<template>
  <div class="spartan divContainer overflow-auto lg:overflow-y-scroll">
    <div class="  max-w-screen-xl mx-auto pt-3 md:pt-20 sm:w-11/12">
      <div class="flex flex-col pt-10 items-center justify-center w-full">
        <div
          v-if="$apollo.queries.viewUserDetails.loading"
          class="h-full w-full mx-auto mb-10 absoluto rounded-md block"
        >
          <div class="roundLoader opacity-50 mx-auto"></div>
        </div>
        <div v-else class="flex flex-col items-center justify-center">
          <img
            class="inline-block h-24 w-24 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixusername=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />

          <div
            class="mb-6 flex mt-4 flex-col items-center text-black justify-center"
          >
            <h1 class="fw-600  fs-24">
              {{ userQuery.data.name }}
            </h1>
            <span class="fw-400 fs-16">
              {{ userQuery.data.username }}
            </span>
          </div>

          <div>
            <button
              type="submit"
              style="background-color: #4691A6; width: 30rem"
              class="buttonText mb-12 flex justify-center py-3 px-4 border border-transparent br-8 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create A Campaign
            </button>
          </div>
        </div>

        <div class="flex flex-col w-full">
          <div
            class="spartan flex justify-center w-full  border-b border-gray-200"
          >
            <!-- ------------------------- -->
            <div
              @click="changeTo('Profile')"
              class="cursor-pointer h-10 flex flex-col justify-between "
            >
              <div class="h-2"></div>
              <div class="fw-600 fs-14 text-gray-400 px-14">
                <span
                  :class="
                    currentPage === 'Profile'
                      ? 'actv-nav-link-color'
                      : 'text-gray-400'
                  "
                  >Profile</span
                >
              </div>
              <div
                class="h-1  w-full"
                :class="
                  currentPage === 'Profile'
                    ? 'actv-nav-link-bg'
                    : 'bg-transparent'
                "
              ></div>
            </div>
            <!-- ------------------------- -->
            <div
              v-if="hasWalletId"
              @click="changeTo('Wallet')"
              class="cursor-pointer h-10 flex flex-col justify-between "
            >
              <div class="h-2"></div>
              <div class="fw-600 fs-14 text-gray-400 px-14">
                <span
                  :class="
                    currentPage === 'Wallet'
                      ? 'actv-nav-link-color'
                      : 'text-gray-400'
                  "
                  >Wallet</span
                >
              </div>
              <div
                class="h-1  w-full"
                :class="
                  currentPage === 'Wallet'
                    ? 'actv-nav-link-bg'
                    : 'bg-transparent'
                "
              ></div>
            </div>
            <!-- ------------------------- -->
          </div>
          <!-- <router-view></router-view> -->
          <Profile v-if="currentPage === 'Profile'" />

          <Wallet
            v-if="currentPage === 'Wallet' && hasWalletId"
            :userWalletQuery="userWalletQuery"
            :loading="$apollo.queries.viewWalletBalances.loading"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Wallet from "./Wallet.vue";
import Profile from "./Profile.vue";

import { Constants, Log, Util } from "@/components/util";
import store from "@/store/index";
import { viewUserDetails } from "@/services/users/users.query";
import { ApolloError } from "apollo-client";
import { viewWalletBalances } from "@/services/users/users.query";

@Component({
  name: "User",
  components: {
    Wallet,
    Profile,
  },
  apollo: {
    // $client: "anonymousClient",
    viewUserDetails: {
      query: viewUserDetails,
      variables() {
        return {
          userType: this.userQuery.userType,

          username: this.userQuery.username,
        };
      },
      result({ data }) {
        Log.info("Search User Query: " + JSON.stringify(data));

        this.userQuery.data = data?.viewUserDetails;

        Log.info("User Query: " + JSON.stringify(this.userQuery.data));
      },
      error(error: ApolloError) {
        this.userQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.userQuery.error)) {
          this.$apollo.queries.viewUserDetails.refetch();
        }
      },
    },
    viewWalletBalances: {
      query: viewWalletBalances,
      variables() {
        return {
          userType: this.userWalletQuery.userType,
          username: this.userWalletQuery.username,
        };
      },
      result({ data }) {
        Log.info("Search User Wallet's Query: " + JSON.stringify(data));

        this.userWalletQuery.walletBalance = data?.viewWalletBalances;
        this.userWalletQuery.walletId = data.viewWalletBalances[0].walletId;

        Log.info(
          "User Query wallet balance: " +
            JSON.stringify(this.userWalletQuery.walletBalance)
        );
      },
      error(error: ApolloError) {
        this.userWalletQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.userWalletQuery.error)) {
          Log.info("WalletBalance Error" + JSON.stringify(error));
          this.$apollo.queries.viewWalletBalances.refetch();
        }
      },
    },
  },
})
export default class User extends Vue {
  private mounted() {
    Log.info("username: " + this.username);
    Log.info("userType: " + this.userType);
  }

  private currentPage = "Profile";

  private username = store.getters["authToken/username"];
  private userType = store.getters["authToken/authorizations"][0];
  private userQuery: any = {
    username: this.username,
    userType: this.userType,
    data: {},
    error: "",
  };

  private userWalletQuery: any = {
    username: this.username,
    userType: this.userType,
    walletBalance: null,
    walletId: null,
    data: {},
    error: "",
  };

  private changeTo(path: string) {
    this.currentPage = path;
  }

  private get hasWalletId(): boolean {
    return Util.isValidString(this.userWalletQuery.walletId);
  }
}
</script>

<style scoped></style>

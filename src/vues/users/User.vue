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
              @click="changeTo('/profile')"
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
              @click="changeTo('/wallet')"
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
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Constants, Log, Util } from "@/components/util";
import store from "@/store/index";
import { viewUserDetails } from "@/services/users/users.query";
import { ApolloError } from "apollo-client";

@Component({
  name: "User",
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
  },
})
export default class User extends Vue {
  private mounted() {
    Log.info("username: " + this.username);
    Log.info("userType: " + this.userType);
  }

  private get currentPage() {
    return this.$route.name;
  }

  private username = store.getters["authToken/username"];
  private userType = store.getters["authToken/authorizations"][0];
  private userQuery: any = {
    username: this.username,
    userType: this.userType,
    data: {},
    error: "",
  };

  private changeTo(path: string) {
    this.$router.push(path);
  }
}
</script>

<style scoped></style>

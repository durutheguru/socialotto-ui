<template>
  <div
    class="spartan relative right-0 col-span-5 pt-20 px-10 h-screen overflow-y-auto bg-blue-50"
  >
    <h1
      class="flex justify-center sm:justify-start spartan text-3xl font-semibold text-black mb-6 w-9/12"
    >
      User Profile
    </h1>
    <div
      v-if="$apollo.queries.viewUserDetails.loading"
      class="h-full w-full mx-auto  absoluto rounded-md block"
    >
      <div class="roundLoader opacity-50 mx-auto"></div>
    </div>
    <div v-else class="flex flex-col items-center justify-center w-9/12">
      <img
        class="inline-block h-24 w-24 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixusername=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />

      <div
        class="mb-6 flex mt-4 flex-col items-center text-black justify-center"
      >
        <h1 class="fw-600  fs-24">
          {{ userQuery.data.name }} - {{ userQuery.data.userType }}
        </h1>
        <span class="fw-400 fs-16">{{ userQuery.data.username }}</span>
      </div>

      <div class="flex flex-col w-full">
        <div class="spartan flex w-full  border-b border-gray-200">
          <!-- ------------------------- -->
          <div
            @click="changeTo('Authorities')"
            class="cursor-pointer h-16 flex flex-col justify-between "
          >
            <div class="h-2"></div>
            <div class="fw-600 fs-14 text-gray-400 px-6">
              <span
                :class="
                  currentPage === 'Authorities'
                    ? 'nav-link-color'
                    : 'text-gray-400'
                "
                >Authorities</span
              >
            </div>
            <div
              class="h-1 bg-gray-200 w-full"
              :class="{
                'nav-link-bg': currentPage === 'Authorities',
              }"
            ></div>
          </div>
          <!-- ------------------------- -->
          <div
            @click="changeTo('Settlement')"
            class="cursor-pointer h-16  flex flex-col justify-between "
          >
            <div class="h-2"></div>
            <div class="fw-600 fs-14 text-gray-400 px-6">
              <span
                :class="
                  currentPage === 'Settlement'
                    ? 'nav-link-color'
                    : 'text-gray-400'
                "
                >Settlement</span
              >
            </div>
            <div
              class="h-1 bg-gray-200 w-full"
              :class="{ 'nav-link-bg': currentPage === 'Settlement' }"
            ></div>
          </div>
          <!-- ------------------------- -->
        </div>
      </div>
      <UserAuthorities
        @removeAuthority="refetch"
        @authAdded="refetch"
        v-if="currentPage === 'Authorities'"
        :authorities="this.userQuery.data.userAuthorities"
        :username="userQuery.data.username"
        :refResponse="refResponse"
      />
      <UserSettlement
        v-else-if="currentPage === 'Settlement'"
        :username="userQuery.data.username"
        :name="userQuery.data.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import UserProfileNav from "./UserProfileNav.vue";
import UserAuthorities from "./UserAuthorities.vue";
import { ApolloError } from "apollo-client";
import UserSettlement from "./UserSettlement.vue";
import UsersService from "@/services/users/usersService";
import { viewUserDetails } from "@/services/users/users.query";
import { Log, Util } from "@/components/util";

@Component({
  name: "UserDetails",
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

        this.userQuery.data.userAuthorities.map((auth: any) =>
          auth.fileReferences.forEach((ref: any) => this.fileRefs.push(ref))
        );

        this.getRefDetails(this.fileRefs);

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
  components: {
    // UserProfileNav,
    UserAuthorities,
    UserSettlement,
  },
})
export default class UserDetails extends Vue {
  private userDetails = this.$route.params.userDetails.split(":");
  private get username() {
    return window.atob(this.userDetails[0]);
  }

  private fileRefs = [];
  private refResponse = [];
  private get userType() {
    return window.atob(this.userDetails[1]);
  }
  private currentPage = "Authorities";
  private userQuery: any = {
    username: this.username,
    userType: this.userType,
    data: {},
    error: "",
  };
  private changeTo(str: string) {
    this.currentPage = str;
  }

  private getRefDetails(refs: any) {
    const queryString = refs.join("&ref=");
    UsersService.getFileRefs(
      queryString,
      (response) => {
        Log.info(response.data);
        this.refResponse = response.data;
      },
      (error) => {
        Log.info(error);
      }
    );
  }

  // public mounted() {
  //   Log.info("authority" + JSON.stringify(this.authorities));
  // }

  // private authorities = this.userQuery.data.userAuthorities;

  private refetch() {
    this.$apollo.queries.viewUserDetails.refetch();
  }
}
</script>

<style scoped></style>

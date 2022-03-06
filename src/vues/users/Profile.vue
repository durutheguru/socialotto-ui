<template>
  <div class="flex items-center justify-center mt-12 pb-12">
    <div class="grid grid-cols-2 gap-6 w-8/12 mb-20">
      <div class="col-span-2 md:col-span-1">
        <label
          for="name"
          style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
          class="block text-sm font-medium "
        >
          Name
        </label>
        <div class="mt-1">
          <input
            id="name"
            name="name"
            v-model="userQuery.data.name"
            type="text"
            readonly
            class="profileInput w-full h-12 pl-2.5"
          />
        </div>
      </div>
      <!-- --------------- -->
      <div class="col-span-2 md:col-span-1">
        <label
          for="EmailAddress"
          style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
          class="block text-sm font-medium "
        >
          Email Address
        </label>
        <div class="mt-1">
          <input
            id="EmailAddress"
            name="EmailAddress"
            type="text"
            v-model="userQuery.data.username"
            readonly
            class="profileInput w-full h-12 pl-2.5"
          />
        </div>
      </div>
      <!-- ------------ -->
      <!-- <div class="col-span-1">
        <label
          for="TelephoneNumber"
          style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
          class="block text-sm font-medium "
        >
          Telephone Number
        </label>
        <div class="mt-1">
          <input
            id="TelephoneNumber"
            name="TelephoneNumber"
            type="text"
            readonly
            class="profileInput w-full h-12"
          />
        </div>
      </div>
   
      <div class="col-span-1">
        <label
          for="ResidentialAddress"
          style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
          class="block text-sm font-medium "
        >
          Residential Address
        </label>
        <div class="mt-1">
          <input
            id="ResidentialAddress"
            name="ResidentialAddress"
            type="text"
            readonly
            class="profileInput w-full h-12"
          />
        </div>
      </div> -->
      <!-- ------------ -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { viewUserDetails } from "@/services/users/users.query";
import { ApolloError } from "apollo-client";
import { Constants, Log, Util } from "@/components/util";
import store from "@/store/index";

@Component({
  name: "Profile",
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
export default class Profile extends Vue {
  private username = store.getters["authToken/username"];
  private userType = store.getters["authToken/authorizations"][0];
  private userQuery: any = {
    username: this.username,
    userType: this.userType,
    data: {},
    error: "",
  };
}
</script>

<style scoped>
.profileInput {
  border: 2px solid #2c5662;
  box-sizing: border-box;
  border-radius: 8px;
  background: transparent;
}
</style>

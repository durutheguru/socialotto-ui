<template>
  <div
    class="spartan relative right-0 col-span-5 pt-20 px-10 h-screen overflow-y-auto bg-blue-50"
  >
    <h1
      class="flex justify-center sm:justify-start spartan text-3xl font-semibold text-black mb-6"
    >
      Users
    </h1>
    <div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              style="min-height: 700px"
              class=" overflow-hidden border-b border-gray-200 bg-white rounded-md"
            >
              <div
                class=" px-6 w-full bg-white rounded-t-md py-1 flex justify-between"
              >
                <div class="h-20  flex items-center justify-between">
                  <div class="relative h-11 ">
                    <input
                      v-model="usersQuery.key"
                      class="h-full rounded-lg pl-5 w-27rem border border-gray-200"
                      type="text"
                      placeholder="Search"
                    />

                    <div
                      @click="usersQuery.key = ''"
                      class="absolute right-0 top-0 h-full w-8 flex justify-center items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div class="absolute ml-3">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <!-- <div v-if="isApprovalPending">
                    Approval Loading...
                  </div>

                  <div v-if="isDisapprovalPending">
                    Disapproval Loading...
                  </div> -->
                </div>
                <div class="flex items-center">
                  <div
                    style="background-color: #EBEBEB; border-radius: 8px"
                    class="h-11 flex items-center w-36 justify-center spartan fw-400 fs-14 "
                  >
                    <span>Add User</span>
                  </div>
                </div>
              </div>

              <div
                v-if="$apollo.queries.viewAllUsers.loading"
                class="h-full w-full mx-auto  absoluto rounded-md block"
              >
                <div class="roundLoader opacity-50 mx-auto"></div>
              </div>
              <table
                v-else
                class="min-w-full  overflow-y-scroll divide-y divide-gray-200 bg-white"
              >
                <thead class="th-bg ">
                  <tr>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      style="min-width: 12rem; max-width: 12rem; word-wrap: break-word"
                      class="relative text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 "
                    >
                      <div
                        @click="toggleStatusMenu"
                        class="tableHeaderInnerDiv flex cursor-pointer justify-between relative h-full"
                      >
                        <div class="flex flex-col">
                          <span> User Type </span>
                          <span class="mt-1">{{ usersQuery.userType }}</span>
                        </div>
                        <SmallChevronUp v-if="showTypes" />
                        <SmallChevronDown v-else />
                      </div>
                      <div
                        v-if="showTypes"
                        class="absolute bg-white shadow-md rounded-md left-0"
                      >
                        <ul class=" pt-3 rounded-md">
                          <!-- <li
                            class="cursor-pointer px-3 py-3 hover:bg-gray-200"
                            @click="searchStatus(null)"
                          >
                            ALL
                          </li> -->
                          <li
                            v-for="item in Object.keys(userTypes)"
                            :key="item"
                            @click="searchTypes(item)"
                            class="cursor-pointer px-3  py-3 hover:bg-gray-200"
                          >
                            {{ item }}
                          </li>
                        </ul>
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="relative text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 "
                    >
                      <div
                        @click="toggleAuthorities"
                        class="tableHeaderInnerDiv flex cursor-pointer justify-between relative h-full"
                      >
                        <div class="flex flex-col">
                          <span> Authorities</span>
                          <span v-if="usersQuery.authorityId === null"
                            >ALL</span
                          >
                          <span v-else class="mt-1">{{
                            usersQuery.authorityId
                          }}</span>
                        </div>
                        <SmallChevronUp v-if="showAuthorities" />
                        <SmallChevronDown v-else />
                      </div>
                      <div
                        v-if="showAuthorities"
                        class="absolute bg-white shadow-md rounded-md left-0"
                      >
                        <ul class=" pt-3 rounded-md">
                          <li
                            class="cursor-pointer px-3 py-3 hover:bg-gray-200"
                            @click="searchAuthorities(null)"
                          >
                            ALL
                          </li>
                          <li
                            v-for="item in Object.keys(userAuthorities)"
                            :key="item"
                            @click="searchAuthorities(item)"
                            class="cursor-pointer px-3  py-3 hover:bg-gray-200"
                          >
                            {{ item }}
                          </li>
                        </ul>
                      </div>
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Menu</span>
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200 mb-12">
                  <tr
                    class="border border-b"
                    v-for="user in usersQuery.data"
                    :key="user.id"
                  >
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ user.id }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ user.name }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ user.username }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ userTypes[user.userType] }}
                    </td>

                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      <div v-if="user.userAuthorities.length > 0">
                        {{ user.userAuthorities }}
                      </div>
                      <div v-else>
                        <!-- NONE -->
                      </div>
                    </td>

                    <td
                      class="relative px-6 py-3 whitespace-nowrap text-right text-sm font-medium "
                    >
                      <div class="td-elipsis relative">
                        <UsersRowMenu :username="user.username" />
                      </div>
                    </td>
                  </tr>
                  <tr class="h-36 bg-white"></tr>
                </tbody>
              </table>
            </div>
            <div class="px-6 h-16 sm:rounded-b-lg bg-white">
              <div class="px-1 h-full flex justify-between items-center">
                <div>
                  <!-- <p class="my-auto hidden">Showing 1-15 of 300 entries</p> -->
                </div>

                <div class="flex">
                  <div @click="prev" class="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <span class="mx-3.5"> Page {{ usersQuery.page }}</span>
                  <div @click="next" class="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ApolloError } from "apollo-client";
import { viewAllUsers } from "@/services/users/users.query";
import { Log, Util } from "@/components/util";
import SmallChevronUp from "@/components/svg/SmallChevronUp.vue";
import SmallChevronDown from "@/components/svg/SmallChevronDown.vue";
import UsersRowMenu from "./UsersRowMenu.vue";

@Component({
  name: "ManageUsers",
  apollo: {
    // $client: "anonymousClient",
    viewAllUsers: {
      query: viewAllUsers,
      variables() {
        return {
          searchKey: this.usersQuery.key,
          authorityId: this.usersQuery.authorityId,
          page: this.usersQuery.page,
          size: this.usersQuery.size,
          userType: this.usersQuery.userType,
        };
      },
      result({ data }) {
        Log.info("Search Users Query: " + JSON.stringify(data));

        this.usersQuery.data = data.viewAllUsers;
        Log.info("Users Query: " + String(this.usersQuery.data));
      },
      error(error: ApolloError) {
        this.usersQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.usersQuery.error)) {
          this.$apollo.queries.viewAllUsers.refetch();
        }
      },
    },
  },
  components: {
    SmallChevronUp,
    SmallChevronDown,
    UsersRowMenu,
  },
})
export default class ManageUsers extends Vue {
  private usersQuery: any = {
    key: "",
    userType: "PLATFORM_USER",
    page: 0,
    size: 10,
    data: [],
    error: "",
    authorityId: null,
  };

  private showTypes: boolean = false;
  private showAuthorities: boolean = false;

  private userTypes: any = {
    PLATFORM_USER: "Platform",
    REGULATORY_USER: "Regulatory",
    BACK_OFFICE_USER: "Backoffice",
  };

  private userAuthorities: any = {
    CAN_CREATE_LOTTERY: "Lottery Creator",
    CAN_CREATE_CAMPAIGN: "Campaign Creator",
  };

  private toggleStatusMenu() {
    this.showTypes = !this.showTypes;
  }
  private toggleAuthorities() {
    this.showAuthorities = !this.showAuthorities;
  }

  private searchTypes(type: any) {
    // Log.info("type:" + type);
    this.usersQuery.userType = type;
    Log.info(this.usersQuery.userType);
    this.showTypes = false;
  }

  private searchAuthorities(type: any) {
    // Log.info("type:" + type);
    this.usersQuery.authorityId = type;

    Log.info(this.usersQuery.authorityId);
    this.showAuthorities = false;
  }

  private next() {
    this.usersQuery.page++;
  }

  private prev() {
    if (this.usersQuery.page > 0) {
      this.usersQuery.page--;
    }
  }
}
</script>

<style scoped></style>

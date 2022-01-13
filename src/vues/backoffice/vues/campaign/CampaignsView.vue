<template>
  <div
    class="spartan relative right-0 col-span-5 pt-20 px-10 h-screen overflow-y-auto bg-blue-50"
  >
    <h1
      class="flex justify-center sm:justify-start spartan text-3xl font-semibold text-black mb-6"
    >
      Campaigns
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
              <div class="w-full bg-white rounded-t-md py-1 ">
                <div class="h-20 px-6 flex items-center justify-between">
                  <div class="relative h-11 ">
                    <input
                      v-model="campaignQuery.key"
                      class="h-full rounded-lg pl-5 w-27rem border border-gray-200"
                      type="text"
                      placeholder="Search"
                    />

                    <div
                      @click="campaignQuery.key = ''"
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

                  <!-- ------SearchIcon----- -->
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

                  <!-- ----cancel------- -->
                  <div v-if="isApprovalPending">
                    Approval Loading...
                  </div>

                  <div v-if="isDisapprovalPending">
                    Disapproval Loading...
                  </div>
                </div>
              </div>

              <div
                v-if="$apollo.queries.searchCampaigns.loading"
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
                      Title
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Campaign Owner
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Amount raised
                    </th>
                    <th
                      scope="col"
                      class="relative text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 "
                    >
                      <div
                        @click="toggleStatusMenu"
                        class="tableHeaderInnerDiv flex cursor-pointer justify-between relative h-full"
                      >
                        <div>
                          <span>Status</span>
                        </div>
                        <SmallChevronUp v-if="showStatuses" />
                        <SmallChevronDown v-else />
                      </div>
                      <div
                        v-if="showStatuses"
                        class="absolute bg-white shadow-md rounded-md right-0"
                      >
                        <ul class=" pt-3 rounded-md">
                          <li
                            class="cursor-pointer px-3 py-3 hover:bg-gray-200"
                            @click="searchStatus(null)"
                          >
                            ALL
                          </li>
                          <li
                            v-for="item in Object.keys(campaignStatuses)"
                            :key="item"
                            @click="searchStatus(item)"
                            class="cursor-pointer px-3  py-3 hover:bg-gray-200"
                          >
                            {{ item }}
                          </li>
                        </ul>
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      <div class="flex relative">
                        <span>End Date</span>
                        <!-- <div class="absolute th-chevron">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div> -->
                      </div>
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Menu</span>
                    </th>
                  </tr>
                </thead>
                <!-- -------loader------- -->

                <tbody class="bg-white divide-y divide-gray-200 mb-12">
                  <tr
                    class="border border-b"
                    v-for="campaign in campaignQuery.data"
                    :key="campaign.id"
                  >
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ campaign.id }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ campaign.name }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ campaign.owner.username }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ campaign.totalFundsRaised }}
                    </td>

                    <td
                      :class="displayColor(campaignStatuses[campaign.status])"
                      class="fw-600 px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ campaignStatuses[campaign.status] }}
                    </td>

                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ campaign.endDate }}
                    </td>

                    <td
                      class="relative px-6 py-3 whitespace-nowrap text-right text-sm font-medium "
                    >
                      <div class="td-elipsis relative">
                        <CampaignRowMenu
                          :campaignId="campaign.id"
                          :status="campaignStatuses[campaign.status]"
                        />
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
                  <p class="my-auto hidden">Showing 1-15 of 300 entries</p>
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
                  <span class="mx-3.5"> Page {{ campaignQuery.page }}</span>
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
import { Log, Util } from "@/components/util";
import { ApolloError } from "apollo-client";
import CampaignRowMenu from "./CampaignRowMenu.vue";
import store from "@/store/index";
import BaseVue from "@/components/BaseVue";
import SmallChevronUp from "@/components/svg/SmallChevronUp.vue";
import SmallChevronDown from "@/components/svg/SmallChevronDown.vue";
import { searchCampaigns } from "@/services/campaign/campaign.query";
@Component({
  name: "CampaignsView",
  apollo: {
    $client: "anonymousClient",
    searchCampaigns: {
      query: searchCampaigns,
      variables() {
        return {
          searchKey: this.campaignQuery.key,
          status: this.campaignQuery.status,
          page: this.campaignQuery.page,
          size: this.campaignQuery.size,
        };
      },
      result({ data }) {
        Log.info("Search Campaigns Query: " + JSON.stringify(data));

        this.campaignQuery.data = data.searchCampaigns;
        Log.info("campaigns Query: " + String(this.campaignQuery.data));
      },
      error(error: ApolloError) {
        this.campaignQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.campaignQuery.error)) {
          this.$apollo.queries.searchCampaigns.refetch();
        }
      },
    },
  },
  components: {
    CampaignRowMenu,
    SmallChevronUp,
    SmallChevronDown,
  },
})
export default class CampaignsView extends BaseVue {
  private campaignQuery: any = {
    key: "",
    page: 0,
    size: 10,
    data: [],
    error: "",
    status: null,
  };

  private showStatuses: boolean = false;

  private campaignStatuses: any = {
    AWAITING_APPROVAL: "Pending",
    APPROVED: "Active",
    DISAPPROVED: "Declined",
    ACTIVE: "Active",
    CANCELLED: "Cancelled",
    COMPLETED: "Completed",
    EXPIRED: "Expired",
  };

  private get isApprovalPending(): boolean {
    return store.state.campaignPendingApprovalLoading;
  }

  private get isDisapprovalPending(): boolean {
    return store.state.campaignPendingDisapprovalLoading;
  }

  private searchStatus(status: any) {
    // Log.info("status:" + status);
    this.campaignQuery.status = status;
    this.showStatuses = false;
  }

  private next() {
    this.campaignQuery.page++;
  }

  private prev() {
    if (this.campaignQuery.page > 0) {
      this.campaignQuery.page--;
    }
  }

  private toggleStatusMenu() {
    this.showStatuses = !this.showStatuses;
  }

  private displayColor(status: any) {
    Log.info("Status: " + status);
    if (status === "Declined" || status === "Cancelled") {
      return "statusDeclined";
    } else if (status === "Active") {
      return "statusActive";
    } else if (status === "Pending") {
      return "statusPending";
    } else if (status === "Unsettled") {
      return "statusUnsettled";
    } else if (status === "Settled") {
      return "statusSettled";
    }
  }
}
</script>

<style scoped></style>

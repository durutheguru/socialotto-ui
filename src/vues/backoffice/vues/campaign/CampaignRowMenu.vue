<template>
  <div
    @click="toggleMenu"
    class="relative cursor-pointer relative h-8 w-8 rounded-full flex justify-center items-center my-auto "
  >
    <div class="">
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
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    </div>

    <div
      class="absolute mt-8 shadow-sm rounded-md  right-0 top-0 z-50"
      v-if="show"
    >
      <!-- ----pending---- -->
      <div>
        <ul class=" w-40 flex flex-col bg-white mb-0">
          <li
            @click="goToCampaignDetails(campaignId)"
            class="py-3 grid-rows-1 hover:bg-gray-200 grid justify-center items-center "
          >
            View Details
          </li>
          <li
            @mousedown="openApprovalModal"
            v-if="status === 'Pending'"
            class="lotteryTableMenuListGreen py-3 hover:bg-gray-200 grid justify-center items-center"
          >
            Approve
          </li>
          <li
            @mousedown="openDisapprovalModal"
            v-if="status === 'Pending'"
            class="lotteryTableMenuRed py-3 hover:bg-gray-200 grid justify-center items-center"
          >
            Decline
          </li>
          <li
            v-if="status === 'Active'"
            class="lotteryTableMenuListGreen py-3  hover:bg-gray-200 grid justify-center items-center"
          >
            Extend
          </li>
          <li
            v-if="status === 'Active'"
            class="lotteryTableMenuRed py-3 hover:bg-gray-200 grid justify-center items-center"
          >
            Suspend
          </li>
          <li
            v-if="status === 'Unsettled'"
            class="lotteryTableMenuListGreen py-3  hover:bg-gray-200 grid justify-center items-center"
          >
            Raise Expense
          </li>
        </ul>
      </div>

      <!-- <div >
        <ul class="h-44 w-40 grid grid-rows-3 bg-white mb-0">
          <li
            class="grid-rows-1 hover:bg-gray-200 grid justify-center items-center "
          >
            View Details
          </li>
          <li
            class="lotteryTableMenuListGreen grid-rows-1  hover:bg-gray-200 grid justify-center items-center"
          >
            Extend
          </li>
          <li
            class="lotteryTableMenuRed grid-rows-1 hover:bg-gray-200 grid justify-center items-center"
          >
            Suspend
          </li>
        </ul>
      </div> -->
      <!-- <ul class="h-44 w-40 flex flex-col">
        <li class="bg-white hover:bg-gray-200">view</li>
      </ul> -->
    </div>
    <campaign-approval-modal
      @approve="approveCampaign(campaignId)"
      :isModalOpen="isApprovalModalOpen"
      @close="closeApprovalModal"
      :loading="approval.loading"
    />
    <campaign-disapproval-modal
      @disapprove="disApproveCampaign(campaignId)"
      :isModalOpen="isDisapprovalModalOpen"
      @close="closeDisapprovalModal"
      :loading="disApproval.loading"
    />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ApiResource from "@/components/core/ApiResource";
import { Log, Util } from "@/components/util";
import CampaignService from "@/services/campaign/CampaignService";
import store from "@/store/index";
import BaseVue from "@/components/BaseVue";
import CampaignApprovalModal from "./CampaignApprovalModal.vue";
import CampaignDisapprovalModal from "./CampaignDisapprovalModal.vue";

@Component({
  name: "CampaignRowMenu",
  props: {
    status: String,
    campaignId: String,
  },
  components: {
    CampaignApprovalModal,
    CampaignDisapprovalModal,
  },
})
export default class CampaignRowMenu extends BaseVue {
  private show: boolean = false;

  private isApprovalModalOpen = false;

  private openApprovalModal() {
    this.isApprovalModalOpen = true;
  }

  private closeApprovalModal() {
    this.isApprovalModalOpen = false;
  }

  private isDisapprovalModalOpen = false;

  private openDisapprovalModal() {
    this.isDisapprovalModalOpen = true;
  }

  private closeDisapprovalModal() {
    this.isDisapprovalModalOpen = false;
  }

  private approval: ApiResource = ApiResource.create();
  private disApproval: ApiResource = ApiResource.create();

  private approvalJson: any = {
    campaignId: "",
    approvalAction: "",
  };

  private disApprovalJson: any = {
    campaignId: "",
    approvalAction: "",
  };

  private toggleMenu() {
    this.show = !this.show;
  }

  // private rerenderTable() {
  //   store.commit("setTbodyKey", 1);
  //   Log.info(String(store.state.tbodyKey));
  // }

  private refetch() {
    this.$emit("refetch");
  }

  private approveCampaign(campaignId: string) {
    let self = this;
    self.approvalJson.campaignId = campaignId;
    self.approvalJson.approvalAction = "APPROVED";
    self.approval.loading = true;
    store.commit("setCampaignPendingApprovalLoading", true);

    CampaignService.approveOrDecline(
      self.approvalJson,
      (response: any) => {
        self.approval.loading = false;

        store.commit("setCampaignPendingApprovalLoading", false);

        // this.rerenderTable();

        Log.info("ApprovalResponse: " + JSON.stringify(response));
        this.closeApprovalModal();
        this.show = false;
        this.refetch();

        Util.handleGlobalAlert(
          true,
          "success",
          "Campaign approval was successful"
        );
      },
      (error) => {
        self.approval.loading = false;
        store.commit("setCampaignPendingApprovalLoading", false);
        self.approval.error = self.extractError(error);
        Util.handleGlobalAlert(true, "failed", self.approval.error);
        // this.refetch();
      }
    );

    Log.info("ApprovalJson: " + JSON.stringify(self.approvalJson));
  }

  private disApproveCampaign(campaignId: string) {
    let self = this;
    self.disApprovalJson.campaignId = campaignId;
    self.disApprovalJson.approvalAction = "DISAPPROVED";
    self.disApproval.loading = true;
    store.commit("setCampaignPendingDisapprovalLoading", true);

    CampaignService.approveOrDecline(
      self.disApprovalJson,
      (response: any) => {
        self.disApproval.loading = false;

        store.commit("setCampaignPendingDisapprovalLoading", false);

        // this.rerenderTable();

        Log.info("disApprovalResponse: " + JSON.stringify(response));
        this.closeDisapprovalModal();
        this.show = false;
        this.refetch();

        Util.handleGlobalAlert(
          true,
          "success",
          "Campaign disapproval was successful"
        );
      },
      (error) => {
        self.disApproval.loading = false;
        store.commit("setCampaignPendingDisapprovalLoading", false);
        self.disApproval.error = self.extractError(error);
        Util.handleGlobalAlert(true, "failed", self.disApproval.error);
      }
    );

    Log.info("disApprovalJson: " + JSON.stringify(self.disApprovalJson));
  }

  // private openDisapprovalModal(lotteryId: string) {
  //   store.commit("setIsLotteryDisapproval", {
  //     show: true,
  //     lotteryId,
  //   });

  //   Log.info("ApprovalJson: " + JSON.stringify(this.approvalJson));
  // }

  private goToCampaignDetails(campaignId: string) {
    // this.$router.push(`/lottery/${lotteryId}`);
    let routeData = this.$router.resolve({
      name: "CampaignDetails",

      params: { id: campaignId },
    });
    window.open(routeData.href, "_blank");
  }

  // private raiseExpense(lotteryId: string) {
  //   this.$router.push(`/back-office/raise_lottery_expense/${lotteryId}"`);
  // }
}
</script>

<style scoped></style>

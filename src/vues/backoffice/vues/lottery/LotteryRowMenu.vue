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
            @click="goToLotteryDetails(lotteryId)"
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
            @click="openDisapprovalModal"
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
            @click="raiseExpense(lotteryId)"
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
    <lottery-disapproval-modal
      @disapprove="disapproveLottery"
      :isModalOpen="isDisapprovalModalOpen"
      @close="closeDisapprovalModal"
      @refetch="refetch"
      :disapproval="disapproval"
    />
    <LotteryApprovalModal
      @approve="approveLottery"
      :isModalOpen="isApprovalModalOpen"
      :loading="approval.loading"
      @close="closeApprovalModal"
    />
  </div>
</template>

<script lang="ts">
import LotteryDisapprovalModal from "@/vues/backoffice/vues/lottery/LotteryDisapprovalModal.vue";

import { Component, Prop } from "vue-property-decorator";
import ApiResource from "@/components/core/ApiResource";
import { Log, Util } from "@/components/util";
import LotteryService from "@/services/lottery/LotteryService";
import store from "@/store/index";
import BaseVue from "@/components/BaseVue";
import LotteryApprovalModal from "./LotteryApprovalModal.vue";

@Component({
  name: "LotteryRowMenu",
  props: {
    status: String,
    lotteryId: String,
  },
  components: {
    LotteryDisapprovalModal,
    LotteryApprovalModal,
  },
})
export default class LotteryRowMenu extends BaseVue {
  private show: boolean = false;

  private approval: ApiResource = ApiResource.create();

  private approvalJson: any = {
    lotteryId: "",
    approvalAction: "",
    message: "",
  };
  @Prop()
  private lotteryId!: string;

  private disapproval: ApiResource = ApiResource.create();

  private disapprovalJson: any = {
    lotteryId: "",
    approvalAction: "",
    message: "",
  };

  private toggleMenu() {
    this.show = !this.show;
  }

  private refetch() {
    this.$emit("refetch");
  }

  private isDisapprovalModalOpen = false;

  private openDisapprovalModal() {
    this.isDisapprovalModalOpen = true;
  }

  private closeDisapprovalModal() {
    this.isDisapprovalModalOpen = false;
  }

  private isApprovalModalOpen = false;

  private openApprovalModal() {
    this.isApprovalModalOpen = true;
  }

  private closeApprovalModal() {
    this.isApprovalModalOpen = false;
  }

  // private rerenderTable() {
  //   store.commit("setTbodyKey", 1);
  //   Log.info(String(store.state.tbodyKey));
  // }

  private approveLottery() {
    let self = this;
    self.approvalJson.lotteryId = this.lotteryId;
    self.approvalJson.approvalAction = "APPROVED";
    self.approval.loading = true;

    this.closeApprovalModal();

    Log.info(self.approvalJson.lotteryId);
    // store.commit("setPendingApprovalLoading", true);

    LotteryService.approveOrDecline(
      self.approvalJson,
      (response: any) => {
        self.approval.loading = false;

        this.closeApprovalModal();
        Log.info("ApprovalResponse: " + JSON.stringify(response));
        this.refetch();
        Util.handleGlobalAlert(
          true,
          "success",
          "Lottery approval was successful"
        );
      },
      (error) => {
        self.approval.loading = false;
        this.closeApprovalModal();
        self.approval.error = self.extractError(error);
        Util.handleGlobalAlert(true, "failed", self.approval.error);
      }
    );

    // Log.info("ApprovalJson: " + JSON.stringify(self.approvalJson));
  }

  private disapproveLottery(message: string) {
    let self = this;
    this.disapprovalJson.lotteryId = this.lotteryId;
    this.disapprovalJson.approvalAction = "DISAPPROVED";
    this.disapprovalJson.message = message;
    self.disapproval.loading = true;

    Log.info("disapprovalJson: " + JSON.stringify(this.disapprovalJson));

    store.commit("setPendingDisapprovalLoading", true);

    LotteryService.approveOrDecline(
      self.disapprovalJson,
      (response: any) => {
        self.disapproval.loading = false;
        store.commit("setPendingDisapprovalLoading", false);
        store.commit("setTbodyKey", 1);
        Log.info("disapprovalResponse: " + JSON.stringify(response));
        this.closeDisapprovalModal();
        // this.message = "";
        Util.handleGlobalAlert(true, "success", "Lottery has been disapproved");

        this.refetch();
      },
      (error) => {
        self.disapproval.loading = false;
        store.commit("setPendingDisapprovalLoading", false);
        self.disapproval.error = self.extractError(error);
        this.closeDisapprovalModal();
        // this.message = "";
        Util.handleGlobalAlert(true, "failed", self.disapproval.error);
      }
    );
  }

  // private openDisapprovalModal(lotteryId: string) {
  //   store.commit("setIsLotteryDisapproval", {
  //     show: true,
  //     lotteryId,
  //   });

  //   // Log.info("ApprovalJson: " + JSON.stringify(this.approvalJson));
  // }

  private goToLotteryDetails(lotteryId: string) {
    // this.$router.push(`/lottery/${lotteryId}`);
    let routeData = this.$router.resolve({
      name: "LotteryDetails",
      // path: "/lottery",
      params: { id: lotteryId },
    });
    window.open(routeData.href, "_blank");
  }

  private raiseExpense(lotteryId: string) {
    this.$router.push(`/back-office/raise_lottery_expense/${lotteryId}`);
  }
}
</script>

<style scoped></style>

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
            @click="goToExpenseDetails(Id)"
            class="py-3 grid-rows-1 hover:bg-gray-200 grid justify-center items-center "
          >
            View Details
          </li>
          <!-- <li
            @mousedown="approveCampaign(Id)"
            v-if="status === 'Pending'"
            class="lotteryTableMenuListGreen py-3 hover:bg-gray-200 grid justify-center items-center"
          >
            Approve
          </li>
          <li
            @mousedown="disApproveCampaign(Id)"
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
          </li> -->
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
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";

import store from "@/store/index";
import BaseVue from "@/components/BaseVue";

@Component({
  name: "ExpenseRowMenu",
  props: {
    status: String,
    Id: String,
  },
})
export default class ExpenseRowMenu extends BaseVue {
  private show: boolean = false;

  private toggleMenu() {
    this.show = !this.show;
  }

  // private rerenderTable() {
  //   store.commit("setTbodyKey", 1);
  //   Log.info(String(store.state.tbodyKey));
  // }

  private goToExpenseDetails(Id: string) {
    // this.$router.push(`/lottery/${lotteryId}`);
    let routeData = this.$router.resolve({
      name: "ReviewLotteryExpense",

      params: { id: Id },
    });
    window.open(routeData.href, "_blank");
  }

  // private raiseExpense(lotteryId: string) {
  //   this.$router.push(`/back-office/raise_lottery_expense/${lotteryId}"`);
  // }
}
</script>

<style scoped></style>

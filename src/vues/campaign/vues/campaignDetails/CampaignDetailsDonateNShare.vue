<template>
  <div class="flex flex-col lg:ml-10 spartan">
    <div>
      <div class="relative">
        <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            :style="`width: ${(totalFundsRaised * 100) / targetFunds}%`"
            class="
        shadow-none
        flex flex-col
        text-center
        whitespace-nowrap
        text-white
        justify-center
        progressbar-green
        rounded-full
      "
          ></div>
        </div>
      </div>
    </div>

    <!-- -------------- -->
    <div
      class="h-14 items-center flex border-b-2 border-gray-200 justify-between"
    >
      <span class=" text-base font-semibold text-gray-600 "
        >N {{ totalFundsRaised }}
        <span class="font-medium text-gray-400">raised</span></span
      >
      <!-- <span class="text-base font-semibold text-gray-600 "
        >32 <span class="font-medium text-gray-400">days left</span></span
      > -->
    </div>
    <div class="flex flex-col border-b-2 border-gray-200 pb-8 pt-2">
      <div class="h-14 items-center flex  justify-between ">
        <span class="text-sm font-medium text-gray-400">Campaign goal</span>
        <span class="text-base font-semibold text-gray-600 "
          >N{{ targetFunds }}</span
        >
      </div>
      <!-- ----------- -->
      <!-- <div class="h-14 items-center flex  justify-between">
        <span class="text-sm font-medium text-gray-400">Contributors</span>
        <span class="text-base font-semibold text-gray-600 ">234 people</span>
      </div> -->
      <!-- ----------- -->
      <div class="h-14 items-center flex  justify-between">
        <span class="text-sm font-medium text-gray-400"
          >Campaign Documents</span
        >
        <div class="flex bg-blue-70 p-3 items-center rounded-md">
          <span class="text-base font-semibold text-gray-600 mr-3"
            >SOS Mr Pisvh.pdf</span
          >

          <div class="bg-blue-200 rounded-md">
            <svg
              class="m-1"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
                stroke="#FCFCFC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.83301 8.33325L9.99967 12.4999L14.1663 8.33325"
                stroke="#FCFCFC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 12.5V2.5"
                stroke="#FCFCFC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 h-14 mt-8">
      <div class="flex items-end  justify-start">
        <div
          @click="openDonateModal"
          class="bg-blue-200 h-12  w-11/12 rounded-md flex items-center  justify-center cursor-pointer"
        >
          <span class="text-white text-base font-semi-bold cursor-pointer"
            >Donate</span
          >
        </div>
      </div>
      <div class="flex items-end  justify-end">
        <div
          class="bg-transparent border-text-blue-200 h-12  w-11/12 rounded-md flex items-center  justify-center cursor-pointe"
        >
          <span class="text-base font-semi-bold cursor-pointer">Share</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Log, Util } from "@/components/util";
import store from "@/store/index";

@Component({
  name: "CampaignDetailsDonateNShare",
  props: {
    targetFunds: Number,
    totalFundsRaised: Number,
  },
})
export default class CampaignDetailsDonateNShare extends Vue {
  private openDonateModal() {
    store.commit("setCurrentCampaignId", this.$route.params.id);
    // this.notifications = !this.notifications;
    store.commit("setDonateModal", true);
    Log.info("donateModalOpen campaignId:" + this.$route.params.id);
  }
}
</script>

<style scoped></style>

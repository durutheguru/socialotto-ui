<template>
  <div
    style="min-height: 343px;"
    class="flex flex-col lg:ml-10 spartan border-t-2 "
  >
    <div>
      <div class="relative"></div>
    </div>

    <!-- -------------- -->

    <div class="flex flex-col  border-gray-200 pt-2">
      <!-- -------------- -->
      <div class="h-12 items-center flex  justify-between ">
        <span class="text-sm font-medium text-gray-400"
          >Celebrity Sponsor
        </span>
        <span class="text-base font-semibold text-gray-600 ">{{
          lotteryOwner
        }}</span>
      </div>
      <!-- ----------- -->
      <div class="h-12 items-center flex  justify-between ">
        <span class="text-sm font-medium text-gray-400"
          >Registration Ends
        </span>
        <span class="text-base font-semibold text-gray-600 ">{{
          dateOfClosure
        }}</span>
      </div>
      <!-- ----------- -->
      <div class="h-12 items-center flex  justify-between ">
        <span class="text-sm font-medium text-gray-400">Evaluation Date </span>
        <span class="text-base font-semibold text-gray-600 ">{{
          evalTime
        }}</span>
      </div>
      <!-- ----------- -->
      <div class="h-12 items-center flex  justify-between ">
        <span class="text-sm font-medium text-gray-400">Tickets sold </span>
        <span class="text-base font-semibold text-gray-600 ">{{
          numberOfEntries
        }}</span>
      </div>
      <!-- ----------- -->
      <div class="h-12 items-center flex  justify-between ">
        <span class="text-sm font-medium text-gray-400"
          >Number of winners
        </span>
        <span class="text-base font-semibold text-gray-600 ">{{
          numberOfWinners
        }}</span>
      </div>
      <!-- ----------- -->

      <div v-if="isBackOfficeUser && lotteryStatus === 'PENDING_APPROVAL'">
        <div>
          <button
            @click="approveLottery()"
            type="submit"
            style="background-color: #4691A6;"
            class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Approve
            <!-- <i class="ml-px fa fa-spinner fa-spin" v-if="userLogin.loading"></i> -->
          </button>
        </div>

        <div class=" mt-6">
          <div
            @click="openDisapprovalModal"
            class="bg-transparent border-2 border-gray-300 py-2.5 px-4 w-full rounded-md flex items-center  justify-center cursor-pointer"
          >
            <span class="text-base text-gray-400 font-semi-bold cursor-pointer"
              >Decline</span
            >
          </div>
        </div>
      </div>

      <div v-if="isPlatformUser && lotteryStatus === 'ACTIVE'">
        <div class="h-14 items-center flex  justify-between ">
          <span class="text-base font-semibold text-gray-600 "
            >Buy Tickets (Cost
            <span class="font-bold">N{{ ticketCost }}</span> per ticket)</span
          >
        </div>
        <!-- ----------- -->
        <div class=" items-center flex flex-col sm:flex-row justify-between">
          <div
            class="relative grid grid-cols-3 bg-transparent border-2 border-yellow  h-14 w-full sm:w-5/12 mb-6 sm:mb-0 items-center justify-center rounded-md"
          >
            <button
              @click="decrement"
              :disabled="ticketAmount <= 0"
              :class="ticketAmount <= 0 && 'opacity-25'"
              class="cursor-pointer text-base font-semibold flex justify-center h-full w-full items-center"
            >
              <!-- -----Minus------ -->
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
                  d="M18 12H6"
                />
              </svg>
            </button>
            <div
              class="border-r-2 border-l-2 border-yellow border-dashed text-base font-semibold flex justify-center h-full w-full items-center"
            >
              {{ ticketAmount }}
            </div>
            <button
              @click="increment"
              class="cursor-pointer text-base font-semibold flex justify-center h-full w-full items-center"
            >
              <!-- -----Plus------ -->

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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>

            <div
              style="left: -2px;"
              class="border-r-2 border-t-2 border-b-2 border-yellow h-6 absolute w-4 z-20 bg-blue-50"
            ></div>
            <div
              style="right: -2px;"
              class="border-l-2 border-t-2 border-b-2 border-yellow h-6 absolute w-4 z-20 bg-blue-50"
            ></div>
          </div>

          <!-- --------------------- -->
          <button
            @click="handleLotteryPayment"
            :disabled="ticketAmount <= 0"
            :class="ticketAmount <= 0 && 'opacity-25'"
            class="cursor-pointer flex bg-yellow h-14 w-full sm:w-6/12 items-center justify-center rounded-md"
          >
            <span class="text-base font-semibold text-white "
              >Pay N{{ price }}</span
            >
          </button>
        </div>

        <!-- ----------------- -->
        <div class="h-14 mt-6">
          <div
            class="bg-transparent border-2 border-gray-300 h-14  w-full rounded-md flex items-center  justify-center cursor-pointer"
          >
            <span class="text-base text-gray-400 font-semi-bold cursor-pointer"
              >Share</span
            >
          </div>
        </div>
        <!-- -------------- -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
declare var MonnifySDK: any;

import { Component, Vue, Prop } from "vue-property-decorator";
import store from "@/store/index";
import { Constants, Log, Util } from "@/components/util";
import BaseVue from "@/components/BaseVue";
import LotteryService from "@/services/lottery/LotteryService";
import ApiResource from "@/components/core/ApiResource";

@Component({
  name: "LotteryPayNShare",
  props: {
    // ticketCost: String,
    numberOfWinners: Number,
    numberOfEntries: Number,
    closureDate: String,
    lotteryOwner: String,
    lotteryStatus: String,
    evaluationTime: String,
  },
})
export default class LotteryPayNShare extends BaseVue {
  private ticketAmount: number = 0;

  @Prop()
  private ticketCost!: number;

  @Prop()
  private closureDate!: string;

  @Prop()
  private evaluationTime!: string;

  private lotteryId = this.$route.params.id;

  get price() {
    return this.ticketAmount * this.ticketCost;
  }

  private get dateOfClosure() {
    // const date = Util.formatTime(this.closureDate, "YYYY-MM-DD HH:mm:ss.SSSS", "MMM DD ddd YYYY hh:mm a")

    const date = Util.formatTime(
      this.closureDate,
      "YYYY-MM-DD",
      "MMM DD ddd YYYY"
    );
    return date;
  }

  private get evalTime() {
    const date = Util.formatTime(
      this.evaluationTime,
      "YYYY-MM-DD HH:mm:ss.SSSS",
      "MMM DD ddd YYYY hh:mm a"
    );
    return date;
  }

  private increment() {
    this.ticketAmount++;
  }

  private decrement() {
    this.ticketAmount--;
  }

  private reset() {
    this.ticketAmount = 0;
    Log.info(`ticketAmount should be 0: ${this.ticketAmount}`);
  }

  private approval: ApiResource = ApiResource.create();

  private approvalJson: any = {
    lotteryId: "",
    approvalAction: "",
    message: "",
  };

  private approveLottery() {
    let self = this;
    self.approvalJson.lotteryId = this.lotteryId;
    self.approvalJson.approvalAction = "APPROVED";
    self.approval.loading = true;

    LotteryService.approveOrDecline(
      self.approvalJson,
      (response: any) => {
        self.approval.loading = false;
        Log.info("ApprovalResponse: " + JSON.stringify(response));
        Util.handleGlobalAlert(
          true,
          "success",
          "Lottery approval was successful"
        );
      },
      (error) => {
        self.approval.loading = false;
        self.approval.error = self.extractError(error);
        Util.handleGlobalAlert(true, "failed", self.approval.error);
      }
    );

    Log.info("ApprovalJson: " + JSON.stringify(self.approvalJson));
  }

  private openDisapprovalModal() {
    store.commit("setIsLotteryDisapproval", {
      show: true,
      lotteryId: this.lotteryId,
    });

    // Log.info("ApprovalJson: " + JSON.stringify(this.approvalJson));
  }

  private handleLotteryPayment() {
    let self = this;
    let username = store.getters["authToken/username"];

    let userDescription: string = `LOTTERY_TICKET//${this.lotteryId}//${this.ticketAmount}//${this.price}//${username}`;

    Log.info(userDescription);

    MonnifySDK.initialize({
      amount: this.price,
      currency: "NGN",
      reference: Util.uuidv5(new Date().getTime() + "", true),
      customerName: username,
      customerEmail: username,
      apiKey: process.env.VUE_APP_MONNIFY_API_KEY,
      contractCode: process.env.VUE_APP_MONNIFY_CONTRACT_CODE,
      paymentDescription: userDescription,

      isTestMode: true,
      metadata: {
        name: username,
        email: username,
      },
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],

      onComplete(response: any) {
        self.reset();

        Log.info(`Payment completed. Data: ${JSON.stringify(response)}`);
        if (response.paymentStatus === "PAID") {
          Util.handleGlobalAlert(
            true,
            "success",
            "Your lottery payment was successful!!"
          );
        }
      },

      onClose(data: any) {
        Log.info(`Dialog was closed. Data: ${JSON.stringify(data)}`);
      },
    });
  }
}
</script>

<style scoped></style>

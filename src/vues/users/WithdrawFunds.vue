<template>
  <transition name="fadeIn">
    <div
      v-if="isModalOpen"
      class="fixed z-50 inset-0 overflow-hidden modal-blur"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div
            @click="close"
            class="absolute inset-0 bg-gray-800 bg-opacity-75 modal-blur"
          ></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
        >&#8203;
        <section
          class="main inline-block bg-white align-bottom rounded-lg shadow-xs text-left overflow-hidden transform transition-all max-w-lg mx-auto sm:my-8 sm:align-middle sm:w-full"
        >
          <div class="w-full h-full overflow-y-auto">
            <div class="flex flex-col h-full p-10">
              <!-- <div class="flex-1 h-full flex flex-col"> -->
              <div class="flex items-center  mb-2">
                <div class="w-full justify-center items-center">
                  <h2
                    v-if="!isValidString(errorMsg)"
                    class="text-lg leading-7 font-medium light-blue-text spartan mb-0"
                  >
                    Withdraw Funds
                  </h2>
                  <h4 class="wine slight-smaller-font" v-else>
                    {{ errorMsg }}
                  </h4>
                </div>
                <div class="h-7 flex items-center  py-4 ">
                  <button
                    @click="close"
                    aria-label="Close panel"
                    class=" cursor-pointer transition ease-in-out duration-150 focus:outline-none"
                  >
                    <!-- Heroicon name: x -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="32"
                      width="32"
                      class="text-gray-300 hover:text-gray-400 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class=" flex flex-col justify-between h-full ">
                <validation-observer
                  ref="observer"
                  id="donate_form"
                  tag="form"
                  role="form"
                  v-slot="{ invalid, reset }"
                  @reset.prevent="reset"
                  @submit.prevent="savePin"
                  novalidate
                >
                  
                  <!-- --------------------------Replace all secrets on netlify------------------------------- -->
                  <div class="mb-6">
                    <label
                      for="Bank Name"
                      style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
                      class="block text-sm font-medium "
                    >
                      Bank Name
                    </label>

                    <!-- --------- -->
                    <div class="mt-1">
                      <div
                        @click="toggleBanks"
                        class="cursor-pointer relative flex border-gray-300 border-2 border-blue-dark  rounded-md h-12"
                      >
                        <input
                          readonly
                          v-model="bankInfo.bankName"
                          id="bankName"
                          name="bankName"
                          type="text"
                          placeholder="bankName"
                          autocomplete=""
                          class="cursor-pointer spartan bg-transparent appearance-none block w-full px-3 py-2placeholder-gray-400 focus:outline-none sm:text-sm"
                        />

                        <div class="cursor-pointer inset-y-0 my-auto mr-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="black"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <!-- <div class="relative bg-white z-20 " v-if="openMenu">
                        <ul
                          style="max-height: 10rem; overflow-y: auto"
                          aria-disabled="true"
                          class=" py-2 pb-4 absolute w-full rounded-md shadow-md bg-white spartan text-sm"
                        >
                          <li
                            class="cursor-pointer hover:bg-gray-50 py-1.5 px-2"
                            @mousedown="selectBankInfo(bankInfo)"
                            v-for="(bankInfo, index) in bankInfoArray"
                            :key="index"
                          >
                            {{ bankInfo.bankName }}
                          </li>
                        </ul>
                      </div> -->
                    </div>
                    <!-- -------------- -->
                  </div>

                  <div class="mb-3">
                    <label
                      for="value"
                      style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
                      class="block text-sm font-medium "
                    >
                      Account Number
                    </label>
                    <div class="mt-1">
                      <validation-provider
                        rules="required|numeric"
                        v-slot="{ errors }"
                      >
                        <input
                          id="AccountNumber"
                          name="value"
                          type="number"
                          placeholder="Account Number"
                          v-model="accountNumber"
                          autocomplete=""
                          disabled=true
                          required
                          :class="{
                            'border-red-400': errors.length > 0,
                          }"
                          class="h-12 spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                        />
                        <span class="text-red-500 spartan">{{
                          errors[0]
                        }}</span>
                      </validation-provider>
                    </div>
                  </div>

                  <div class="mb-6">
                    <label
                      for="Enter Withdrawal Amount"
                      style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
                      class="block text-sm font-medium "
                    >
                      Enter Withdrawal Amount
                    </label>
                    <div class="mt-1">
                      <validation-provider
                        rules="required|numeric"
                        v-slot="{ errors }"
                      >
                        <input
                          id="Amount"
                          name="value"
                          type="number"
                          placeholder="Amount"
                          autocomplete=""
                          v-model="amount"
                          required
                          :class="{
                            'border-red-400': errors.length > 0,
                          }"
                          class="h-12 spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                        />
                        <span class="text-red-500 spartan">{{
                          errors[0]
                        }}</span>
                      </validation-provider>
                    </div>
                  </div>

                  <div class="mb-6">
                    <label
                      for="Enter Pin"
                      style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
                      class="block text-sm font-medium "
                    >
                      Enter Pin
                    </label>
                    <div class="mt-1">
                      <validation-provider
                        rules="required|numeric"
                        v-slot="{ errors }"
                      >
                        <input
                          id="Enter Pin"
                          name="value"
                          type="password"
                          placeholder="Pin"
                          autocomplete=""
                          v-model="pin"
                          required
                          :class="{
                            'border-red-400': errors.length > 0,
                          }"
                          class="h-12 spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
                        />
                        <span class="text-red-500 spartan">{{
                          errors[0]
                        }}</span>
                      </validation-provider>
                    </div>
                  </div>

                  <!-- -------------------------------Merge secrets------------------------------- -->
                  <div class="flexmt-4">
                    <div
                      @click="withdrawFunds()"
                      :disabled="invalid"
                      :class="[invalid ? 'opacity-25' : 'opacity-100']"
                      class="bg-blue-200 h-12  w-full rounded-md flex items-center spartan justify-center cursor-pointer"
                    >
                      <span
                        class="text-white text-base font-semi-bold cursor-pointer"
                        >Withdraw Funds</span
                      >
                    </div>
                  </div>
                </validation-observer>
              </div>

              <!-- </div> -->
            </div>
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Constants, Log, Util } from "@/components/util";
import { FetchUserWalletInfo, InitializeWalletCashout } from "@/services/wallet/wallet.gql";
import { EventBus, EventTrigger } from "@/components/core/Event";
import { ApolloError } from "apollo-client";
import BaseVue from "@/components/BaseVue";

@Component
export default class WithdrawFunds extends BaseVue {


  @Prop()
  private isModalOpen!: boolean;


  private bankInfo = { bankName: "", bankCode: "" };


  @Prop()
  private banks!: [];


  @Prop()
  private walletId!: string;


  @Prop()
  private username!: string;


  private accountNumber: string = "";


  private fetchUserWalletInfo: any = {};


  private openMenu = false;


  private userWalletId: string = '';


  private amount: number = 0.0;


  private pin = "";


  private loading: boolean = false;


  private errorMsg: string = "";



  private mounted() {
    let self = this;
    Log.info("isModalOpen: " + JSON.stringify(this.isModalOpen));
    self.userWalletId = this.walletId;
    self.fetchWalletDetails();
    EventBus.$on("wallet-update-banks-fetched-event", (data: any) => {
      Log.info("Banks Fetched Update received: " + JSON.stringify(data));
      data.filter((value: any) => {
        if (value.bankCode === self.fetchUserWalletInfo.bankCode) {
          self.selectBankInfo(value);
        }
      });
    });
  }


  private fetchWalletDetails() {
    let self = this;
    self.$apollo
      .query({
        query: FetchUserWalletInfo,
        variables: {
          username: this.username,
        },
      })
      .then(({ data }) => {
        Log.info("User Wallet Info: " + JSON.stringify(data));
        self.fetchUserWalletInfo = data.fetchUserWalletInfo;
        self.bankInfo.bankCode = self.fetchUserWalletInfo.bankCode;
        self.accountNumber = self.fetchUserWalletInfo.accountNumber;
        
        // this.accountNumber = data?.viewUserDetails;
        // Log.info("User Query: " + JSON.stringify(this.userQuery.data));
      })
      .catch(
        (error: ApolloError) => {
          Log.error("User Wallet Info Error: " + error);
        }
      );
  }


  private close() {
    // this.isModalOpen = false;
    this.$emit("close");
  }


  private toggleBanks() {
    this.openMenu = !this.openMenu;
  }


  private get bankInfoArray() {
    return this.banks;
  }


  private selectBankInfo(info: any) {
    this.bankInfo = info;
    this.openMenu = false;

    Log.info(this.bankInfo.bankCode);
  }


  private isValidUpdate(): boolean {
    return (
      this.isValidString(this.bankInfo.bankCode) &&
      this.isValidString(this.accountNumber) &&
      this.isValidString(this.pin) && 
      this.amount > 0
    );
  }

  
  private withdrawFunds() {
    if (!this.isValidUpdate()) {
      Log.info("Invalid Cashout Withdrawal was triggered..");
      return;
    }

    let self = this;
    self.loading = true;

    let cashout = {
      walletId: self.userWalletId,
      cashOutPin: self.pin,
      amount: self.amount,
      username: self.username,
    };
    Log.info("Posting Cashout :" + JSON.stringify(cashout));

    this.$apollo
      .mutate({
        mutation: InitializeWalletCashout,
        variables: {
          input: cashout,
        },
      })
      .then((data: any) => {
        Log.info("Cashout Response Data: " + JSON.stringify(data));
        Util.handleGlobalAlert(
          true, "success",
          "Please check your email for OTP."
        );
        self.loading = false;
        EventTrigger.trigger(
          "wallet-cashout-initiation", data.data.initializeCashoutFromWallet.reference
        );
        self.close();
      })
      .catch((error) => {
        Log.error(error);
        self.loading = false;
        self.errorMsg = Util.extractGqlError(error);
      });
  }


}
</script>

<style scoped></style>

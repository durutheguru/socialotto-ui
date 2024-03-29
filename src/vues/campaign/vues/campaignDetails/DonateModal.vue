<template>
  <!-- <div v-if="isModalOpen">
    <h1>Donate Modal</h1>
  </div> -->

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
              <div class="flex items-center justify-between mb-4">
                <div class="">
                  <h2
                    class="text-lg leading-7 font-medium light-blue-text spartan mb-0"
                  >
                    Enter amount you wish to donate
                  </h2>
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
                  @submit.prevent="handlePayment"
                  novalidate
                >
                  <!-- --------------------------Replace all secrets on netlify------------------------------- -->
                  <div
                    class="relative h-12 mb-6 flex block w-full text-left text-md font-medium  focus:outline-none"
                  >
                    <div class=" h-full ">
                      <validation-provider
                        rules="required|numeric"
                        v-slot="{ errors }"
                      >
                        <input
                          id="donation_amount"
                          name="amount"
                          placeholder="NGN 1200"
                          type="number"
                          :class="{
                            'border-red-400': errors.length > 0,
                          }"
                          class="h-full rounded-md spartan bg-white border-gray-300 border-2 focus-border-blue-200 spartan text-base appearance-none block w-full px-3 py-2 placeholder-gray-400 focus:outline-none sm:text-sm"
                          v-model="amount"
                        />

                        <span class="text-red-500 spartan mb-4">{{
                          errors[0]
                        }}</span>
                      </validation-provider>
                    </div>
                  </div>

                  <!-- -------------------------------Merge secrets------------------------------- -->
                  <div class="flex  ">
                    <button class="hidden" id="reset2" type="reset">
                      Reset
                    </button>
                    <div
                      @click="handlePayment"
                      :disabled="invalid"
                      :class="[invalid ? 'opacity-25' : 'opacity-100']"
                      class="bg-blue-200 h-12  w-full rounded-md flex items-center spartan justify-center cursor-pointer"
                    >
                      <span
                        class="text-white text-base font-semi-bold cursor-pointer"
                        >Proceed to pay</span
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
declare var MonnifySDK: any;

import { Component, Vue } from "vue-property-decorator";
import store from "@/store/index";
import { Constants, Log, Util } from "@/components/util";

@Component({
  name: "DonateModal",
})
export default class DonateModal extends Vue {
  private amount: string = "";

  private get isModalOpen(): boolean {
    return store.state.donateModal;
  }

  private get campaignId(): boolean {
    return store.state.currentCampaignId;
  }

  private resetButtonClick: any = () => {
    let resetButton = document.getElementById("reset2") as HTMLElement;
    resetButton.click();
  };

  private close() {
    store.commit("setDonateModal", false);
    this.resetButtonClick();
    Log.info("closeModal");
  }

  private reset() {
    this.amount = "";

    (this.$refs.observer as any).reset();

    Log.info("Done Resetting form...");
  }

  private handlePayment() {
    let self = this;
    let userDescription: string = `CAMPAIGN_FUND//${this.campaignId}//${this.amount}//${store.getters["authToken/username"]}`;

    let anonymousUserDescription: string = `CAMPAIGN_FUND//${this.campaignId}//${this.amount}//${Constants.anonymousUser} `;

    let username = store.getters["authToken/loggedIn"]
      ? store.getters["authToken/username"]
      : Constants.anonymousUser;

    Log.info("Processing Payment Integration...");
    Log.info(store.getters["authToken/username"]);
    Log.info("user is " + Constants.anonymousUser);
    Log.info(`userDescription ${userDescription}`);

    Log.info(`anonymousUserDescription ${anonymousUserDescription}`);

    MonnifySDK.initialize({
      amount: this.amount,
      currency: "NGN",
      reference: Util.uuidv5(new Date().getTime() + "", true),
      customerName: username,
      customerEmail: username,
      apiKey: process.env.VUE_APP_MONNIFY_API_KEY,
      contractCode: process.env.VUE_APP_MONNIFY_CONTRACT_CODE,
      paymentDescription: store.getters["authToken/loggedIn"]
        ? userDescription
        : anonymousUserDescription,
      isTestMode: true,
      metadata: {
        name: username,
        email: username,
      },
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],

      onComplete(response: any) {
        self.close();

        Log.info(`Payment completed. Data: ${JSON.stringify(response)}`);
        if (response.paymentStatus === "PAID") {
          Util.handleGlobalAlert(
            true,
            "success",
            "Your campaign donation was successful!!"
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

<style lang="scss" scoped>
.fadeIn-enter-active,
.fadeIn-leave-active {
  .main {
    transition: all 0.3s ease-in-out;
  }
}
.fadeIn-leave-to,
.fadeIn-enter-from {
  .main {
    transform: scale(0.8);
    opacity: 0;
  }
}

.flag-icon1 {
  color: #010101;
}

.flag-icon1:hover {
  color: #ff721f;
}
</style>

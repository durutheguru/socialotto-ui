<template>
  <!-- <div v-if="isModalOpen">
    <h1>Donate Modal</h1>
  </div> -->

  <transition name="slide-rigth">
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
          class="inline-block bg-white align-bottom rounded-lg shadow-xs text-left overflow-hidden transform transition-all max-w-lg mx-auto sm:my-8 sm:align-middle sm:w-full"
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
                    class=" cursor-pointer hover:text-white transition ease-in-out duration-150 focus:outline-none"
                  >
                    <!-- Heroicon name: x -->
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0003 29.3334C23.3641 29.3334 29.3337 23.3639 29.3337 16.0001C29.3337 8.63628 23.3641 2.66675 16.0003 2.66675C8.63653 2.66675 2.66699 8.63628 2.66699 16.0001C2.66699 23.3639 8.63653 29.3334 16.0003 29.3334Z"
                        stroke="#898989"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20 12L12 20"
                        stroke="#898989"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 12L20 20"
                        stroke="#898989"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                  v-slot="{ invalid }"
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
                    <div
                      @click="handlePayment"
                      :disabled="invalid"
                      :class="[invalid ? 'opacity-25' : 'opacity-100']"
                      class="bg-blue-200 h-12  w-full rounded-md flex items-center spartan justify-center cursor-pointer"
                    >
                      <span
                        class="text-white text-base font-semi-bold cursor-pointer"
                        >Donate</span
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
import { Log, Util } from "@/components/util";

@Component({
  name: "DonateModal",
})
export default class DonateModal extends Vue {
  private amount: string = "";

  private get isModalOpen(): boolean {
    return store.state.donateModal;
  }

  private close() {
    store.commit("setDonateModal", false);
    Log.info("closeModal");
  }

  public handlePayment() {
    Log.info("Processing Payment Integration...");
    console.log("Monnefy na");
    MonnifySDK.initialize({
      amount: this.amount,
      currency: "NGN",
      reference: Util.uuidv5(new Date().getTime() + "", true),
      customerName: "John Doe",
      customerEmail: "monnify@monnify.com",
      apiKey: process.env.VUE_APP_MONNIFY_API_KEY,
      contractCode: process.env.VUE_APP_MONNIFY_CONTRACT_CODE,
      paymentDescription: "<<Payment for Lottery>>",
      isTestMode: true,
      metadata: {
        name: "User name",
        email: "User email",
      },
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],

      onComplete(response: any) {
        Log.info(`Payment completed. Data: ${JSON.stringify(response)}`);
      },

      onClose(data: any) {
        Log.info(`Dialog was closed. Data: ${JSON.stringify(data)}`);
      },
    });
  }
}
</script>

<style scoped></style>

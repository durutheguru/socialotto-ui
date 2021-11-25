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
            <div class="flex flex-col h-full">
              <div class="flex-1 h-full flex flex-col">
                <header class="space-y-1 py-2 px-4 bg-dark-color sm:px-6">
                  <div class="flex items-center justify-between space-x-3">
                    <div class="flex flex-col  py-4">
                      <h2 class="text-lg leading-7 font-medium text-white">
                        Merge Options
                      </h2>
                      <p class="text-sm leading-5 text-gray-400">
                        In case of duplicate secrets merge to onboard or service
                        provider
                      </p>
                    </div>
                    <div class="h-7 flex items-center">
                      <button
                        @click="close"
                        aria-label="Close panel"
                        class="text-indigo-200 hover:text-white transition ease-in-out duration-150 focus:outline-none"
                      >
                        <!-- Heroicon name: x -->
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </header>
                <div class="flex-auto flex flex-col justify-between h-full ">
                  <div class="flex flex-col rounded-md bg-white shadow-xs ">
                    <!-- --------------------------Replace all secrets on netlify------------------------------- -->
                    <div
                      class="relative h-12 px-6 flex items-start space-x-3  block w-full px-4 border-t border-gray-100 text-left text-md font-medium  focus:outline-none"
                    >
                      <div class="min-w-0 flex-1 h-full ">
                        <input
                          type="number"
                          class="h-full w-11/12"
                          v-model="amount"
                        />
                      </div>
                    </div>

                    <!-- -------------------------------Merge secrets------------------------------- -->
                    <div class="flex items-center ">
                      <div
                        @click="handlePayment"
                        class="bg-blue-200 h-12  w-11/12 rounded-md flex items-center  justify-center cursor-pointer"
                      >
                        <span
                          class="text-white text-base font-semi-bold cursor-pointer"
                          >Donate</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      amount: 5000,
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

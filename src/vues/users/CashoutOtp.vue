<template>
  <transition name="fadeIn">
    <div
      v-if="isModalOpen"
      class="fixed z-50 inset-0 overflow-hidden modal-blur"
    >
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:block sm:p-0">
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
          class="
            main
            inline-block
            bg-white
            align-bottom
            rounded-lg
            shadow-xs
            text-left
            overflow-hidden
            transform
            transition-all
            max-w-lg
            mx-auto
            sm:my-8 sm:align-middle sm:w-full
          "
        >
          <div class="w-full h-full overflow-y-auto">
            <div class="flex flex-col h-full p-10">
              <!-- <div class="flex-1 h-full flex flex-col"> -->
              <div class="flex items-center mb-2">
                <div class="w-full justify-center items-center">
                  <h2
                    v-if="!isValidString(errorMsg)"
                    class="
                      text-lg
                      leading-7
                      font-medium
                      light-blue-text
                      spartan
                      mb-0
                    ">
                    Enter OTP
                  </h2>
                  <h4 class="wine slight-smaller-font" v-else>
                    {{ errorMsg }}
                  </h4>
                </div>
                <div class="h-7 flex items-center py-4">
                  <button
                    @click="close"
                    aria-label="Close panel"
                    class="
                      cursor-pointer
                      transition
                      ease-in-out
                      duration-150
                      focus:outline-none
                    "
                  >
                    <!-- Heroicon name: x -->
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="32"
                      width="32"
                      class="text-gray-300 hover:text-gray-400"
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
              <br />

              <div class="flex flex-col justify-between h-full">
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
                      for="OTP"
                      style="
                        font-family: 'Spartan', sans-serif;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 12px;
                        line-height: 100%;
                        color: #797979;
                      "
                      class="block text-sm font-medium"
                    >
                      OTP
                    </label>

                    <!-- --------- -->
                    <div class="mt-1">
                      <div
                        class="
                          cursor-pointer
                          relative
                          flex
                          border-gray-300 border-2 border-blue-dark
                          rounded-md
                          h-12
                        "
                      >
                        <input 
                          v-model="otp"
                          id="otp"
                          name="otp"
                          type="text"
                          placeholder="Withdrawal OTP"
                          autocomplete=""
                          class="
                            cursor-pointer
                            spartan
                            bg-transparent
                            appearance-none
                            block
                            w-full
                            px-3
                            py-2placeholder-gray-400
                            focus:outline-none
                            sm:text-sm
                          "
                        />
                      </div>
                    </div>
                    <!-- -------------- -->
                  </div>
                  

                  <!-- -------------------------------Merge secrets------------------------------- -->
                  <div class="flexmt-4 margin-top-m">
                    <div
                      :disabled="invalid || !isValidUpdate || loading"
                      :class="[invalid ? 'opacity-25' : 'opacity-100']"
                      class="
                        bg-blue-200
                        h-12
                        w-full
                        rounded-md
                        flex
                        items-center
                        spartan
                        justify-center
                        cursor-pointer
                      "
                      @click="withdrawFunds()"
                    >
                      <span
                        class="
                          text-white text-base
                          font-semi-bold
                          cursor-pointer
                        ">
                        Withdraw Funds <i class="fa fa-spinner fa-spin" v-if="loading" />
                        </span
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
import { WalletWithdrawalUpdateAction } from "@/services/wallet/wallet.gql";
import BaseVue from "@/components/BaseVue";
import { CompleteCashoutRequest } from '@/services/wallet/wallet.gql';
import { ApolloError } from "apollo-client";
import { EventBus } from "@/components/core/Event";

@Component
export default class CashoutOtp extends BaseVue {
  

  private errorMsg: string = "";


  @Prop()
  private isModalOpen!: boolean;


  @Prop()
  private reference!: string;


  private otp: string = '';


  private loading: boolean = false;


  private mounted() {
    let self = this;
    Log.info("isModalOpen: " + JSON.stringify(this.isModalOpen));
  }


  private close() {
    this.$emit("close");
  }

  private isValidUpdate(): boolean {
    return this.isValidString(this.otp);
  }


  private withdrawFunds() {
    if (!this.isValidUpdate()) {
      Log.info("Invalid Request was triggered..");
      return;
    }

    let self = this;
    self.loading = true;
    let update = {
      reference: this.reference,
      otp: this.otp,
    };
    Log.info("Posting Update :" + JSON.stringify(update));

    this.$apollo
      .mutate({
        mutation: CompleteCashoutRequest,
        variables: {
          input: update,
        },
      })
      .then((data: any) => {
        Log.info("Data: " + String(data));
        Util.handleGlobalAlert(
          true,
          "success",
          "Successful Withdrawal"
        );
        self.loading = false;
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


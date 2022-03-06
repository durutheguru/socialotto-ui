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
                    class="text-lg leading-7 text-center font-medium light-blue-text spartan mb-0"
                  >
                    Add a withdrawal account
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

              <div class="flex justify-center mt-2 mb-4">
                <span class="fw-400 fs-14 text-black "
                  >Create a 4 digit PIN for transactions</span
                >
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
                  <div
                    class="relative h-12 mb-6 flex block w-full text-left text-md font-medium  focus:outline-none"
                  >
                    <div class=" h-full ">
                      <validation-provider
                        rules="required|numeric"
                        v-slot="{ errors }"
                      >
                        <input
                          id="pin"
                          name="pin"
                          placeholder="Pin"
                          type="number"
                          :class="{
                            'border-red-400': errors.length > 0,
                          }"
                          class="h-full rounded-md spartan bg-white border-gray-300 border-2 focus-border-blue-200 spartan text-base appearance-none block w-full px-3 py-2 placeholder-gray-400 focus:outline-none sm:text-sm"
                          v-model="pin"
                        />

                        <span class="text-red-500 spartan mb-4">{{
                          errors[0]
                        }}</span>
                      </validation-provider>
                    </div>
                  </div>

                  <div
                    class="relative h-12 mb-6 flex block w-full text-left text-md font-medium  focus:outline-none"
                  >
                    <div class=" h-full ">
                      <validation-provider
                        rules="required|numeric"
                        v-slot="{ errors }"
                      >
                        <input
                          id="confirmPin"
                          name="confirmPin"
                          placeholder="Confirm Pin"
                          type="number"
                          :class="{
                            'border-red-400': errors.length > 0,
                          }"
                          class="h-full rounded-md spartan bg-white border-gray-300 border-2 focus-border-blue-200 spartan text-base appearance-none block w-full px-3 py-2 placeholder-gray-400 focus:outline-none sm:text-sm"
                          v-model="confirmPin"
                        />

                        <span class="text-red-500 spartan mb-4">{{
                          errors[0]
                        }}</span>
                      </validation-provider>
                    </div>
                  </div>

                  <!-- -------------------------------Merge secrets------------------------------- -->
                  <div class="flexmt-4">
                    <button class="hidden" id="reset2" type="reset">
                      Reset
                    </button>
                    <div
                      :disabled="invalid"
                      :class="[invalid ? 'opacity-25' : 'opacity-100']"
                      class="bg-blue-200 h-12  w-full rounded-md flex items-center spartan justify-center cursor-pointer"
                    >
                      <span
                        class="text-white text-base font-semi-bold cursor-pointer"
                        >Save</span
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

@Component
export default class AddWithdrawalAccount extends Vue {
  private mounted() {
    Log.info("isModalOpen: " + JSON.stringify(this.isModalOpen));
  }

  @Prop()
  private isModalOpen!: boolean;
  private close() {
    // this.isModalOpen = false;
    this.$emit("close");
  }

  private pin = "";
  private confirmPin = "";
  private savePin() {
    Log.info(this.pin);
    this.close();
  }
}
</script>

<style scoped></style>

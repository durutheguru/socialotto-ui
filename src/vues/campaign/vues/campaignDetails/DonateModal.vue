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
                      class="relative group py-4 px-6 flex items-start space-x-3 hover:bg-gray-100 block w-full px-4 border-t border-gray-100 text-left text-xs font-medium text-ob-purple-color focus:outline-none"
                    >
                      <div class="min-w-0 flex-1">
                        <input type="text" v-model="amount" />
                      </div>
                    </div>

                    <!-- -------------------------------Merge secrets------------------------------- -->
                    <div
                      class="relative group py-4 px-6 flex items-start space-x-3 hover:bg-gray-100 block w-full px-4 border-t border-gray-100 text-left text-xs font-medium text-ob-purple-color focus:outline-none"
                    >
                      <div class="min-w-0 flex-1 ">
                        <div class="text-sm font-medium text-gray-900">
                          <a href="#">
                            <span
                              class="absolute inset-0"
                              aria-hidden="true"
                            ></span>
                            Merge on onboard
                          </a>
                        </div>
                        <p class="text-xs text-gray-500">
                          This action will merge all secrets for this project to
                          onboard
                        </p>
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
}
</script>

<style scoped></style>

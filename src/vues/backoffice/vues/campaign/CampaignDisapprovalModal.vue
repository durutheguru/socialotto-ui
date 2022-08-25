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
            <div class="flex flex-col h-full p-8">
              <div class="h-7 flex items-center ">
                <button
                  @click="close"
                  aria-label="Close panel"
                  class="ml-auto cursor-pointer transition ease-in-out duration-150 focus:outline-none"
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
              <!-- <div class="flex-1 h-full flex flex-col"> -->
              <div class="flex items-center justify-between mb-4 mx-auto">
                <div class="">
                  <h2
                    class="text-lg  leading-7 font-medium light-blue-text spartan mb-0"
                  >
                    Are you sure ?
                  </h2>
                </div>
              </div>

              <div class=" flex flex-col justify-between h-full ">
                <!-- --------------------------Replace all secrets on netlify------------------------------- -->

                <!-- -------------------------------Merge secrets------------------------------- -->
                <div class="flex  ">
                  <div
                    @click="close"
                    class="bg-red-500 h-12  w-full mr-4 rounded-md flex items-center spartan justify-center cursor-pointer"
                  >
                    <span
                      class="text-white text-base font-semi-bold cursor-pointer"
                      >Cancel</span
                    >
                  </div>
                  <div
                    @click="disapproveCampaign"
                    class="bg-blue-200 h-12  w-full rounded-md flex items-center spartan justify-center cursor-pointer"
                  >
                    <span
                      class="text-white text-base font-semi-bold cursor-pointer"
                      >Disapprove</span
                    >
                    <i class="ml-px fa fa-spinner fa-spin" v-if="loading"></i>
                  </div>
                </div>
                <!-- </validation-observer> -->
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
import { Component, Prop } from "vue-property-decorator";
import store from "@/store/index";
import { Constants, Log, Util } from "@/components/util";

import ApiResource from "@/components/core/ApiResource";
import BaseVue from "@/components/BaseVue";

@Component({
  name: "CampaignDisapprovalModal",
  //   props:{
  // 	  open: Boolean
  //   }
})
export default class CampaignDisapprovalModal extends BaseVue {
  @Prop()
  private isModalOpen!: boolean;

  @Prop()
  private loading!: boolean;

  private disapproveCampaign() {
    this.$emit("disapprove");
  }
  private close() {
    this.$emit("close");
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

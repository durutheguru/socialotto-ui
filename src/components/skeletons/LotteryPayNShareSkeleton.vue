<template>
  <div class="flex flex-col lg:ml-10 spartan border-t-2 ">
    <div>
      <div class="relative"></div>
    </div>

    <!-- -------------- -->

    <div class="flex flex-col  border-gray-200 pt-2">
      <!-- -------------- -->
      <div class="animate-pulse h-12 items-center flex  justify-between ">
        <div class="w-20 h-6"></div>
        <div class="w-20 h-6"></div>
      </div>
      <!-- ----------- -->
      <div class="animate-pulse h-12 items-center flex  justify-between ">
        <div class="w-20 h-6"></div>
        <div class="w-20 h-6"></div>
        <!-- <span class="text-sm font-medium text-gray-400">Closure date </span>
        <span class="text-base font-semibold text-gray-600 "
          >31st October, 2021</span
        > -->
      </div>
      <!-- ----------- -->
      <div class="animate-pulse h-12 items-center flex  justify-between ">
        <div class="w-20 h-6"></div>
        <div class="w-20 h-6"></div>
        <!-- <span class="text-sm font-medium text-gray-400"
          >Number of winners
        </span>
        <span class="text-base font-semibold text-gray-600 ">25</span> -->
      </div>
      <!-- ----------- -->
      <div class="animate-pulse h-12 items-center flex  justify-between ">
        <div class="w-20 h-6"></div>
        <div class="w-20 h-6"></div>
        <!-- <span class="text-sm font-medium text-gray-400"
          >Max number of entries
        </span>
        <span class="text-base font-semibold text-gray-600 ">100</span> -->
      </div>
      <!-- ----------- -->
      <div class="animate-pulse h-14 items-center flex  justify-between ">
        <div class="w-20 h-6"></div>
        <div class="w-20 h-6"></div>
        <!-- <span class="text-base font-semibold text-gray-600 "
          >Number of tickets (Cost N200 per ticket)</span
        > -->
      </div>
      <!-- ----------- -->

      <div class=" items-center flex flex-col sm:flex-row justify-between">
        <div
          class="animate-pulse relative grid grid-cols-3 bg-transparent border-2 border-yellow  h-14 w-full sm:w-5/12 mb-6 sm:mb-0 items-center justify-center rounded-md"
        >
          <button
            class="animate-pulse cursor-pointer text-base font-semibold flex justify-center h-full w-full items-center"
          >
            <!-- -----Minus------ -->
            <!-- <svg
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
            </svg> -->
          </button>
          <div
            class="animate-pulse border-r-2 border-l-2 border-yellow border-dashed text-base font-semibold flex justify-center h-full w-full items-center"
          >
            <!-- {{ ticketAmount }} -->
          </div>
          <button
            class="animate-pulse cursor-pointer text-base font-semibold flex justify-center h-full w-full items-center"
          >
            <!-- -----Plus------ -->

            <!-- <svg
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
            </svg> -->
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
          class="animate-pulse cursor-pointer flex bg-yellow h-14 w-full sm:w-6/12 items-center justify-center rounded-md"
        >
          <!-- <span class="text-base font-semibold text-white "
            >Pay N{{ price }}</span
          > -->
        </button>
      </div>

      <!-- ----------------- -->
      <div class="h-14 mt-6">
        <div
          class="animate-pulse bg-transparent border-2 border-gray-300 h-14  w-full rounded-md flex items-center  justify-center cursor-pointer"
        >
          <!-- <span class="text-base text-gray-400 font-semi-bold cursor-pointer"
            >Share</span
          > -->
        </div>
      </div>
      <!-- -------------- -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "LotteryPayNShareSkeleton",
})
export default class LotteryPayNShareSkeleton extends Vue {}
</script>

<style scoped></style>

<template>
  <div class="flex flex-col lg:ml-10 spartan border-t-2 ">
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
        <span class="text-base font-semibold text-gray-600 ">Wizkid</span>
      </div>
      <!-- ----------- -->
      <div class="h-12 items-center flex  justify-between ">
        <span class="text-sm font-medium text-gray-400">Closure date </span>
        <span class="text-base font-semibold text-gray-600 "
          >31st October, 2021</span
        >
      </div>
      <!-- ----------- -->
      <div class="h-12 items-center flex  justify-between ">
        <span class="text-sm font-medium text-gray-400"
          >Number of winners
        </span>
        <span class="text-base font-semibold text-gray-600 ">25</span>
      </div>
      <!-- ----------- -->
      <div class="h-12 items-center flex  justify-between ">
        <span class="text-sm font-medium text-gray-400"
          >Max number of entries
        </span>
        <span class="text-base font-semibold text-gray-600 ">100</span>
      </div>
      <!-- ----------- -->
      <div class="h-14 items-center flex  justify-between ">
        <span class="text-base font-semibold text-gray-600 "
          >Number of tickets (Cost N200 per ticket)</span
        >
      </div>
      <!-- ----------- -->

      <div class="h-14 items-center flex  justify-between">
        <div
          class="relative grid grid-cols-3 bg-transparent border-2 border-yellow  h-14 w-5/12 items-center justify-center rounded-md"
        >
          <button
            @click="decrement"
            :disabled="ticketAmount <= 0"
            :class="ticketAmount <= 0 && 'opacity-25'"
            class="text-base font-semibold flex justify-center h-full w-full items-center"
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
            :disabled="ticketAmount >= 10"
            :class="ticketAmount >= 10 && 'opacity-25'"
            class="text-base font-semibold flex justify-center h-full w-full items-center"
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
        <div
          class="flex bg-yellow h-14 w-6/12 items-center justify-center rounded-md"
        >
          <span class="text-base font-semibold text-white "
            >Pay N{{ price }}</span
          >
        </div>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "LotteryPayNShare",
})
export default class LotteryPayNShare extends Vue {
  private ticketAmount: number = 0;

  get price() {
    return this.ticketAmount * 100;
  }

  private increment() {
    this.ticketAmount++;
  }

  private decrement() {
    this.ticketAmount--;
  }
}
</script>

<style scoped></style>

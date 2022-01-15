<template>
  <div class="col-span-5 pt-20 px-10 h-screen overflow-y-auto">
    <div class="grid grid-cols-6">
      <div class="col-span-3">
        <div class="flex flex-col">
          <h1 class="mb-6 spartan fw-600 fs-32 text-black">
            Raise Lottery Expense
          </h1>
          <h2 style="color: #454545;" class="mb-6 spartan fs-20 fw-700 ">
            <span class="fs-20 fw-400">Lottery Title:</span>
            25 tickets to Wizkid’s concert
          </h2>
          <div class="mb-9 flex justify-between items-center">
            <h2 style="color: #454545;" class="spartan fs-20 fw-700 ">
              <span class="fs-20 fw-400">Lottery Id:</span>
              20211201
            </h2>
            <h2 style="color: #454545;" class="spartan fs-20 fw-700 ">
              <span class="fs-20 fw-400">Amount raised:</span>
              2,102,200
            </h2>
          </div>

          <div
            @click="addInput"
            class="mb-10 w-2/4 cursor-pointer bo-bg-dark-blue text-white flex h-14 rounded-md justify-center items-center"
          >
            <div class="flex items-center ">
              <SmallPlus />
              <span class="ml-4 spartan fw-500 fs-14">
                Add Expense
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div
            class="mb-10 flex justify-between"
            v-for="number in inputsArray"
            :key="number"
          >
            <RaiseExpenseInput />
            <div class="flex items-center cursor-pointer h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="bg-blue-200 col-span-3 h-14 rounded-md mt-2 flex items-center justify-center"
        >
          <span class="text-white spartan fs-16 fw-600">Evaluate</span>
        </div>
      </div>
      <!-- ---------- -->
      <div class="col-span-3 ">
        <RaiseExpenseAmountPlate />
      </div>
    </div>

    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Log } from "@/components/util";
import RaiseExpenseInput from "./raiseExpenseInputs.vue";
import { Component, Vue } from "vue-property-decorator";
import SmallPlus from "@/components/svg/SmallPlus.vue";
import RaiseExpenseAmountPlate from "./expenseAmountPlates.vue";
@Component({
  name: "RaiseLotteryExpense",
  components: {
    SmallPlus,
    RaiseExpenseAmountPlate,
    RaiseExpenseInput,
  },
})
export default class RaiseLotteryExpense extends Vue {
  // private
  private counter = 0;
  // private get currentCount() {
  //   return this.counter;
  // }
  // private inputModel = "vmodel" + this.currentCount;

  private inputsArray = [this.counter];

  private addInput() {
    this.counter++;
    this.inputsArray.unshift(this.counter);
  }
}
</script>

<style scoped></style>

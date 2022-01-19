<template>
  <div class="w-full flex justify-end">
    <div class="px-4 pb-4 pt-8 mr-8 spartan rounded-md bg-white w-10/12  ">
      <div class="grid grid-cols-3">
        <div class="col-span-1">
          <div class="flex flex-col w-full">
            <h5 class="fw-600 fs-16 mb-4 mr-auto" style="color: #1D414B;">
              Amount
            </h5>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex flex-col w-full">
            <h5 class="fw-600 fs-16 mb-4 mx-auto" style="color: #1D414B;">
              Debit
            </h5>
          </div>
        </div>
        <div class="col-span-1">
          <div class="flex flex-col w-full">
            <h5 class="ml-auto fw-600 fs-16 mb-4" style="color: #1D414B;">
              Credit
            </h5>
          </div>
        </div>
        <div class="col-span-3 grid grid-cols-3">
          <div class="h-14 flex items-center">
            <h2 style="color: #4691A6;" class="fw-500 fs-12">N25000</h2>
          </div>
          <div class="h-14 flex flex-col justify-between items-center">
            <span style="color: #B9B9B9;" class="fs-12 fw-500"
              >Lottery Wallet</span
            >
            <h2 style="color: #4691A6;" class="fw-500 fs-12">01294756789</h2>
          </div>
          <div class="h-14 flex flex-col justify-between items-end">
            <span style="color: #B9B9B9;" class="fs-12 fw-500"
              >Lottery Wallet</span
            >
            <h2 style="color: #4691A6;" class="fw-500 fs-12">01294756789</h2>
          </div>
        </div>

        <div
          class="bg-blue-200 col-span-3 h-14 rounded-md mt-12 flex items-center justify-center"
        >
          <span class="text-white spartan fs-16 fw-600">Evaluate</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "RaiseExpenseAmountPlate",
  props: {
    settlement: Object,
  },
})
export default class RaiseExpenseAmountPlate extends Vue {}
</script>

<style scoped></style>

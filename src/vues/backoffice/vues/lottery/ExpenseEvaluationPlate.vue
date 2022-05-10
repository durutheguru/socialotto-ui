<template>
  <div v-if="show" class="w-full flex justify-end mb-10">
    <div class="px-4 pb-4 pt-8 mr-8 spartan rounded-md bg-white w-10/12  ">
      <div class="grid grid-cols-3">
        <div class="col-span-2">
          <div class=" w-full">
            <h5 class="fw-600 fs-16 mb-4 mr-auto" style="color: #1D414B;">
              Expense
            </h5>
          </div>
        </div>

        <div class="col-span-1">
          <div class="flex justify-end  w-full">
            <h5 class="ml-auto fw-600 fs-16 mb-4" style="color: #1D414B;">
              Credit
            </h5>
          </div>
        </div>
        <!-- ------------------------- -->

        <!-- -------------------- -->
        <div class="col-span-3">
          <div
            v-for="(expense, index) in expenses"
            :key="index"
            class="grid col-span-3 grid-cols-3 mb-3"
          >
            <div
              v-if="expense.description.length > 0 && expense.amount.length > 0"
              class="col-span-2 "
            >
              <span class="fw-400 fs-12 break-words " style="color: #B9B9B9;">{{
                expense.description
              }}</span>
            </div>
            <div
              v-if="expense.description.length > 0 && expense.amount.length > 0"
              class="col-span-1 flex justify-end items-center"
            >
              <span style="color: #4691A6;" class="fw-500 fs-12 ">{{
                expense.amount
              }}</span>
            </div>
          </div>
          <div class="pt-2 grid col-span-3 grid-cols-3">
            <div class="col-span-2 ">
              <span class="fw-700 fs-12 " style="color:#595959;">
                Total
              </span>
            </div>
            <div class="col-span-1 flex justify-end items-center">
              <span style="color: #4691A6;" class="fw-500 fs-12 ">{{
                total
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "EvaluationPlate",
  props: {
    expenses: Array,
    show: Boolean,
    total: Number,
  },
})
export default class EvaluationPlate extends Vue {}
</script>

<style scoped></style>

<template>
  <div v-if="show" class="w-full flex justify-end">
    <div style="" class="overflow-x-auto innerScrollBar w-full">
      <div
        class="plate-min-w   px-4 pb-4 pt-8 mx-auto spartan rounded-md bg-white plate-w "
      >
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
          <div
            v-for="(transfer, index) in transfers"
            :key="index"
            class="col-span-3"
          >
            <div class="col-span-3 grid grid-cols-3 mb-3">
              <div class="h-14 flex  items-center">
                <h2 style="color: #4691A6;" class="fw-500 fs-12">
                  &#x20A6;{{ formatCurrency(transfer.amount) }}
                </h2>
              </div>
              <div class="h-14 flex flex-col justify-between items-center">
                <div class="w-full px-2">
                  <p style="color: #B9B9B9;" class="fs-12 fw-500 truncate">
                    {{ transfer.sourceWalletName }}
                  </p>
                </div>
                <h2 style="color: #4691A6;" class="fw-500 expenseWalletID-fs">
                  {{ transfer.sourceWalletId }}
                </h2>
              </div>
              <div class="h-14 flex flex-col justify-between items-end">
                <div class="w-full pl-2">
                  <p
                    style="color: #B9B9B9;"
                    class="fs-12 fw-500 truncate text-right"
                  >
                    {{ transfer.destinationWalletName }}
                  </p>
                </div>
                <div class="w-full pl-2">
                  <p
                    style="color: #4691A6;"
                    class="fw-500 expenseWalletID-fs text-right"
                  >
                    {{ transfer.destinationWalletId }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            @click="$emit('newExpense')"
            class="bg-blue-200 col-span-3 h-14 rounded-md mt-12 flex items-center justify-center"
          >
            <span class="text-white spartan fs-16 fw-600">Raise Expense</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Constants, Util } from "@/components/util";

@Component({
  name: "RaiseExpenseAmountPlate",
  props: {
    transfers: Array,
    show: Boolean,
  },
})
export default class RaiseExpenseAmountPlate extends Vue {
  private formatCurrency(amount: number) {
    return Util.currencyFormatter(amount, Constants.currencyFormat);
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .plate-min-w {
    min-width: 550px;
  }
  /* .plate-w{
  width
} */
}
</style>

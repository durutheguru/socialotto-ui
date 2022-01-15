<template>
  <div class="grid grid-cols-3 w-full">
    <div class="col-span-2">
      <label
        for="Expense Details"
        class="spartan font-medium text-dark block text-sm text-gray-700"
        >Expense Details</label
      >
      <div class="mt-1">
        <input
          required
          type="text"
          v-model="expenseDetail"
          name="Expense Details"
          id="Expense Details"
          class="w-11/12 spartan h-12 bg-transparent border-gray-300 border-2  px-2  focus:border-blue-500 block sm:text-sm rounded-md"
          placeholder="Help a father of 3 with money for his "
          autocomplete="off"
        />
      </div>
    </div>
    <div class="col-span-1">
      <label
        for="Cost"
        class="spartan font-medium text-dark block text-sm text-gray-700"
        >Cost</label
      >
      <div class="mt-1 flex justify-between">
        <input
          required
          type="number"
          v-model="cost"
          name="Cost"
          id="cost"
          class=" spartan h-12 bg-transparent border-gray-300 border-2 px-2 focus:border-blue-500 block sm:text-sm rounded-md"
          placeholder="N200"
          autocomplete="off"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "RaiseExpenseInput",
})
export default class RaiseExpenseInput extends Vue {
  private expenseDetail: string = "";
  private cost: string = "";
}
</script>

<style scoped></style>

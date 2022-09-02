<template>
  <div class="flex flex-col mt-6">
    <div class="mb-6">
      <label
        for="value"
        style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
        class="animate-pulse block text-sm font-medium "
      >
      </label>
      <div class="mt-1">
        <input
          id="value"
          name="value"
          type="number"
          placeholder="value"
          autocomplete=""
          required
          readonly
          class="animate-pulse spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
        />
      </div>
    </div>

    <div class="mb-6">
      <label
        for="Amount Limit"
        style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
        class="animate-pulse block text-sm font-medium "
      >
      </label>
      <div class="mt-1">
        <input
          id="amountLimit"
          name="amountLimit"
          type="number"
          placeholder="amountLimit"
          autocomplete=""
          readonly
          required
          class="animate-pulse spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
        />
      </div>
    </div>

    <div class="mb-6">
      <label
        for="Bank Name"
        style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
        class="animate-pulse block text-sm font-medium "
      >
      </label>

      <!-- --------- -->
      <div class="mt-1">
        <div
          class="animate-pulse cursor-pointer relative flex border-gray-300 border-2 border-blue-dark  rounded-md h-10"
        >
          <input
            readonly
            id="bankName"
            name="bankName"
            type="text"
            placeholder="bankName"
            autocomplete=""
            class="animate-pulse cursor-pointer spartan bg-transparent appearance-none block w-full px-3 py-2placeholder-gray-400 focus:outline-none sm:text-sm"
          />
        </div>
      </div>
      <!-- -------------- -->
    </div>

    <div class="mb-6">
      <label
        for="Account Number"
        style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
        class="animate-pulse block text-sm font-medium "
      >
      </label>
      <div class="mt-1">
        <input
          id="accountNumber"
          name="accountNumber"
          type="number"
          placeholder="accountNumber"
          autocomplete=""
          readonly
          required
          class="animate-pulse spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        style="background-color: #4691A6;"
        class="animate-pulse buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <!-- <i
                class="ml-px fa fa-spinner fa-spin"
                v-if="userLogin.loading"
              ></i> -->
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "EmptyUserSettlement",
})
export default class extends Vue {}
</script>

<style scoped></style>

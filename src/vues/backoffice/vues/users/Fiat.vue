<template>
  <div class="flex flex-col mt-6">
    <div class="mb-6">
      <label
        for="Amount Limit"
        style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
        class="block text-sm font-medium "
      >
        Amount Limit
      </label>
      <div class="mt-1">
        <input
          id="amountLimit"
          name="amountLimit"
          type="text"
          placeholder="amountLimit"
          autocomplete=""
          v-model="fiat.amountLimit"
          required
          class="spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
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
        class="block text-sm font-medium "
      >
        Bank Name
      </label>
      <div class="mt-1">
        <input
          id="bankName"
          name="bankName"
          type="text"
          placeholder="bankName"
          autocomplete=""
          v-model="fiat.bankName"
          required
          class="spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
        />
      </div>
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
        class="block text-sm font-medium "
      >
        Account Number
      </label>
      <div class="mt-1">
        <input
          id="accountNumber"
          name="accountNumber"
          type="text"
          placeholder="accountNumber"
          autocomplete=""
          v-model="fiat.accountNumber"
          required
          class="spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        style="background-color: #4691A6;"
        class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save
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
  name: "Fiat",
})
export default class Fiat extends Vue {
  private fiat = {
    amountLimit: "",
    bankName: "",
    accountNumber: "",
  };
}
</script>

<style scoped></style>

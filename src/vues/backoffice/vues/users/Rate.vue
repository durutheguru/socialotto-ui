<template>
  <div class="flex flex-col mt-6">
    <validation-observer
      ref="observer"
      tag="form"
      role="form"
      v-slot="{ invalid }"
      class="space-y-6"
      @submit.prevent="contractSave"
      novalidate
    >
      <div class="mb-6">
        <label
          for="value"
          style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
          class="block text-sm font-medium "
        >
          Value
        </label>
        <div class="mt-1">
          <validation-provider rules="required|numeric" v-slot="{ errors }">
            <input
              id="value"
              name="value"
              type="number"
              placeholder="value"
              autocomplete=""
              v-model="rate.value"
              required
              :class="{
                'border-red-400': errors.length > 0,
              }"
              class="spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
            />
            <span class="text-red-500 spartan">{{ errors[0] }}</span>
          </validation-provider>
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
          class="block text-sm font-medium "
        >
          Amount Limit
        </label>
        <div class="mt-1">
          <validation-provider rules="required|numeric" v-slot="{ errors }">
            <input
              id="amountLimit"
              name="amountLimit"
              type="number"
              placeholder="amountLimit"
              autocomplete=""
              v-model="rate.amountLimit"
              :class="{
                'border-red-400': errors.length > 0,
              }"
              required
              class="spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
            />
            <span class="text-red-500 spartan">{{ errors[0] }}</span>
          </validation-provider>
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

        <!-- --------- -->
        <div class="mt-1">
          <div
            @click="toggle"
            class="cursor-pointer relative flex border-gray-300 border-2 border-blue-dark  rounded-md h-10"
          >
            <input
              readonly
              v-model="bankInfo.bankName"
              id="bankName"
              name="bankName"
              type="text"
              placeholder="bankName"
              autocomplete=""
              class="cursor-pointer spartan bg-transparent appearance-none block w-full px-3 py-2placeholder-gray-400 focus:outline-none sm:text-sm"
            />

            <div class="cursor-pointer inset-y-0 my-auto mr-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="relative bg-white z-20" v-if="openMenu">
            <ul
              class="py-2 absolute w-full rounded-md shadow-md bg-white spartan text-sm"
            >
              <li
                class="cursor-pointer hover:bg-gray-50 py-1.5 px-2"
                @mousedown="selectBankInfo(bankInfo)"
                v-for="(bankInfo, index) in bankInfoArray"
                :key="index"
              >
                {{ bankInfo.bankName }}
              </li>
            </ul>
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
          class="block text-sm font-medium "
        >
          Account Number
        </label>
        <div class="mt-1">
          <validation-provider rules="required|numeric" v-slot="{ errors }">
            <input
              id="accountNumber"
              name="accountNumber"
              type="number"
              placeholder="accountNumber"
              autocomplete=""
              v-model="rate.accountNumber"
              :class="{
                'border-red-400': errors.length > 0,
              }"
              required
              class="spartan border-gray-300 border-2 border-blue-dark bg-transparent appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm"
            />
            <span class="text-red-500 spartan">{{ errors[0] }}</span>
          </validation-provider>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :class="
            (invalid || loading || bankInfo.bankName.length === 0) &&
              'opacity-25'
          "
          :disabled="invalid || loading || bankInfo.bankName.length === 0"
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
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { saveContract } from "@/services/users/users.mutation";
import { Log, Constants, Util } from "@/components/util";
import { ApolloError } from "apollo-client";
import gql from "graphql-tag";

// import { getUserCashoutInfo } from "@/services/users/users.query";

@Component({
  name: "Rate",
  props: {
    username: String,
    name: String,
  },
  apollo: {
    getUserCashoutInfo: {
      query: gql`
        query getUserCashoutInfo($username: String, $email: String) {
          fetchUserWalletInfo(username: $username) {
            bankCode
            accountNumber
          }

          fetchBanks {
            bankCode
            bankName
          }

          fetchContract(username: $email) {
            username
            chargeType
            value
            cap
          }
        }
      `,
      variables() {
        return {
          username: this.name,
          email: this.username,
        };
      },
      update(data) {
        Log.info("cash info Query: " + JSON.stringify(data));

        return data;
      },
      result({ data, loading, networkStatus }) {
        Log.info("cash info Query: " + JSON.stringify(data));
        // this.bankInfoArray = data.fetchBanks;
      },
      error(error) {
        this.rate.error = Util.extractGqlError(error);
        if (Util.isValidString(this.rate.error)) {
          // this.$apollo.queries.getUserCashoutInfo.refetch();
        }
      },
    },
  },
})
export default class Rate extends Vue {
  @Prop()
  private username!: string;
  @Prop()
  private name!: string;

  private loading = false;
  private rate = {
    value: "",
    amountLimit: null,
    bankName: "",
    accountNumber: "",
    username: this.username,
    error: "",
  };
  private openMenu = false;

  private toggle() {
    this.openMenu = !this.openMenu;
  }

  private bankInfo = { bankName: "", bankCode: "" };
  private bankInfoArray = [];
  private selectBankInfo(info: any) {
    this.bankInfo = info;
    this.openMenu = false;

    Log.info(this.bankInfo.bankCode);
  }

  private prepareDetails() {
    const info = {
      input: {
        username: this.rate.username,
        chargeType: "PERCENTAGE",
        value: this.rate.value,
        cap: this.rate.amountLimit,
      },

      walletData: {
        bankCode: this.bankInfo.bankCode,
        accountNumber: this.rate.accountNumber,
      },
    };

    return info;
  }

  private contractSave() {
    this.loading = true;
    Log.info("detail: " + JSON.stringify(this.prepareDetails()));

    this.$apollo
      .mutate({
        mutation: saveContract,
        variables: this.prepareDetails(),
      })
      .then((data: any) => {
        this.loading = false;
        Log.info("data: " + String(data));
        Util.handleGlobalAlert(true, "success", "Successfully saved rate");
        // this.$router.push(`/back-office/lotteries`);
      })
      .catch((error) => {
        this.loading = false;
        Log.error(error);
        // const resError = error.errors[0].message;
        Util.handleGlobalAlert(true, "failed", Util.extractGqlError(error));
      });
  }
}
</script>

<style scoped></style>

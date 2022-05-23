<template>
  <div class="pb-56 w-full pt-20 px-6 h-screen overflow-y-auto">
    <div class="grid grid-cols-6 gap-8">
      <validation-observer
        ref="observer"
        tag="form"
        role="form"
        v-slot="{ invalid }"
        @submit.prevent="evaluate"
        novalidate
        class="col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3"
      >
        <div class="flex flex-col">
          <h1 class="mb-6 spartan fw-600 fs-32 text-black">
            Raise Lottery Expense
          </h1>
          <h2 style="color: #454545;" class="mb-6 spartan fs-20 fw-700 ">
            <span class="fs-20 fw-400">Lottery Title:</span>
            {{ detailsQuery.details.name }}
          </h2>
          <div
            class="mb-9 flex flex-col   md:flex-row justify-between md:items-center"
          >
            <h2
              style="color: #454545;"
              class="spartan fs-20 fw-700 mb-6 md:mb-0 "
            >
              <span class="fs-20 fw-400">Lottery Id:</span>
              {{ lotteryId }}
            </h2>
            <h2 style="color: #454545;" class="spartan fs-20 fw-700 md:mb-0">
              <span class="fs-20 fw-400">Amount raised:</span>
              &#x20A6;{{
                formatCurrency(detailsQuery.details.totalFundsRaised)
              }}
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
            v-for="(input, index) in inputArray"
            :key="index"
          >
            <!-- <RaiseExpenseInput /> -->
            <div class="flex w-11/12">
              <div class="w-9/12">
                <validation-provider rules="required" v-slot="{ errors }">
                  <label
                    for="Expense Details"
                    class="spartan font-medium text-dark block text-sm text-gray-700"
                    >Expense Details</label
                  >
                  <div class="mt-1">
                    <input
                      required
                      type="text"
                      v-model="input.description"
                      name="Expense Details"
                      :disabled="evaluateQuery.loading"
                      id="Expense Details"
                      :class="{
                        'border-red-400': errors.length > 0,
                      }"
                      class="w-11/12 spartan h-12 bg-transparent border-gray-300 border-2  px-2  focus:border-blue-500 block sm:text-sm rounded-md"
                      placeholder="Help a father of 3 with money for his "
                      autocomplete="off"
                    />
                  </div>
                  <span class="text-red-500 spartan">{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="w-4/12">
                <validation-provider rules="required" v-slot="{ errors }">
                  <label
                    for="Cost"
                    class="spartan font-medium text-dark block text-sm text-gray-700"
                    >Cost</label
                  >
                  <div class="mt-1 ">
                    <input
                      required
                      type="number"
                      v-model="input.amount"
                      name="amount"
                      id="cost"
                      :disabled="evaluateQuery.loading"
                      :class="{
                        'border-red-400': errors.length > 0,
                      }"
                      class="w-full spartan h-12 bg-transparent border-gray-300 border-2 px-2 focus:border-blue-500 block sm:text-sm rounded-md"
                      placeholder="N200"
                      autocomplete="off"
                    />
                  </div>
                  <span class="text-red-500 spartan">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>

            <!-- ---------------- -->
            <div
              @click="removeInput(index)"
              class="flex items-center cursor-pointer h-12 mt-auto"
            >
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
        <button
          type="submit"
          :disabled="invalid || evaluateQuery.loading"
          :class="(invalid || evaluateQuery.loading) && 'opacity-25'"
          class="bg-blue-200 w-full col-span-3 h-14 rounded-md mt-2 flex items-center justify-center"
        >
          <span class="text-white spartan fs-16 fw-600">Evaluate</span>
          <i
            class="ml-px fa fa-spinner fa-spin"
            v-if="evaluateQuery.loading"
          ></i>
        </button>
      </validation-observer>
      <!-- ---------- -->
      <div
        class="col-span-6 md:col-span-5 lg:col-span-4 xl:col-span-3 mt-12 md:mt-0 "
      >
        <EvaluationPlate :expenses="inputArray" :show="show" :total="total" />
        <RaiseExpenseAmountPlate
          :show="show"
          @newExpense="newExpenseMutation"
          :transfers="this.evaluateQuery.transfers"
        />
      </div>
    </div>

    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { Log, Constants, Util } from "@/components/util";
import RaiseExpenseInput from "./raiseExpenseInputs.vue";
import { Component, Vue } from "vue-property-decorator";
import SmallPlus from "@/components/svg/SmallPlus.vue";
import RaiseExpenseAmountPlate from "./expenseAmountPlates.vue";
import { ApolloError } from "apollo-client";
import EvaluationPlate from "./ExpenseEvaluationPlate.vue";
import { evaluateSettlement } from "@/services/lottery/lottery.query";
import { lotteryById } from "@/services/lottery/lottery.query";

import { newLotteryExpense } from "@/services/campaign/campaign.mutation";
@Component({
  name: "RaiseLotteryExpense",
  apollo: {
    // $client: "anonymousClient",
    evaluateSettlement: {
      query: evaluateSettlement,
      variables() {
        return {
          lotteryId: this.evaluateQuery.id,
          expense: this.evaluateQuery.expense,
        };
      },
      skip() {
        return this.evaluateQuery.skip;
      },
      result({ data }) {
        Log.info(
          "expense Query: " + JSON.stringify(data.evaluateSettlement.transfers)
        );

        this.evaluateQuery.transfers = data.evaluateSettlement.transfers;
        this.evaluateQuery.loading = false;
        this.show = true;
      },
      error(error: ApolloError) {
        this.evaluateQuery.loading = false;

        this.evaluateQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.evaluateQuery.error)) {
          this.$apollo.queries.evaluateSettlement.refetch();
        }
      },
    },
    lotteryById: {
      query: lotteryById,
      variables() {
        return {
          id: this.lotteryId,
        };
      },

      result({ data }) {
        Log.info("details Query: " + JSON.stringify(data.lotteryById));
        this.detailsQuery.details = data.lotteryById;
      },
      error(error: ApolloError) {
        this.detailsQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.detailsQuery.error)) {
          this.$apollo.queries.evaluateSettlement.refetch();
        }
      },
    },
  },
  components: {
    SmallPlus,
    RaiseExpenseAmountPlate,
    RaiseExpenseInput,
    EvaluationPlate,
  },
})
export default class RaiseLotteryExpense extends Vue {
  private evaluateQuery = {
    id: "",
    expense: 0,
    transfers: [],
    error: "",
    loading: false,
    skip: true,
  };

  private detailsQuery = {
    id: "",
    expense: 0,
    details: {},
    error: "",
    skip: true,
  };
  private lotteryId: any = this.$route.params.id;
  private inputArray = [
    {
      description: "",
      amount: "",
    },
  ];

  private total: number = 0;

  private removeInput(index: any) {
    if (this.inputArray.length > 1) {
      this.inputArray.splice(index, 1);
    }
  }

  private newExpenseMutation() {
    this.$apollo
      .mutate({
        mutation: newLotteryExpense,
        variables: {
          input: {
            lotteryId: this.lotteryId,
            breakdowns: this.inputArray,
          },
        },
      })
      .then((data: any) => {
        Log.info("data: " + String(data));
        Util.handleGlobalAlert(
          true,
          "success",
          "Successfully raised lottery expense"
        );
        this.$router.push(`/back-office/lotteries`);
      })
      .catch((error) => {
        Log.error(error);
        // const resError = error.errors[0].message;
        Util.handleGlobalAlert(true, "failed", Util.extractGqlError(error));
      });
  }

  private show = false;

  private addInput() {
    const obj = {
      description: "",
      amount: "",
    };

    if (this.inputArray.length < 10) {
      this.inputArray.unshift(obj);
    }
  }

  private formatCurrency(amount: number) {
    return Util.currencyFormatter(amount, Constants.currencyFormat);
  }

  private evaluate() {
    // this.expensesArray = this.inputArray;
    this.evaluateQuery.loading = true;

    const array = this.inputArray.map((obj) => Number(obj.amount));
    this.total = Number(array.reduce((a, b) => a + b));
    this.evaluateQuery.expense = this.total;
    this.evaluateQuery.id = this.lotteryId;

    Log.info("expense id:" + this.evaluateQuery.id);
    Log.info("expenseTotal:" + String(this.evaluateQuery.expense));
    // this.evaluateQuery.loading = false;
    // this.show = true;
    this.$apollo.queries.evaluateSettlement.skip = false;
    this.$apollo.queries.evaluateSettlement.refetch();
  }

  // private get expenses(): any {
  //   return this.expensesArray;
  // }
}
</script>

<style scoped></style>

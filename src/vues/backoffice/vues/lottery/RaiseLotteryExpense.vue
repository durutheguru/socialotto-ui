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
            v-for="(input, index) in inputArray"
            :key="index"
          >
            <!-- <RaiseExpenseInput /> -->
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
                    v-model="input.description"
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
                    v-model="input.amount"
                    name="amount"
                    id="cost"
                    class=" spartan h-12 bg-transparent border-gray-300 border-2 px-2 focus:border-blue-500 block sm:text-sm rounded-md"
                    placeholder="N200"
                    autocomplete="off"
                  />
                </div>
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
        <div
          @click="evaluate"
          class="bg-blue-200 col-span-3 h-14 rounded-md mt-2 flex items-center justify-center"
        >
          <span class="text-white spartan fs-16 fw-600">Evaluate</span>
        </div>
      </div>
      <!-- ---------- -->
      <div class="col-span-3 ">
        <EvaluationPlate :expenses="inputArray" :show="show" :total="total" />
        <RaiseExpenseAmountPlate
          @newExpense="newExpenseMutation"
          :transfers="this.evaluateQuery.treansfers"
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
import { newLotteryExpense } from "@/services/campaign/campaign.mutation";
@Component({
  name: "RaiseLotteryExpense",
  apollo: {
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

        this.evaluateQuery.treansfers = data.evaluateSettlement.transfers;
      },
      error(error: ApolloError) {
        this.evaluateQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.evaluateQuery.error)) {
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
  // private
  // private expensesArray: any = [];

  // private get currentCount() {
  //   return this.counter;
  // }
  // private inputModel = "vmodel" + this.currentCount;
  private evaluateQuery = {
    id: "",
    expense: 0,
    treansfers: [],
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

  private evaluate() {
    // this.expensesArray = this.inputArray;

    const array = this.inputArray.map((obj) => Number(obj.amount));
    this.total = Number(array.reduce((a, b) => a + b));
    this.evaluateQuery.expense = this.total;
    this.evaluateQuery.id = this.lotteryId;

    Log.info("expense id:" + this.evaluateQuery.id);
    Log.info("expenseTotal:" + String(this.evaluateQuery.expense));

    this.show = true;
    this.$apollo.queries.evaluateSettlement.skip = false;
    this.$apollo.queries.evaluateSettlement.refetch();
  }

  // private get expenses(): any {
  //   return this.expensesArray;
  // }
}
</script>

<style scoped></style>

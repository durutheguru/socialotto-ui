<template>
  <div
    class="spartan relative right-0 col-span-5 pt-20 pb-56 px-6 h-screen overflow-y-auto bg-blue-50"
  >
    <div
      v-if="$apollo.queries.getLotteryExpenseProposal.loading"
      class="h-full relative rounded-md flex items-center justify-center"
    >
      <div class="roundLoader opacity-50"></div>
    </div>

    <div v-else class="grid grid-cols-7">
      <div class="flex flex-col col-span-7 md:col-span-5 xl:col-span-4">
        <h1 class="mb-6 spartan fw-600 fs-32 text-black">
          Review Lottery Expense
        </h1>
        <h2 style="color: #454545;" class="mb-6 spartan fs-20 fw-700 ">
          <span class="fs-20 fw-400">Lottery Title:</span>
          {{ expenseProposal.data.expense.lotteryTitle }}
        </h2>
        <div
          class="mb-9 flex flex-col   md:flex-row justify-between md:items-center"
        >
          <h2 style="color: #454545;" class="spartan fs-20 fw-700 mb-6 md:mb-0">
            <span class="fs-20 fw-400 ">Lottery Id:</span>
            {{ expenseProposal.data.expense.lotteryId }}
          </h2>
          <h2 style="color: #454545;" class="spartan fs-20 fw-700 md:mb-0">
            <span class="fs-20 fw-400">Amount raised:</span>
            &#x20A6;{{
              formatCurrency(expenseProposal.data.expense.lotteryTotalFunds)
            }}
          </h2>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <div class="grid grid-cols-7">
        <div class="col-span-7 md:col-span-5 xl:col-span-4">
          <div class="w-full flex justify-start mb-10">
            <div class="px-4 pb-4 pt-8  spartan rounded-md bg-white w-full  ">
              <div class="grid grid-cols-3">
                <div class="col-span-2">
                  <div class=" w-full">
                    <h5
                      class="fw-600 fs-16 mb-4 mr-auto"
                      style="color: #1D414B;"
                    >
                      Expense
                    </h5>
                  </div>
                </div>

                <div class="col-span-1">
                  <div class="flex justify-end  w-full">
                    <h5
                      class="ml-auto fw-600 fs-16 mb-4"
                      style="color: #1D414B;"
                    >
                      Amount
                    </h5>
                  </div>
                </div>
                <!-- ------------------------- -->

                <!-- -------------------- -->
                <div
                  v-if="
                    expenseProposal.data.expenseBreakdowns &&
                      expenseProposal.data.expenseBreakdowns.length
                  "
                  class="col-span-3"
                >
                  <div
                    v-for="(breakdown, index) in expenseProposal.data
                      .expenseBreakdowns"
                    :key="index"
                    class="grid col-span-3 grid-cols-3 mb-3"
                  >
                    <div class="col-span-2 ">
                      <span
                        class="fw-400 fs-12 break-words "
                        style="color: #B9B9B9;"
                      >
                        {{ breakdown.description }}
                      </span>
                    </div>
                    <div class="col-span-1 flex justify-end items-center">
                      <span style="color: #4691A6;" class="fw-500 fs-12 ">
                        &#x20A6;{{ formatCurrency(breakdown.amount) }}
                      </span>
                    </div>
                  </div>
                  <div class="pt-2 grid col-span-3 grid-cols-3">
                    <div class="col-span-2 ">
                      <span class="fw-700 fs-12 " style="color:#595959;">
                        Total
                      </span>
                    </div>
                    <div class="col-span-1 flex justify-end items-center">
                      <span style="color: #4691A6;" class="fw-500 fs-12 ">
                        &#x20A6;{{
                          formatCurrency(expenseProposal.data.expense.amount)
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-7 md:col-span-5 xl:col-span-3">
          <div class="w-full flex justify-start">
            <div class="px-4 pb-4 pt-8 xl:ml-8 spartan  w-full  ">
              <div class="grid grid-cols-3">
                <div class="col-span-1">
                  <div class="flex flex-col w-full">
                    <h5
                      class="fw-600 fs-16 mb-4 mr-auto"
                      style="color: #1D414B;"
                    >
                      Amount
                    </h5>
                  </div>
                </div>
                <div class="col-span-1">
                  <div class="flex flex-col w-full">
                    <h5
                      class="fw-600 fs-16 mb-4 mx-auto"
                      style="color: #1D414B;"
                    >
                      Debit
                    </h5>
                  </div>
                </div>
                <div class="col-span-1">
                  <div class="flex flex-col w-full">
                    <h5
                      class="ml-auto fw-600 fs-16 mb-4"
                      style="color: #1D414B;"
                    >
                      Credit
                    </h5>
                  </div>
                </div>
                <div
                  v-for="(transfer, index) in evaluateQuery.transfers"
                  :key="index"
                  class="col-span-3"
                >
                  <div class="col-span-3 grid grid-cols-3 mb-3">
                    <div class="h-14 flex items-center">
                      <h2 style="color: #4691A6;" class="fw-500 fs-12">
                        &#x20A6;{{ formatCurrency(transfer.amount) }}
                      </h2>
                    </div>
                    <div
                      class="h-14 flex flex-col justify-between items-center"
                    >
                      <span style="color: #B9B9B9;" class="fs-12 fw-500">
                        {{ transfer.sourceWalletName }}
                      </span>
                      <h2 style="color: #4691A6;" class="fw-500 fs-12">
                        {{ transfer.sourceWalletId }}
                      </h2>
                    </div>
                    <div class="h-14 flex flex-col justify-between items-end">
                      <span style="color: #B9B9B9;" class="fs-12 fw-500">
                        {{ transfer.destinationWalletName }}
                      </span>
                      <h2 style="color: #4691A6;" class="fw-500 fs-12">
                        {{ transfer.destinationWalletId }}
                      </h2>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 col-span-3">
                  <div class="w-11/12">
                    <div
                      @click="newExpenseMutation('APPROVED')"
                      class="bg-blue-200 col-span-1 w-full h-12 rounded-md mt-12 flex items-center justify-center"
                    >
                      <span class="text-white spartan fs-16 fw-600"
                        >Approve</span
                      >
                    </div>
                  </div>
                  <div class="w-11/12 ml-auto">
                    <div
                      @click="newExpenseMutation('DISAPPROVED')"
                      style="border: 1px solid #FF0000; border-radius: 8px;"
                      class="bg-transparent col-span-1 w-full h-12 mt-12 flex items-center justify-center"
                    >
                      <span
                        style="color: #FF0000;"
                        class=" spartan fs-16 fw-600"
                        >Decline</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getLotteryExpenseProposal } from "@/services/lottery/lottery.query";
import { ApolloError } from "apollo-client";
import { Log, Constants, Util } from "@/components/util";
import { evaluateSettlement } from "@/services/lottery/lottery.query";
import { LotteryExpenseAction } from "@/services/lottery/lottery.mutation";
@Component({
  name: "ReviewLotteryExpense",
  apollo: {
    getLotteryExpenseProposal: {
      query: getLotteryExpenseProposal,
      variables() {
        return {
          expenseId: this.expenseProposal.expenseId,
        };
      },
      result({ data }) {
        Log.info("expense proposal: " + JSON.stringify(data));

        this.expenseProposal.data = data.getLotteryExpenseProposal;
        this.evaluateQuery.id = this.expenseProposal.data.expense.id;
        this.evaluateQuery.lotteryId = this.expenseProposal.data.expense.lotteryId;
        this.evaluateQuery.amount = this.expenseProposal.data.expense.amount;

        this.$apollo.queries.evaluateSettlement.skip = false;
        this.$apollo.queries.evaluateSettlement.refetch();
      },
      error(error: ApolloError) {
        this.expenseProposal.error = Util.extractGqlError(error);
        if (Util.isValidString(this.expenseProposal.error)) {
          this.$apollo.queries.getLotteryExpenseProposal.refetch();
        }
      },
    },
    evaluateSettlement: {
      query: evaluateSettlement,
      variables() {
        return {
          lotteryId: this.evaluateQuery.lotteryId,
          expense: this.evaluateQuery.amount,
        };
      },
      skip() {
        return this.evaluateQuery.skip;
      },
      result({ data }) {
        Log.info(
          "evaluate settlement: " +
            JSON.stringify(data.evaluateSettlement.transfers)
        );

        this.evaluateQuery.transfers = data.evaluateSettlement.transfers;
      },
      error(error: ApolloError) {
        this.evaluateQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.evaluateQuery.error)) {
          this.$apollo.queries.evaluateSettlement.refetch();
        }
      },
    },
  },
})
export default class ReviewLotteryExpense extends Vue {
  private expenseProposal: any = {
    // key: "",
    expenseId: this.$route.params.id,

    data: [],
    error: "",
  };

  private evaluateQuery = {
    id: "",
    lotteryId: "",
    amount: 0,
    transfers: [],
    error: "",
    skip: true,
  };

  private formatCurrency(amount: number) {
    return Util.currencyFormatter(amount, Constants.currencyFormat);
  }

  private newExpenseMutation(actn: string) {
    this.$apollo
      .mutate({
        mutation: LotteryExpenseAction,
        variables: {
          input: {
            lotteryExpenseId: this.evaluateQuery.id,
            action: actn,
          },
        },
      })
      .then((data: any) => {
        Log.info("data: " + String(data));
        Util.handleGlobalAlert(true, "success", `Successfully ${actn}`);
        this.$router.push(`/back-office/expense_requests`);
      })
      .catch((error) => {
        Log.error(error);
        // const resError = error.errors[0].message;
        Util.handleGlobalAlert(true, "failed", Util.extractGqlError(error));
      });
  }
}
</script>

<style scoped></style>

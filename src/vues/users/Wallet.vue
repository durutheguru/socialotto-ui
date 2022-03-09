<template>
  <div class="flex spartan flex-col items-center justify-center mt-12 mb-20">
    <WalletBalanceCardLoading
      v-if="$apollo.queries.viewWalletBalances.loading"
    />
    <div
      v-else
      style="
        background: linear-gradient(137.03deg, #4691A6 29.77%, #2C5662 87.65%);
        border-radius: 12px;
        width: 50rem
	      "
      class="spartan flex items-center justify-between py-4 px-6 "
    >
      <div class="flex flex-col justify-between  mr-4 w-60">
        <span class="text-white fw-400 fs-16 mb-2">Wallet Balance</span>
        <h1 class="fw-700 fs-32 text-white mb-0">
          {{ userWalletQuery.walletBalance }}
        </h1>
      </div>

      <div class="flex-col w-80">
        <div
          @click="openAddWithdrawalModal"
          class="br-12 h-12 cursor-pointer flex items-center justify-center mb-4"
          style="border: 1px solid #FFFFFF;"
        >
          <span class="text-white fw-500 fs-16">Set withdrawal account</span>
        </div>

        <div class="flex justify-between">
          <div
            @click="openWithdrawFundsModal"
            class="px-7 py-2.5 bg-white cursor-pointer w-6/12 br-12 flex justify-center"
          >
            <span class="fw-500 fs-16" style="color: #3C798A;">Withdraw</span>
          </div>
          <div
            @click="openModal"
            style="background-color: #CDE4EA;"
            class=" py-2.5  cursor-pointer flex justify-center w-5/12 br-12"
          >
            <span class="fw-500 fs-16 mr-2" style="color: #3C798A;"
              >Set PIN</span
            >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="#2D5763"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div style="width: 50rem" class="">
      <h1 style="color: #2D5763;" class="fw-600 fs-20 mt-6">
        Transaction History
      </h1>
      <div class="mt-4 br-12 bg-white grid grid-cols-3 gap-2 p-4">
        <div class="col-span-1 flex flex-col justify-between">
          <span style="color: #4792A6" class="fs-12 fw-400 mb-1"
            >Source Wallet</span
          >
          <span style="color: #4F4F4F" class="fs-16 fw-500 mb-1"
            >Samuel Umoru</span
          >
          <span style="color: #333333" class="fs-20 fw-600">1989JDFHBVC</span>
        </div>

        <!-- ----------------- -->
        <div class="col-span-1 flex flex-col justify-between">
          <span style="color: #4792A6" class="fs-12 fw-400 mb-1"
            >Destination</span
          >
          <span style="color: #4F4F4F" class="fs-16 fw-500 mb-1"
            >Union Bank</span
          >
          <span style="color: #333333" class="fs-20 fw-600">0937263847</span>
        </div>
        <!-- ------------------- -->
        <div class="col-span-1 flex flex-col justify-between">
          <span style="color: #4792A6" class="fs-12 fw-400 mb-1"
            >23 February 2022</span
          >
          <span style="color: #4F4F4F" class="fs-16 fw-500 mb-1">Amount</span>
          <span style="color: #333333" class="fs-20 fw-600">N21,500, 000</span>
        </div>
        <!-- ------------------- -->
      </div>
    </div>
    <create-pin :isModalOpen="open" @close="closeModal" />
    <add-withdrawal-account
      :isModalOpen="openAddWithdrawal"
      @close="closeAddWithdrawalModal"
    />

    <withdraw-funds
      :isModalOpen="openWithdrawFunds"
      @close="closeWithdrawFundsModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ApolloError } from "apollo-client";
import { viewWalletBalances } from "@/services/users/users.query";
import { getAllWalletTransactions } from "@/services/users/users.query";
import { Log, Util } from "@/components/util";
import store from "@/store/index";
import WalletBalanceCardLoading from "./WalletBalanceCardLoading.vue";
import CreatePin from "./CreatePin.vue";
import AddWithdrawalAccount from "./AddWithdrawalAccount.vue";
import WithdrawFunds from "./WithdrawFunds.vue";
@Component({
  name: "Wallet",
  apollo: {
    // $client: "anonymousClient",
    viewWalletBalances: {
      query: viewWalletBalances,
      variables() {
        return {
          userType: this.userWalletQuery.userType,
          username: this.userWalletQuery.username,
        };
      },
      result({ data }) {
        Log.info("Search User Wallet Query: " + JSON.stringify(data));

        this.userWalletQuery.walletBalance = data?.viewWalletBalances;

        Log.info(
          "User Query wallet balance: " +
            JSON.stringify(this.userWalletQuery.walletBalance)
        );
      },
      error(error: ApolloError) {
        this.userWalletQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.userWalletQuery.error)) {
          Log.info("WalletBalance Error" + JSON.stringify(error));
          // this.$apollo.queries.viewWalletBalances.refetch();
        }
      },
    },
    getAllWalletTransactions: {
      query: getAllWalletTransactions,
      variables() {
        return {
          userType: this.userWalletTransactionsQuery.userType,
          username: this.userWalletTransactionsQuery.username,
        };
      },
      result({ data }) {
        Log.info(
          "Search userWalletTransactionsQuery Query: " + JSON.stringify(data)
        );

        this.userWalletTransactionsQuery.walletBalance =
          data?.getAllWalletTransactions;

        Log.info(
          "User Query wallet balance: " +
            JSON.stringify(this.userWalletTransactionsQuery.walletBalance)
        );
      },
      error(error: ApolloError) {
        this.userWalletTransactionsQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.userWalletTransactionsQuery.error)) {
          Log.info("WalletBalance Error" + JSON.stringify(error));
          // this.$apollo.queries.getAllWalletTransactions.refetch();
        }
      },
    },
  },
  components: {
    WalletBalanceCardLoading,
    CreatePin,
    AddWithdrawalAccount,
    WithdrawFunds,
  },
})
export default class Wallet extends Vue {
  private username = store.getters["authToken/username"];
  private userType = store.getters["authToken/authorizations"][0];
  private userWalletQuery: any = {
    username: this.username,
    userType: this.userType,
    walletBalance: null,
    data: {},
    error: "",
  };

  private userWalletTransactionsQuery: any = {
    username: this.username,
    userType: this.userType,

    data: {},
    error: "",
  };

  private open = false;
  private openModal() {
    this.open = true;
  }
  private closeModal() {
    this.open = false;
  }

  private openWithdrawFunds = false;
  private openWithdrawFundsModal() {
    this.openWithdrawFunds = true;
  }
  private closeWithdrawFundsModal() {
    this.openWithdrawFunds = false;
  }

  private openAddWithdrawal = false;
  private openAddWithdrawalModal() {
    this.openAddWithdrawal = true;
  }
  private closeAddWithdrawalModal() {
    this.openAddWithdrawal = false;
  }
}
</script>

<style scoped></style>

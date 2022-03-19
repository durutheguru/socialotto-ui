<template>
  <div class="flex spartan flex-col items-center justify-center mt-12 mb-20">
    <WalletBalanceCardLoading v-if="loading" />
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
          {{ userWalletQuery.walletBalance[0].balance }}
        </h1>
      </div>

      <div class="flex-col w-80">
        <div class="flex justify-between">
          <div
            @click="openWithdrawFundsModal"
            class="px-7 py-2.5 bg-white cursor-pointer w-6/12 br-12 flex justify-center">
            <span class="fw-500 fs-16" style="color: #3C798A;">Withdraw</span>
          </div>
          <div
            @click="openEditWithdrawalModal"
            style="background-color: #CDE4EA;"
            class=" py-2.5  cursor-pointer flex justify-center w-5/12 br-12">
            <span class="fw-500 fs-16 mr-2" style="color: #3C798A;">
              <i class="fa bigger-font fa-gear"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div style="width: 50rem" class="">
      <h1 style="color: #2D5763;" class="fw-600 fs-20 mt-6">
        Transaction History
      </h1>
      <div v-if="$apollo.queries.getAllWalletTransactions.loading">
        Loading...
      </div>
      <div v-else>
        <div
          v-for="transaction in userWalletTransactionsQuery.data"
          :key="transaction.reference"
          class="mt-4 br-12 bg-white grid grid-cols-3 gap-2 p-4"
        >
          <div class="col-span-1 flex flex-col justify-between">
            <span style="color: #4792A6" class="fs-12 fw-400 mb-1"
              >Source Wallet</span
            >
            <span style="color: #4F4F4F" class="fs-14 fw-500 mb-1">{{
              transaction.sourceWalletName
            }}</span>
            <span style="color: #333333" class="wine fs-28 fw-600">{{
              transaction.sourceWalletId
            }}</span>
          </div>

          <!-- ----------------- -->
          <div class="col-span-1 flex flex-col justify-between ml-4">
            <span style="color: #4792A6" class="fs-12 fw-400 mb-1"
              >Destination</span
            >
            <span style="color: #4F4F4F" class="fs-14 fw-500 mb-1">{{
              transaction.destinationWalletName
            }}</span>
            <span style="color: #333333" class="blue fs-28 fw-600">{{
              transaction.destinationWalletId
            }}</span>
          </div>
          <!-- ------------------- -->
          <div class="col-span-1 flex flex-col justify-between ml-4">
            <span style="color: #4792A6" class="fs-12 fw-400 mb-1">{{
              zoneDateTimeMoment(transaction.transactionDateTime)
            }}</span>
            <span style="color: #4F4F4F" class="fs-14 fw-500 mb-1">Amount</span>
            <span style="color: #333333" class="fs-28 fw-600"
              >N{{ transaction.amount }}</span
            >
          </div>
          <!-- ------------------- -->
        </div>
      </div>
    </div>
    <create-pin :isModalOpen="open" @close="closeModal" />

    <edit-withdrawal-info
      :isModalOpen="openEditWithdrawal"
      :walletId="userWalletId"
      :banks="banksList"
      :username="username"
      @close="closeEditWithdrawalModal"
    />

    <withdraw-funds
      :isModalOpen="openWithdrawFunds"
      :banks="banksList"
      @close="closeWithdrawFundsModal"
    />

    <wallet-update-approval />

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ApolloError } from "apollo-client";
import { fetchBanks } from "@/services/users/users.query";
import BaseVue from "@/components/BaseVue";

// import { viewWalletBalances } from "@/services/users/users.query";
import { getAllWalletTransactions } from "@/services/users/users.query";
import { Log, Util } from "@/components/util";
import store from "@/store/index";
import WalletBalanceCardLoading from "./WalletBalanceCardLoading.vue";
import CreatePin from "./CreatePin.vue";
import EditWithdrawalInfo from "./EditWithdrawalInfo.vue";
import WithdrawFunds from "./WithdrawFunds.vue";
import WalletUpdateApproval from "./WalletUpdateApproval.vue";
import { EventTrigger } from "@/components/core/Event";


@Component({
  name: "Wallet",
  props: {
    userWalletQuery: Object,
    loading: String,
  },
  apollo: {
    getAllWalletTransactions: {
      query: getAllWalletTransactions,
      variables() {
        return {
          username: this.userWalletTransactionsQuery.username,
          walletId: this.userWalletQuery.walletBalance[0].walletId,
        };
      },
      skip() {
        return this.userWalletTransactionsQuery.skip;
      },
      result({ data }) {
        Log.info(
          "Search userWalletTransactionsQuery Query: " + JSON.stringify(data)
        );

        this.userWalletTransactionsQuery.data = data?.getAllWalletTransactions;

        Log.info(
          "userWalletTransactionsQuery: " +
            JSON.stringify(this.userWalletTransactionsQuery.data)
        );
      },
      error(error: ApolloError) {
        this.userWalletTransactionsQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.userWalletTransactionsQuery.error)) {
          Log.info("WalletBalance Error" + JSON.stringify(error));
          this.$apollo.queries.getAllWalletTransactions.refetch();
        }
      },
    },
    fetchBanks: {
      query: fetchBanks,

      result({ data }) {
        Log.info("FetchBanks Query: " + JSON.stringify(data));
        this.banks.data = data?.fetchBanks;
        EventTrigger.trigger(
          "wallet-update-banks-fetched-event", this.banks.data
        );
      },

      error(error: ApolloError) {
        this.userWalletTransactionsQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.userWalletTransactionsQuery.error)) {
          Log.info("WalletBalance Error" + JSON.stringify(error));
          // this.$apollo.queries.fetchBanks.refetch();
        }
      },
    },
  },
  components: {
    WalletBalanceCardLoading,
    CreatePin,
    EditWithdrawalInfo,
    WithdrawFunds,
    WalletUpdateApproval,
  },
})
export default class Wallet extends BaseVue {

  @Prop()
  private loading!: boolean;

  @Prop()
  private userWalletQuery!: any;

  private mounted() {
    Log.info(
      "should Skip?:" +
        JSON.stringify(
          Util.isValidString(this.userWalletQuery.walletBalance[0].walletId)
        )
    );
    Log.info("userWalletQuery" + JSON.stringify(this.userWalletQuery));
  }

  private username = store.getters["authToken/username"];
  private userType = store.getters["authToken/authorizations"][0];
  // private userWalletQuery: any = {
  //   username: this.username,
  //   userType: this.userType,
  //   walletBalance: null,
  //   data: {},
  //   error: "",
  // };

  private userWalletTransactionsQuery: any = {
    username: this.username,
    userType: this.userType,
    page: 0,
    size: 10,
    skip: !Util.isValidString(this.userWalletQuery.walletBalance[0].walletId),
    data: [],
    error: "",
  };

  // private formatDate(){

  // }

  private banks: any = {
    data: {},
    error: "",
  };

  private get banksList() {
    return this.banks.data;
  }

  private get userWalletId() {
    return this.userWalletQuery.walletBalance[0].walletId;
  }

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

  private openEditWithdrawal = false;
  private openEditWithdrawalModal() {
    this.openEditWithdrawal = true;
  }
  private closeEditWithdrawalModal() {
    this.openEditWithdrawal = false;
  }

}
</script>

<style scoped></style>



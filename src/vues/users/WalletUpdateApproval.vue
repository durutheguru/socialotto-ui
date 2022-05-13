<template> <div></div></template>

<script lang="ts">
import BaseVue from "@/components/BaseVue";
import { Component } from "vue-property-decorator";
import { ApproveWalletUpdateAction } from "@/services/wallet/wallet.gql";
import { Log, Util } from "@/components/util";

@Component({
  name: "WalletUpdateApproval",
})
export default class WalletUpdateApproval extends BaseVue {
  public mounted() {
    let approvalId = this.$route.params.updateId;
    Log.info("Wallet Update Approval ID: " + approvalId);

    if (!this.isValidString(approvalId)) {
      Log.info("No update approval ID");
      return;
    }

    this.approveWalletUpdate();
  }

  public approveWalletUpdate() {
    let self = this;
    this.$apollo
      .mutate({
        mutation: ApproveWalletUpdateAction,
        variables: {
          approvalId: self.$route.params.updateId,
        },
      })
      .then((data: any) => {
        Log.info("Data: " + String(data));

        Util.handleGlobalAlert(
          true,
          "success",
          "Successfully applied wallet update"
        );
        this.$router.push("/user/profile");
      })
      .catch((error) => {
        Log.error(error);
        Util.handleGlobalAlert(true, "failed", Util.extractGqlError(error));
      });
  }
}
</script>

<style scoped></style>

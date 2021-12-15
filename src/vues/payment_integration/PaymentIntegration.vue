<template>
  <div>
    {{ securityTest }}<br />
    <button @click="handlePayment">Make Payment</button>
  </div>
</template>

<script lang="ts">
declare var MonnifySDK: any;

import { Log, Util, Security, Constants } from "@/components/util";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PaymentIntegration extends Vue {
  private securityTest: boolean = Security.hasAuthorization(
    Constants.AUTHORITIES.BACK_OFFICE_USER
  );

  private timeText: string = Util.formatTime(
    "2020-10-02 16:47",
    "YYYY-MM-DD HH:mm",
    "YYYY-MM-DD HH:mm:ss.SSSS Z"
  );

  public handlePayment() {
    Log.info("Processing Payment Integration...");
    MonnifySDK.initialize({
      amount: 5000,
      currency: "NGN",
      reference: Util.uuidv5(new Date().getTime() + "", true),
      customerName: "John Doe",
      customerEmail: "monnify@monnify.com",
      apiKey: process.env.VUE_APP_MONNIFY_API_KEY,
      contractCode: process.env.VUE_APP_MONNIFY_CONTRACT_CODE,
      paymentDescription: "<<Payment for Lottery>>",
      isTestMode: true,
      metadata: {
        name: "User name",
        email: "User email",
      },
      paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],

      onComplete(response: any) {
        Log.info(`Payment completed. Data: ${JSON.stringify(response)}`);
      },

      onClose(data: any) {
        Log.info(`Dialog was closed. Data: ${JSON.stringify(data)}`);
      },
    });
  }
}
</script>

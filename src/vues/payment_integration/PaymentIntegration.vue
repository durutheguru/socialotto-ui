<template>
  
  <div>
    <button @click='handlePayment'>Make Payment</button>
  </div>

</template>

<script lang='ts'>

declare var MonnifySDK: any;

import { Log, Util } from '@/components/util';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PaymentIntegration extends Vue {
  
    

    public handlePayment() {
        Log.info('Processing Payment Integration...');
        MonnifySDK.initialize({
            amount: 5000,
            currency: 'NGN',
            reference: '83095398y290e8dh94893289',
            customerName: 'John Doe',
            customerEmail: 'monnify@monnify.com',
            apiKey: 'MK_TEST_TFKP8BY6JQ',
            contractCode: '3843765994',
            paymentDescription: 'Test Pay',
            isTestMode: true,
            metadata: {
                name: 'Damilare',
                age: 45
            },
            paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],

            onComplete(response: any) {
                Log.info(`Payment completed. Data: ${JSON.stringify(response)}`);
            },

            onClose(data: any) {
                Log.info(`Dialog was closed. Data: ${JSON.stringify(data)}`);
            }
        });
    }


}
</script>

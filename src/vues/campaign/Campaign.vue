<template>
  <!-- <campaign-component /> -->
  <div>
    <span v-if="$apollo.queries.searchLotteries.loading">Loading<br /></span>
    Lotteries: {{ searchLotteries }} <br />
    Error: {{ searchLotteriesQuery.error }}
  </div>
</template>

<script lang="ts">
import { Log, Util } from "@/components/util";
import { Component, Vue } from "vue-property-decorator";
import { searchLotteries } from "@/services/lottery/lottery.query";
import { ApolloError } from "apollo-client";
// import CampaignComponent from './CampaignComponent';

@Component({
  // components: {
  //     CampaignComponent,
  // },

  apollo: {
    $client: "anonymousClient",
    searchLotteries: {
      query: searchLotteries,

      variables() {
        return {
          searchKey: this.searchLotteriesQuery.key,
          page: this.searchLotteriesQuery.page,
          size: this.searchLotteriesQuery.size,
        };
      },

      error(error: ApolloError) {
        this.searchLotteriesQuery.error = Util.extractGqlError(error);
      },
    },
  },
})
export default class Campaign extends Vue {
  private searchLotteriesQuery: any = {
    key: "aza",
    error: "",
    page: 0,
    size: 20,
  };
}
</script>

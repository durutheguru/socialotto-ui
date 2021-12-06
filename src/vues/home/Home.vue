<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll">
    <div class="  max-w-screen-xl mx-auto pt-3 md:pt-20 sm:w-11/12">
      <div class="px-6 md:px-0">
        <div
          class="mt-12 auto-cols-fr mx-auto grid gap-10 md:gap-10  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none mb-16"
          v-if="
            $apollo.queries.searchCampaigns.loading ||
              $apollo.queries.searchLotteries.loading
          "
        >
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div
          v-else
          class="mt-12 auto-cols-fr mx-auto grid gap-10 md:gap-10  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none mb-16"
        >
          <div
            v-for="result in lotteriesNcampaigns"
            :key="result.id"
            class="w-full xsm:w-97 mx-auto md:w-full flex flex-col rounded-lg overflow-hidden"
            style="height: 458px;"
          >
            <div v-if="result.__typename === 'Campaign'" class="h-full">
              <CampaignCard :result="result" />
            </div>
            <div v-else-if="result.__typename === 'Lottery'" class="h-full">
              <LotteryCard :result="result" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Incentives />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Log, Util } from "@/components/util";
import Incentives from "../../components/Incentives.vue";
import Footer from "../../components/Footer.vue";
import SearchNFilter from "../../components/SearchNFilter.vue";
import CampaignCard from "../campaign/CampaignCard.vue";
import LotteryCard from "../lottery/LotteryCard.vue";
import { searchLotteries } from "@/services/lottery/lottery.query";
import { searchCampaigns } from "@/services/campaign/campaign.query";
import { ApolloError } from "apollo-client";
import CardSkeleton from "../../components/skeletons/CardSkeleton.vue";

@Component({
  name: "Home",
  components: {
    Incentives,
    Footer,
    SearchNFilter,
    CampaignCard,
    LotteryCard,
    CardSkeleton,
  },
  apollo: {
    $client: "anonymousClient",
    searchLotteries: {
      query: searchLotteries,

      variables() {
        return {
          searchKey: this.siteQuery.key,
          page: this.siteQuery.page,
          size: this.siteQuery.size,
        };
      },

      result({ data }) {
        // Log.info("Search Lotteries Data: " + JSON.stringify(data));
        this.siteQuery.lotteryData = data.searchLotteries;
      },

      error(error: ApolloError) {
        this.siteQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.siteQuery.error)) {
          this.$apollo.queries.searchLotteries.refetch();
        }
      },
    },

    searchCampaigns: {
      query: searchCampaigns,

      variables() {
        return {
          searchKey: this.siteQuery.key,
          page: this.siteQuery.page,
          size: this.siteQuery.size,
        };
      },

      result({ data }) {
        // Log.info("Search Campaigns Data: " + JSON.stringify(data));
        this.siteQuery.campaignData = data.searchCampaigns;
      },

      error(error: ApolloError) {
        this.siteQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.siteQuery.error)) {
          this.$apollo.queries.searchCampaigns.refetch();
        }
      },
    },
  },
})
export default class Home extends Vue {
  private siteQuery: any = {
    key: "",
    error: "",
    lotteryData: [],
    campaignData: [],
    page: 0,
    size: 9,
  };

  // private mounted() {
  //   Log.info("joined Array: " + JSON.stringify(searchLotteries));
  // }

  get lotteriesNcampaigns() {
    // let self = this;
    const mergedData = this.siteQuery.lotteryData.concat(
      this.siteQuery.campaignData
    );

    // Log.info("Unsorted Merged Data: " + JSON.stringify(mergedData));

    mergedData.sort((o1: any, o2: any) => {
      return o1.name > o2.name ? -1 : 1;
    });

    // Log.info("Sorted Merged Data: " + JSON.stringify(mergedData));

    return mergedData;
    // return JSON.stringify(this.$apollo.queries.searchLotteries);
  }
}
</script>

<style scoped></style>

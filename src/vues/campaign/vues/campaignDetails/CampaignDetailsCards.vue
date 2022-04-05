<template>
  <div class="bg-blue-50">
    <div class="max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12 px-6 md:px-0">
      <div class="pb-14">
        <h1
          class="spartan text-center font-semibold flex justify-center md:justify-start text-2xl text-black"
        >
          {{ heading }}
        </h1>
        <div
          v-if="
            $apollo.queries.searchCampaigns.loading ||
              $apollo.queries.searchLotteries.loading ||
              loading
          "
          class=" auto-cols-fr mx-auto grid gap-10 md:gap-10  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none mb-16"
        >
          <!-- <CampaignCard /> -->
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
        <div class="w-full flex justify-end">
          <router-link :to="'/home'" class="flex cursor-pointer">
            <span
              class="spartan leading-relaxed dark-blue-text text-sm font-semibold mr-3"
              >See more</span
            >
            <svg
              class="spartan dark-blue-text text-sm font-semibold "
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.8291 11.957L19.8291 11.957"
                stroke="#1D414B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 5L22 12L15 19"
                stroke="#1D414B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { searchLotteries } from "@/services/lottery/lottery.query";
import { searchCampaigns } from "@/services/campaign/campaign.query";
import { ApolloError } from "apollo-client";
import { Log, Util } from "@/components/util";

import LotteryCard from "../../../lottery/LotteryCard.vue";
import CampaignCard from "../../CampaignCard.vue";
import CardSkeleton from "@/components/skeletons/CardSkeleton.vue";

@Component({
  name: "CampaignDetailsSec3",
  props: {
    loading: Boolean,
    heading: String,
  },
  components: {
    CampaignCard,
    CardSkeleton,
    LotteryCard,
  },
  apollo: {
    $client: "anonymousClient",
    searchLotteries: {
      query: searchLotteries,

      variables() {
        return {
          searchKey: this.siteQuery.key,
          page: this.siteQuery.page,
          size: this.siteQuery.sizeLottery,
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
          size: this.siteQuery.sizeCampaign,
        };
      },

      result({ data }) {
        Log.info("Search Campaigns Data: " + JSON.stringify(data));
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
export default class CampaignDetailsSec3 extends Vue {
  private siteQuery: any = {
    key: "",
    error: "",
    lotteryData: [],
    campaignData: [],
    page: 0,
    sizeCampaign: 2,
    sizeLottery: 1,
  };

  private mounted() {
    // Log.info("joined Array: " + JSON.stringify(searchLotteries));
  }

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

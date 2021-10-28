<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll">
    <div class="  max-w-screen-xl mx-auto pt-20 sm:w-11/12">
      <!-- <div> -->
      <!-- <SearchNFilter :searchInput="siteQuery.key" /> -->

      <!-- <div v-for="result in searchLotteries" :key="result.id">
        <h1>{{ result.lotteryFiles[0].fileType }}</h1>
      </div> -->

      <!-- <div>
        <span v-if="$apollo.queries.searchLotteries.loading"
          >Loading<br
        /></span>
        Lotteries: {{ searchLotteries }} <br />
        Error: {{ siteQuery.error }}
      </div>

      <div>
        <span v-if="$apollo.queries.searchCampaigns.loading"
          >Loading<br
        /></span>
        Campaigns: {{ searchCampaigns }} <br />

        Error: {{ siteQuery.error }} <br />
       
      </div> -->

      <!-- joinedArray:
      {{ lotteriesNcampaigns }} -->
      <!-- </div> -->

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
          <!-- <div
            v-if="
              $apollo.queries.searchCampaigns.loading ||
                $apollo.queries.searchLotteries.loading
            "
          >
            <span>Loading<br /></span>
          </div> -->
          <!-- "
              $apollo.queries.searchCampaigns.loading ||
                $apollo.queries.searchLotteries.loading
            " -->

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

        <!-- ---------------Prev N next------------- -->
        <!-- <div class="w-full flex justify-end mb-16">
          <div class="flex flex-col">
            <span class="flex justify-end rounded-md h-full ">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border-grey-dark text-base leading-6 font-medium rounded-md text-grey-light bg-transparent focus:outline-none transition ease-in-out duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 -ml-1 mr-3 text-grey-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                Prev
              </button>
            </span>
          </div>

          <div class="flex flex-col ml-8">
            <span class="flex justify-end rounded-md h-full ">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 border-grey-dark text-base leading-6 font-medium rounded-md text-grey-light bg-transparent focus:outline-none transition ease-in-out duration-150"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 -mr-1 ml-3 text-grey-light"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div> -->
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
import CampaignCard from "../../components/page-features/CampaignCard.vue";
import LotteryCard from "../../components/page-features/LotteryCard.vue";
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
        Log.info("Search Lotteries Data: " + JSON.stringify(data));
        this.siteQuery.lotteryData = data.searchLotteries;
      },

      error(error: ApolloError) {
        this.siteQuery.error = Util.extractGqlError(error);
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
        Log.info("Search Campaigns Data: " + JSON.stringify(data));
        this.siteQuery.campaignData = data.searchCampaigns;
      },

      error(error: ApolloError) {
        this.siteQuery.error = Util.extractGqlError(error);
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

  private mounted() {
    Log.info("joined Array: " + JSON.stringify(searchLotteries));
  }

  get lotteriesNcampaigns() {
    // let self = this;
    const mergedData = this.siteQuery.lotteryData.concat(
      this.siteQuery.campaignData
    );

    Log.info("Unsorted Merged Data: " + JSON.stringify(mergedData));

    mergedData.sort((o1: any, o2: any) => {
      return o1.name > o2.name ? -1 : 1;
    });

    Log.info("Sorted Merged Data: " + JSON.stringify(mergedData));

    return mergedData;
    // return JSON.stringify(this.$apollo.queries.searchLotteries);
  }
}
</script>

<style scoped></style>

<template>
  <div class="divContainer">
    <div class="max-w-screen-xl mx-auto pt-60">
      <!-- <div> -->
      <SearchNFilter />

      <!-- <div>
        <span v-if="$apollo.queries.searchLotteries.loading"
          >Loading<br
        /></span>
        Lotteries: {{ searchLotteries }} <br />
        Error: {{ searchLotteriesQuery.error }}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
            stroke="#767676"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div> -->

      <!-- <div>
        <span v-if="$apollo.queries.searchCampaigns.loading"
          >Loading<br
        /></span>
        Campaigns: {{ searchCampaigns }} <br />
        Error: {{ searchCampaignsQuery.error }}
      </div> -->
      <!-- </div> -->
      <div>
        <div
          class="mt-12 max-w-lg mx-auto grid gap-10 lg:grid-cols-3 lg:max-w-none mb-16"
        >
          <div
            v-for="post in posts"
            :key="post.title"
            class="flex flex-col rounded-lg overflow-hidden"
            style="height: 458px;"
          >
            <div v-if="post.type === 'Campaign'" class="h-full">
              <CampaignCard :post="post" />
            </div>
            <div v-else-if="post.type === 'Lottery'" class="h-full">
              <LotteryCard :post="post" />
            </div>
          </div>
        </div>

        <!-- ---------------Prev N next------------- -->
        <div class="w-full flex justify-end mb-16">
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
import CampaignCard from "../../components/page-features/CampaignCard.vue";
import LotteryCard from "../../components/page-features/LotteryCard.vue";
import { searchLotteries } from "@/services/lottery/lottery.query";
import { searchCampaigns } from "@/services/campaign/campaign.query";
import { ApolloError } from "apollo-client";

@Component({
  name: "Home",
  components: {
    Incentives,
    Footer,
    SearchNFilter,
    CampaignCard,
    LotteryCard,
  },
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

    searchCampaigns: {
      query: searchCampaigns,

      variables() {
        return {
          searchKey: this.searchCampaignsQuery.key,
          page: this.searchCampaignsQuery.page,
          size: this.searchCampaignsQuery.size,
        };
      },

      error(error: ApolloError) {
        this.searchCampaignsQuery.error = Util.extractGqlError(error);
      },
    },
  },
})
export default class Home extends Vue {
  private posts: any = [
    {
      title: "Boost your conversion rate",
      href: "#",
      category: { name: "Article", href: "#" },
      type: "Lottery",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      readingTime: "6 min",
      author: {
        name: "Roel Aufderehar",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      title: "Boost your conversion rate",
      href: "#",
      category: { name: "Article", href: "#" },
      type: "Campaign",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      readingTime: "6 min",
      author: {
        name: "Roel Aufderehar",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      title: "Boost your conversion rate",
      href: "#",
      category: { name: "Article", href: "#" },
      type: "Lottery",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      readingTime: "6 min",
      author: {
        name: "Roel Aufderehar",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      title: "Boost your conversion rate",
      href: "#",
      category: { name: "Article", href: "#" },
      type: "Campaign",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      readingTime: "6 min",
      author: {
        name: "Roel Aufderehar",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      title: "Boost your conversion rate",
      href: "#",
      category: { name: "Article", href: "#" },
      type: "Lottery",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      readingTime: "6 min",
      author: {
        name: "Roel Aufderehar",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      title: "Boost your conversion rate",
      href: "#",
      category: { name: "Article", href: "#" },
      type: "Campaign",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      readingTime: "6 min",
      author: {
        name: "Roel Aufderehar",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      title: "Boost your conversion rate",
      href: "#",
      category: { name: "Article", href: "#" },
      type: "Lottery",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
      date: "Mar 16, 2020",
      datetime: "2020-03-16",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      readingTime: "6 min",
      author: {
        name: "Roel Aufderehar",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      title: "How to use search engine optimization to drive sales",
      href: "#",
      category: { name: "Video", href: "#" },
      type: "Campaign",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
      date: "Mar 10, 2020",
      datetime: "2020-03-10",
      imageUrl:
        "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      readingTime: "4 min",
      author: {
        name: "Brenna Goyette",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
    {
      title: "Improve your customer experience",
      href: "#",
      category: { name: "Case Study", href: "#" },
      type: "Lottery",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
      date: "Feb 12, 2020",
      datetime: "2020-02-12",
      imageUrl:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
      readingTime: "11 min",
      author: {
        name: "Daniela Metz",
        href: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    },
  ];

  private searchLotteriesQuery: any = {
    key: "aza",
    error: "",
    page: 0,
    size: 9,
  };

  private searchCampaignsQuery: any = {
    key: "a",
    error: "",
    page: 0,
    size: 9,
  };

  private mounted() {
    console.log(searchLotteries);
  }
}
</script>

<style scoped></style>

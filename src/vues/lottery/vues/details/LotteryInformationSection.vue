<template>
  <div class="">
    <div class="flex spartan font-medium text-sm mb-12 w-full ">
      <button
        :class="{ underline: view === 'info' }"
        class="mr-10 cursor-pointer focus:underline"
        @click="view = 'info'"
      >
        Info
      </button>
      <button
        class="mr-10 cursor-pointer focus:underline"
        @click="view = 'Supported Campaigns'"
      >
        Supported Campaigns
      </button>
      <button
        class="mr-10 cursor-pointer focus:underline"
        @click="view = 'Terms & Conditions'"
      >
        Terms & Conditions
      </button>
    </div>

    <div>
      <!-- --------info---------- -->
      <div v-if="view === 'info'" class="spartan text-black ">
        <h3 class="spartan font-normal text-xl mb-8 text-black">
          About the Lottery
        </h3>
        <div class="font-normal text-base">
          <p class="mb-10">
            {{ lotteryDescription }}
          </p>

          <!-- <p>
            Elit aute irure tempor cupidatat incididunt sint deserunt ut
            voluptate aute id deserunt nisi. Aliqua id fugiat nostrud irure ex
            duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt
            mollit dolore cillum minim tempor enim.
          </p> -->
        </div>
      </div>

      <!-- --------Supported Campaigns---------- -->
      <div v-if="view === 'Supported Campaigns'" class="spartan text-black">
        <!-- <h3 class="spartan font-normal text-xl mb-8 text-black capitalize ">
          {{ supportedCampaigns }}
        </h3> -->
        <div
          class="mt-12 auto-cols-fr mx-auto grid gap-10 md:gap-10  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none mb-16"
        >
          <div
            v-for="campaign in supportedCampaigns"
            :key="campaign.id"
            class="w-full xsm:w-97 mx-auto md:w-full flex flex-col rounded-lg overflow-hidden"
            style="height: 458px;"
          >
            <div class="h-full">
              <CampaignCard v-if="!loading" :result="campaign" />
            </div>
            <!-- {{ campaign }} -->
          </div>
        </div>
      </div>

      <!-- --------Terma and Conditions---------- -->
      <div v-if="view === 'Terms & Conditions'" class="spartan relative">
        <ul
          class="list-disc text-dark space-y-4 relative"
          style="right: 0.313rem;"
        >
          <li class="ml-4 text-grey-light">
            <span class="text-black"
              >Aliqua id fugiat nostrud irure ex duis</span
            >
          </li>
          <li class="ml-4 text-grey-light">
            <span class="text-black"
              >Aliqua id fugiat nostrud irure ex duis</span
            >
          </li>
          <li class="ml-4 text-grey-light">
            <span class="text-black"
              >Aliqua id fugiat nostrud irure ex duis</span
            >
          </li>
          <li class="ml-4 text-grey-light">
            <span class="text-black"
              >Aliqua id fugiat nostrud irure ex duis</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CampaignCard from "@/vues/campaign/CampaignCard.vue";

@Component({
  name: "LotteryInformationSection",
  props: {
    lotteryStatus: String,
    lotteryDescription: String,
    supportedCampaigns: Array,
    loading: Boolean,
  },
  components: {
    CampaignCard,
  },
})
export default class LotteryInformationSection extends Vue {
  private view: string = "info";
}
</script>

<style scoped></style>

<template>
  <div class="bg-white">
    <div class="max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12 px-6 md:px-0">
      <div class="pb-14">
        <div v-if="loading" class="mx-auto grid grid-cols-6 md:grid-cols-5">
          <div class="col-span-6 md:col-span-3">
            <InfoStatusUpdatesSkeleton />
          </div>
          <!-- <div class="col-span-6 md:col-span-2 relative mt-20 lg:mt-0">
            <FAQSkeleton />
          </div> -->
        </div>

        <!-- ----------------------- -->
        <div v-else class="mx-auto ">
          <div class="">
            <LotteryInformationSection
              :lotteryDescription="lotteryDescription"
              :lotteryStatus="lotteryStatus"
              :supportedCampaigns="supportedCampaigns"
              :loading="loading"
            />
          </div>
          <!-- <div class="col-span-6 md:col-span-2 mt-20 lg:mt-0">
            <FAQ />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InfoStatusUpdatesSkeleton from "@/components/skeletons/campaignDetailsSkeletons/InfoStatusUpdatesSkeleton.vue";
import FAQSkeleton from "@/components/skeletons/campaignDetailsSkeletons/FAQSkeleton.vue";
import FAQ from "@/vues/campaign/vues/campaignDetails/FAQ.vue";
import LotteryInformationSection from "./LotteryInformationSection.vue";
@Component({
  name: "LotteryInfoNFAQ",
  components: {
    FAQ,
    LotteryInformationSection,
    FAQSkeleton,
    InfoStatusUpdatesSkeleton,
  },
  props: {
    lotteryStatus: String,
    lotteryDescription: String,
    loading: Boolean,
    supportedCampaigns: Array,
  },
})
export default class LotteryInfoNFAQ extends Vue {}
</script>

<style scoped></style>

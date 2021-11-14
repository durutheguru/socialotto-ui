<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll bg-blue-50">
    <div
      class="  max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12 px-6 md:px-0"
    >
      <div class="mb-14">
        <div class="mx-auto grid grid-cols-6 lg:grid-cols-5">
          <div class="col-span-6 lg:col-span-3">
            <h3 class="spartan font-semibold text-xl">
              20 regular and 5 VIP tickets to Wizkid’s MIL concert in December
            </h3>
          </div>
          <div
            class="col-span-6 lg:col-span-3 lg:col-start-1 h-60 sm:h-80 lg:h-full"
          >
            <CampaignDetailsCarousel />
          </div>
          <div class="col-span-6 lg:col-span-2 lg:col-start-4 mt-20 lg:mt-0">
            <CampaignDetailsDonateNShare />
          </div>
        </div>
      </div>
    </div>
    <CampaignDetailsSec2 />
    <CampaignDetailsSec3 />
    <Incentives />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Incentives from "@/components/Incentives.vue";
import Footer from "@/components/Footer.vue";
import CampaignDetailsDonateNShare from "./CampaignDetailsDonateNShare.vue";
import CampaignDetailsCarousel from "./campaignDetailsCarousel.vue";
import CampaignDetailsSec2 from "./CampaignDetailsSec2.vue";
import CampaignDetailsSec3 from "./CampaignDetailsSec3.vue";
@Component({
  name: "CampaignDetails",
  components: {
    Incentives,
    Footer,
    CampaignDetailsCarousel,
    CampaignDetailsDonateNShare,
    CampaignDetailsSec2,
    CampaignDetailsSec3,
  },
})
export default class CampaignDetails extends Vue {}
</script>

<style scoped></style>

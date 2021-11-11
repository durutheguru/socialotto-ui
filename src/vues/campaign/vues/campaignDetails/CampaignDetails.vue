<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll bg-blue-50">
    <div class="  max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12">
      <div class="mb-14">
        <div class="mx-auto grid grid-cols-6 md:grid-cols-5">
          <div class="col-span-6">
            <h3 class="spartan font-semibold text-xl">
              20 regular and 5 VIP tickets to Wizkid’s MIL concert in December
            </h3>
          </div>
          <div class="col-span-6 md:col-span-3">
            <CampaignDetailsCarousel />
          </div>
          <div class=" col-span-6 md:col-span-2">
            <CampaignDetailsDonateNShare />
          </div>
        </div>
      </div>
    </div>
    <CampaignDetailsSec2 />
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
@Component({
  name: "CampaignDetails",
  components: {
    Incentives,
    Footer,
    CampaignDetailsCarousel,
    CampaignDetailsDonateNShare,
    CampaignDetailsSec2,
  },
})
export default class CampaignDetails extends Vue {}
</script>

<style scoped></style>

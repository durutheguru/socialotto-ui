<template>
  <div
    id="campaignDetails"
    class="divContainer overflow-auto lg:overflow-y-scroll bg-blue-50"
  >
    <div
      class="  max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12 px-6 md:px-0"
    >
      <div class="mb-14">
        <div class="mx-auto grid grid-cols-6 lg:grid-cols-5">
          <div class="col-span-6 lg:col-span-3">
            <h3 class="spartan font-semibold text-xl">
              {{ campaignDetails.data.name }}
            </h3>
          </div>
          <div
            class="col-span-6 lg:col-span-3 lg:col-start-1 h-60 sm:h-80 lg:h-full"
          >
            <div
              v-if="campaignDetails.loading"
              class="h-full relative rounded-md flex items-center justify-center"
            >
              <div class="roundLoader opacity-50"></div>
            </div>
            <CampaignDetailsCarousel
              v-else
              :images="campaignDetails.data.fileRefs"
            />
          </div>
          <div class="col-span-6 lg:col-span-2 lg:col-start-4 mt-20 lg:mt-0">
            <DonateNShareSkeleton v-if="campaignDetails.loading" />
            <CampaignDetailsDonateNShare
              :totalFundsRaised="campaignDetails.data.totalFundsRaised"
              :targetFunds="campaignDetails.data.targetFunds"
              v-else
            />
          </div>
        </div>
      </div>
    </div>

    <InfoStatusUpdatesFAQ
      :loading="campaignDetails.loading"
      :campaignStatus="campaignDetails.data.campaignStatus"
      :campaignDescription="campaignDetails.data.description"
    />
    <CampaignDetailsCards
      heading="Similar campaigns and lotteries"
      :loading="campaignDetails.loading"
    />
    <Incentives />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Log, Util } from "@/components/util";
import CampaignService from "@/services/campaign/CampaignService";
import ApiResource from "@/components/core/ApiResource";
import Incentives from "@/components/Incentives.vue";
import Footer from "@/components/Footer.vue";
import CampaignDetailsDonateNShare from "./CampaignDetailsDonateNShare.vue";
import CampaignDetailsCarousel from "./campaignDetailsCarousel.vue";
import InfoStatusUpdatesFAQ from "./info-status-updates-FAQ.vue";
import CampaignDetailsCards from "./CampaignDetailsCards.vue";
import DonateNShareSkeleton from "@/components/skeletons/campaignDetailsSkeletons/DonateNShareSkeleton.vue";

@Component({
  name: "CampaignDetails",
  components: {
    Incentives,
    Footer,
    CampaignDetailsCarousel,
    CampaignDetailsDonateNShare,
    InfoStatusUpdatesFAQ,
    CampaignDetailsCards,
    DonateNShareSkeleton,
  },
})
export default class CampaignDetails extends Vue {
  private campaignDetails: ApiResource = ApiResource.create();

  get campaignDetailsId() {
    return this.$route.params.id;
  }

  private campaignId: string = this.campaignDetailsId;

  private getCampaignDetails() {
    let self = this;

    self.campaignDetails.loading = true;
    self.campaignDetails.error = "";

    CampaignService.getCampaignDetails(
      self.campaignId,
      (response: any) => {
        self.campaignDetails.loading = false;
        // Log.info("campaignDetails In: " + JSON.stringify(response.data));
        self.campaignDetails.data = response.data;
        Log.info(
          "campaignDetails In: " + JSON.stringify(self.campaignDetails.data)
        );
      },
      (error: any) => {
        self.campaignDetails.loading = false;
        Log.error("campaignDetails Error: " + JSON.stringify(error));
      }
    );
  }

  @Watch("campaignDetailsId")
  private campaignDetailsRouteId(newValue: string, oldValue: string) {
    let self = this;
    Log.info(`ids: ${newValue}${oldValue}`);
    self.campaignId = newValue;

    this.getCampaignDetails();
  }

  private mounted() {
    this.getCampaignDetails();
    // Log.info("campaignDetailsId: " + this.campaignDetailsId);
    // let campaignId: string = this.$route.params.id;
    // this.campaignDetails.loading = true;
    // this.campaignDetails.error = "";
    // CampaignService.getCampaignDetails(
    //   campaignId,
    //   (response: any) => {
    //     this.campaignDetails.loading = false;
    //     // Log.info("campaignDetails In: " + JSON.stringify(response.data));
    //     this.campaignDetails.data = response.data;
    //     Log.info(
    //       "campaignDetails In: " + JSON.stringify(this.campaignDetails.data)
    //     );
    //   },
    //   (error: any) => {
    //     this.campaignDetails.loading = false;
    //     Log.error("campaignDetails Error: " + JSON.stringify(error));
    //   }
    // );
  }
}
</script>

<style scoped></style>

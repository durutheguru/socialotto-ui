<template>
  <!-- <lottery-detail-component /> -->
  <div
    id="lotteryDetails"
    class="divContainer overflow-auto lg:overflow-y-scroll bg-blue-50"
  >
    <div
      class="  max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12 px-6 md:px-0"
    >
      <div class="mb-14">
        <div class="mx-auto grid grid-cols-6 lg:grid-cols-5">
          <div class="col-span-6 lg:col-span-3">
            <h3 class="spartan font-semibold text-xl">
              <!-- {{ campaignDetails.data.name }} -->
              Hello
            </h3>
          </div>
          <div
            class="col-span-6 lg:col-span-3 lg:col-start-1 h-60 sm:h-80 lg:h-full"
          >
            <!------round loader------------ -->
            <div
              class="h-full relative rounded-md flex items-center justify-center"
            >
              <div class="roundLoader opacity-50"></div>
            </div>
            <!-- <CampaignDetailsCarousel
              v-else
              :images="campaignDetails.data.fileRefs"
            /> -->
          </div>
          <div class="col-span-6 lg:col-span-2 lg:col-start-4 mt-20 lg:mt-0">
            <!-- <DonateNShareSkeleton v-if="campaignDetails.loading" /> -->
            <LotteryPayNShare />
          </div>
        </div>
      </div>
    </div>

    <LotteryInfoNFAQ />
    <!-- <CampaignDetailsCards
      heading="Similar campaigns and lotteries"
      :loading="campaignDetails.loading"
    /> -->
    <Incentives />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ApiResource from "@/components/core/ApiResource";
import LotteryService from "@/services/lottery/LotteryService";
import Incentives from "@/components/Incentives.vue";
import Footer from "@/components/Footer.vue";
import { Log, Util } from "@/components/util";
import LotteryPayNShare from "./LotteryPayNShare.vue";
import LotteryInfoNFAQ from "./LotteryInfoNFAQ.vue";
// import LotteryDetailComponent from './LotteryDetailComponent';

@Component({
  name: "LotteryDetails",
  components: {
    LotteryPayNShare,
    Incentives,
    Footer,
    LotteryInfoNFAQ,
  },
})
export default class LotteryDetails extends Vue {
  private lotteryDetails: ApiResource = ApiResource.create();

  get lotteryDetailsId() {
    return this.$route.params.id;
  }

  private lotteryId: string = this.lotteryDetailsId;

  private getLotteryDetails() {
    let self = this;

    Log.info("lotteryDetails params: " + self.lotteryId);

    self.lotteryDetails.loading = true;
    self.lotteryDetails.error = "";

    LotteryService.getLotteryDetails(
      self.lotteryId,
      (response: any) => {
        self.lotteryDetails.loading = false;

        self.lotteryDetails.data = response.data;

        Log.info(
          "lotteryDetails In: " + JSON.stringify(self.lotteryDetails.data)
        );
      },
      (error: any) => {
        self.lotteryDetails.loading = false;
        Log.error("lotteryDetails Error: " + JSON.stringify(error));
      }
    );
  }

  @Watch("lotteryDetailsId")
  private lotteryDetailsRouteId(newValue: string, oldValue: string) {
    let self = this;
    Log.info(`ids: ${newValue} to ${oldValue}`);
    self.lotteryId = newValue;

    this.getLotteryDetails();
  }

  private mounted() {
    this.getLotteryDetails();
  }
}
</script>

<style lang="scss" src="@/sass/main.scss"></style>

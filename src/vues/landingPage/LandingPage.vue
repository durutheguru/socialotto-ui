<template>
  <div
    class="divContainer overflow-auto lg:overflow-y-scroll bg-blue-50 spartan"
  >
    <div
      class="  max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12 px-6 md:px-0"
    >
      <div class="xl:mb-14 mt-32 sm:mt-36">
        <div class="mx-auto grid grid-cols-6 xl:grid-cols-5">
          <div
            class=" max-w-3xl col-span-6 mx-auto xl:mx-0 xl:col-span-3 xl:col-start-1  xl:h-full"
          >
            <div class="h-full w-full flex items-center ">
              <div class="w-full xl:w-10/12 flex">
                <div class="inline-block landingPageText">
                  <h1 class="font-normal text-5xl leading-8 mb-4">
                    Support a cause

                    <span
                      style="color: #52c8e9;"
                      class="font-bold leading-tight"
                      >you care</span
                    >
                    about
                  </h1>
                  <p class="text-xl leading-8 font-normal">
                    Participate in a fund raising campaign created by NGOs we
                    have partnered with or participate in our lotteries where
                    you stand a chance to win something and also help someone in
                    need.
                  </p>

                  <div class="grid grid-cols-2 h-14 mt-8 gap-6">
                    <div
                      class=" col-span-2 sm:col-span-1 flex items-end  justify-center sm:justify-start"
                    >
                      <div
                        class="bg-blue-200 h-12  w-full rounded-md flex items-center  justify-center cursor-pointer"
                      >
                        <span
                          class="text-white text-base font-semi-bold cursor-pointer"
                          >Support a Campaign</span
                        >
                      </div>
                    </div>
                    <div
                      class="col-span-2 sm:col-span-1  flex items-end  justify-center sm:justify-end"
                    >
                      <div
                        class="bg-transparent border-text-blue-200 h-12  w-full rounded-md flex items-center  justify-center cursor-pointer"
                      >
                        <span class="text-base font-semi-bold cursor-pointer"
                          >Participate in a Lottery</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="  col-span-6 xl:col-span-2 xl:col-start-4 mt-20 xl:mt-0 ">
            <div class="relative h-full w-full">
              <div
                class="mx-auto relative landingPageImage"
                style="height: 28rem;"
              >
                <img
                  class=" mx-auto absolute xl:top-0 xl:right-0 rounded-2xl  my-auto"
                  style=" width: 28rem; min-height: 28rem; min-width: 28rem; z-index: 0"
                  src="https://socialotto.s3.ca-central-1.amazonaws.com/uploads/lotto-kids.png"
                  alt=""
                />
                <!-- <RectanglesSvg
                  style="right: -2.1rem; top: -2.1rem; z-index: 0"
                />

                <RectanglesSvg
                  style="right: -2.1rem; bottom: -2.1rem; z-index: 0"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CampaignDetailsCards heading="Active campaigns and lotteries" />
    <Incentives />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Incentives from "@/components/Incentives.vue";
import Footer from "@/components/Footer.vue";
import RectanglesSvg from "@/components/svg/RectanglesSvg.vue";
import CampaignDetailsCards from "../campaign/vues/campaignDetails/CampaignDetailsCards.vue";
import { Constants, Log, Util } from "@/components/util";

@Component({
  name: "LandingPage",
  components: {
    CampaignDetailsCards,
    Incentives,
    Footer,
    RectanglesSvg,
  },
})
export default class LandingPage extends Vue {
  private mounted() {
    this.test();
  }

  private test() {
    Log.info("Landing page ohh");
    Util.handleGlobalAlert(true, "failed", "404");
  }
}
</script>

<style scoped></style>

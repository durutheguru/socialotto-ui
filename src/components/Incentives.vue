<template>
  <div class="bg-blue-100 ">
    <div
      class="max-w-screen-xl mx-auto py-24 px-6 md:px-0 max-w-screen-xl sm:w-11/12 "
    >
      <div class="sm:flex sm:flex-col sm:align-center">
        <h1
          class="text-4xl font-normal spartan text-grey-dark leading-none text-gray-900 text-center "
        >
          Nigeria's foremost fundraising platform
        </h1>
      </div>
      <div
        class="mt-12 space-y-4 sm:mt-16 sm:space-y-0  sm:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto  xl:max-w-none xl:mx-0 xl:grid-cols-3"
      >
        <!-- <div class="divide-y divide-gray-200 grid grid-flow-row lg:grid-col-3"> -->
        <!-- ----------------------- -->
        <div class="py-6 flex flex-col align-center">
          <div class="flex mb-10 justify-center">
            <VerifyCampaignsSvg />
          </div>
          <h2
            class="text-2xl spartan text-grey-dark font-semibold text-center leading-6 "
          >
            Verified Campaigns
          </h2>
          <p
            class="mt-4 spartan text-grey-light text-sm text-center leading-5 text-gray-500"
          >
            All NGOs we partner with are certified to be legitimate and have a
            track record of helping people in the society. We also take measures
            to ensure that causes are followed through on.
          </p>
        </div>

        <!-- ------------------- -->

        <div class="py-6 flex flex-col align-center">
          <div class="flex mb-10 justify-center">
            <CelebBackedLotterySvg />
          </div>
          <h2
            class="text-2xl spartan text-grey-dark  text-center leading-6 font-semibold "
          >
            Celebrity backed lotteries
          </h2>
          <p
            class="mt-4 spartan text-grey-light text-sm text-center leading-5 text-gray-500"
          >
            Our lotteries are initiated and backed up by celebrities and notable
            personalities in the society to guarantee wins and ensure you are
            winning an experience you’d love.
          </p>
        </div>

        <!-- ------------------- -->

        <div class="py-6 flex flex-col align-center">
          <div class="flex mb-10 justify-center">
            <SocialReachSvg />
          </div>
          <h2
            class="text-2xl spartan text-grey-dark text-center leading-6 font-semibold "
          >
            Social reach
          </h2>
          <p
            class="mt-4 spartan text-grey-light text-sm text-center leading-5 text-gray-500"
          >
            We ensure that every campaign is promoted on our personal and
            partner social media platforms to spread your story and get more
            support for your campaigns.
          </p>
        </div>

        <!-- ------------------- -->
        <!-- </div> -->
      </div>
    </div>

    <!-- <div>
      <IncentivesSvg />
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import IncentivesSvg from "./svg/IncentivesSvg.vue";
import VerifyCampaignsSvg from "./svg/VerifyCampaignsSvg.vue";
import CelebBackedLotterySvg from "./svg/CelebBackedLotterySvg.vue";
import SocialReachSvg from "./svg/SocialReachSvg.vue";

@Component({
  name: "Incentives",
  components: {
    // IncentivesSvg,
    VerifyCampaignsSvg,
    CelebBackedLotterySvg,
    SocialReachSvg,
  },
})
export default class Incentives extends Vue {}
</script>

<style scoped></style>

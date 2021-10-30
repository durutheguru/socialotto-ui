<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll bg-blue-50">
    <div class="  max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12">
      <div class="mb-14">
        <div class="mx-auto grid grid-cols-6 md:grid-cols-5">
          <div class="col-span-6 lg:col-span-3 md:col-start-1 md:order-first">
            <CampaignInputs />
          </div>

          <div
            class="instructionsDisplay  col-span-6 md:col-span-2 order-first md:order-last md:col-start-4"
          >
            <!-- <div class="bg-white rounded-md"> -->
            <CampaignInstructions />
            <!-- </div> -->
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
import CampaignInputs from "./CampaignInputs.vue";
import CampaignInstructions from "./CampaignInstructions.vue";
import Incentives from "@/components/Incentives.vue";
import Footer from "@/components/Footer.vue";

@Component({
  name: "CreateCampaign",
  components: {
    CampaignInputs,
    CampaignInstructions,
    Incentives,
    Footer,
  },
})
export default class CreateCampaign extends Vue {}
</script>

<style scoped></style>

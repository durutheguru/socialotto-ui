<template>
  <div class="bg-white">
    <div class="max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12 px-6 md:px-0">
      <div class="pb-14">
        <div class="mx-auto grid grid-cols-6 md:grid-cols-5">
          <div class="col-span-6 md:col-span-3">
            <InfoStatusUpdates />
          </div>
          <div class="col-span-6 md:col-span-2  mt-20 lg:mt-0">
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FAQ from "./FAQ.vue";
import InfoStatusUpdates from "./Info-Status-Updates.vue";

@Component({
  name: "CampaignDetailsSec2",
  components: {
    FAQ,
    InfoStatusUpdates,
  },
})
export default class CampaignDetailsSec2 extends Vue {}
</script>

<style scoped></style>

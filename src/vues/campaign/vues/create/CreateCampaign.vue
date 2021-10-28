<template>
  <div class="divContainer overflow-auto lg:overflow-y-scroll">
    <div class="  max-w-screen-xl mx-auto pt-3 md:pt-20 sm:w-11/12">
      <div>
        <div class="mx-auto grid grid-cols-5">
          <div class="col-span-3">
            <CampaignInputs />
          </div>
          <div class="col-span-2">Instructions</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CampaignInputs from "./CampaignInputs.vue";

@Component({
  name: "CreateCampaign",
  components: {
    CampaignInputs,
  },
})
export default class CreateCampaign extends Vue {}
</script>

<style scoped></style>

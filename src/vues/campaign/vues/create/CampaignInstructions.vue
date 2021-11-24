<template>
  <div class=" mb-16 md:mb-0">
    <div class="w-11/12 ml-auto">
      <div class="mb-1">
        <h1 class="spartan text-2xl font-semibold dark-blue-text mb-0">
          What you need to know before starting a campaign
        </h1>
      </div>
      <div class="bg-white rounded-md">
        <CampaignInstructionsList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CampaignInstructionsList from "./CampaignInstructionsList.vue";
@Component({
  name: "CampaignInstructions",
  components: {
    CampaignInstructionsList,
  },
})
export default class CampaignInstructions extends Vue {}
</script>

<style scoped></style>

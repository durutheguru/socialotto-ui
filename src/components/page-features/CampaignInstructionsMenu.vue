<template>
  <div class="rounded-md bg-gray-200 mb-10">
    <div class="mt-8 h-16 flex justify-center items-center">
      <div class="flex my-auto ">
        <span
          class="spartan mx-3 text-sm font-semibold dark-blue-text my-auto "
        >
          What you need to know before starting a campaign
        </span>
        <div class="h-16 w-16">
          <ChevronDown />
        </div>
      </div>
    </div>
    <!-- ----------menu display----------- -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChevronDown from "@/components/svg/ChevronDown.vue";

@Component({
  name: "CampaignInstructionsMenu",
  components: {
    ChevronDown,
  },
})
export default class CampaignInstructionsMenu extends Vue {}
</script>

<style scoped></style>

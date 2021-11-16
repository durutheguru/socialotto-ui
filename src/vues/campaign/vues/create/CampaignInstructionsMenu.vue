<template>
  <div class="rounded-md bg-gray-200 mb-10 w-full">
    <div class="mt-8 h-16 w-full">
      <div class="flex justify-between w-full ">
        <span
          class="spartan mx-3 text-sm font-semibold dark-blue-text my-auto "
        >
          What you need to know before starting a campaign
        </span>
        <div class="h-16 w-16">
          <div
            class="h-full w-full flex justify-center items-center"
            @click="toggle"
          >
            <ChevronDown v-if="!show" />
            <ChevronUp v-else />
          </div>
        </div>
      </div>
    </div>
    <!-- ----------menu display----------- -->
    <div class="bg-white rounded-b-md ">
      <CampaignInstructionsList v-if="show" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ChevronDown from "@/components/svg/ChevronDown.vue";
import ChevronUp from "@/components/svg/ChevronUp.vue";
import CampaignInstructionsList from "./CampaignInstructionsList.vue";

@Component({
  name: "CampaignInstructionsMenu",
  components: {
    ChevronDown,
    CampaignInstructionsList,
    ChevronUp,
  },
})
export default class CampaignInstructionsMenu extends Vue {
  private show: boolean = false;

  private toggle() {
    this.show = !this.show;
  }
}
</script>

<style scoped></style>

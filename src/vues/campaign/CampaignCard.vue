<template>
  <div
    class="h-full bg-cover  bg-center"
    :style="{
      'background-image':
        'url(' + util.searchImageUrl(result.campaignFiles) + ')',
    }"
  >
    <div class="h-full flex items-end  bg-transparent-black">
      <div class="flex-1  p-6 flex flex-col justify-between text-white">
        <div class="flex-1">
          <p class="text-sm font-semibold spartan ">
            {{ result.name }}
          </p>
          <p class="mt-3 text-xs spartan leading-5">
            {{ util.managedString(result.description, 100) }}
          </p>
          <p class="mt-3 text-sm spartan">
            {{ result.totalFundsRaised }} raised out of {{ result.targetFunds }}
          </p>
        </div>
        <div class="pb-3">
          <div class="relative">
            <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                :style="
                  `width: ${(result.totalFundsRaised * 100) /
                    result.targetFunds}%`
                "
                class="
        shadow-none
        flex flex-col
        text-center
        whitespace-nowrap
        text-white
        justify-center
        progressbar-green
        rounded-full
      "
              ></div>
            </div>
          </div>
        </div>
        <div class="mt-0 grid grid-cols-2 items-center">
          <div
            class="cursor-pointer h-11 w-full buyLotteryBtn spartan flex justify-center items-center"
          >
            <span>Donate</span>
          </div>

          <div class="flex justify-center ">
            <div
              class="cursor-pointer h-6 w-20 flex justify-center items-center spartan"
            >
              <div @click="showCampaignDetails(result)">
                <span>Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseVue from "../../components/BaseVue";

@Component({
  name: "CampaignCard",
  props: {
    result: {
      required: true,
      type: Object,
    },
  },
})
export default class CampaignCard extends BaseVue {
  // private scrollToTop = () => {
  //   const page = document.getElementById("campaignDetails") as HTMLElement;
  //   page.scroll(0, 0);
  // };
  private showCampaignDetails(campaign: any) {
    this.$router.push(`/campaign/${campaign.id}`);
    // this.scrollToTop;
  }
}
</script>

<style scoped></style>

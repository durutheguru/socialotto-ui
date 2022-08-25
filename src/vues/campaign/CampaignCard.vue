<template>
  <div
    @click="showCampaignDetails(result)"
    class="h-full bg-cover  bg-center cursor-pointer cardBoxShadow"
    :style="{
      'background-image':
        'url(' +
        util.searchImageUrl(result.campaignFiles || result.files) +
        ')',
    }"
  >
    <div class="h-full flex items-end  bg-transparent-black">
      <div class="flex-1  p-6 flex flex-col justify-between text-white h-full">
        <div class="mb-auto flex justify-end relative">
          <div
            class="cursor-pointer campaignBadge rounded-lg flex justify-center items-center"
          >
            <span class="spartan text-sm ">Campaign</span>
          </div>
        </div>
        <div class="mt-auto">
          <p class="text-sm font-semibold spartan ">
            {{ result.name }}
          </p>
          <p class="mt-3 text-xs spartan leading-5">
            {{ util.managedString(result.description, 100) }}
          </p>
          <p class="mt-3 text-sm spartan">
            &#x20A6;{{ formatCurrency(result.totalFundsRaised) }} raised out of
            &#x20A6;{{ formatCurrency(result.targetFunds) }}
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
        <div class="mt-0 flex items-center justify-center">
          <!-- <div
            class="hidden cursor-pointer h-11 w-full buyLotteryBtn spartan flex justify-center items-center"
          >
            <span>Donate</span>
          </div> -->

          <div class="flex justify-center ">
            <div
              class="cursor-pointer h-6 w-20 flex justify-center items-center spartan"
            >
              <div>
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
import { Constants, Util } from "@/components/util";

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

  private formatCurrency(amount: number) {
    return Util.currencyFormatter(amount, Constants.currencyFormat);
  }
}
</script>

<style scoped></style>

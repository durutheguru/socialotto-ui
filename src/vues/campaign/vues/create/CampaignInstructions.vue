<template>
  <div class="w-full lg:w-11/12 ml-auto">
    <div class="mb-1">
      <h1 class="spartan text-2xl font-semibold dark-blue-text mb-0">
        What you need to know before starting a campaign
      </h1>
    </div>
    <div class="bg-white rounded-md">
      <div class="p-6">
        <div class="mb-6">
          <span class="spartan text-sm font-semibold dark-blue-text">
            To guide you on how best to enter information on each field to
            create this campaign.
          </span>
        </div>
        <div>
          <div class="spartan font-medium text-base text-grey-light">
            <ol v-for="instruction in instructions" :key="instruction">
              <li class="mb-8">{{ instruction }}</li>
            </ol>
          </div>

          <div class="mb-6">
            <div>
              <span class="light-blue-text font-semibold spartan"
                >Note: We add the% interest neccessary to run a fund raising
                campaign to the cost amount you provide and display to the
                potential donators.
              </span>
            </div>
          </div>
          <div class="mb-10">
            <div>
              <span class="font-semibold spartan text-red-500"
                >Warning: When your campaign is hosted on Socialotto, you are
                required to fulfill all terms stated as legal steps are taken
                against anyone who breaches the conditions of the raised funds.
              </span>
            </div>
          </div>
          <div class="mb-1 flex justify-center">
            <h1 class="spartan text-xl font-semibold dark-blue-text mb-0">
              Goodluck with your campaign!
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "CampaignInstructions",
})
export default class CampaignInstructions extends Vue {
  private instructions: string[] = [
    "1. Choose a title that describes what the fund will be used for. It doesn’t have to be short as long as it accurately describes the campaign.",
    "2. Your campaign details should be a compelling story about what the problem is and how the funds will be used to solve the problem (campaign goal).",
    "3. Categories help us to sort the campaigns. Choose the category that best describes the campaign cause.",
    "4. Upload an image relevant to the campaign and any relevant documents that validate the authenticity of the campaign.",
    "5. How much does the campaign need to raise to fulfill the goal?",
    "6. How long is the maximum time you can wait before the funds are urgently needed?",
    "7. How long will it take to use the campaign funds to effect the goal of the campaign?",
  ];
}
</script>

<style scoped></style>

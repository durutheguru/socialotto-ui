<template>
  <!-- style="background-image: url('https://socialotto.s3.ca-central-1.amazonaws.com/uploads/images.jpg')" -->
  <!-- :style="{
      'background-image':
        'url(' + `${util.searchImageUrl(result.campaignFiles)}` + ')',
    }" -->
  <!-- :style="{ backgroundImage: `url(${result.campaignFiles[0].reference})` }" -->
  <div
    class="h-full bg-cover  bg-center"
    :style="{
      'background-image':
        'url(' + util.searchImageUrl(result.campaignFiles) + ')',
    }"
  >
    <!-- <div :style="{ backgroundImage: `url(${post.imageUrl})` }"></div> -->

    <div class="h-full flex items-end  bg-transparent-black">
      <!-- <div class="flex-shrink-0">
        <img class="h-48 w-full object-cover" :src="post.imageUrl" alt="" />
      </div> -->
      <!-- <div class=" h-full flex items-end"> -->
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
              <span>Details</span>
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
// import {  PropType } from "vue"

@Component({
  name: "CampaignCard",
  props: {
    result: {
      required: true,
      type: Object,
    },
  },
  // computed:{
  //  styling(){
  //    return {
  //            background-image: `${this.post.imageUrl}`
  //        }
  // }
})
export default class CampaignCard extends BaseVue {
  private searchImageUrl(arr: any[]) {
    const obj: any = arr.find(({ fileType }) => {
      fileType.slice(0, 5) === "image";
    });

    return obj.publicUrl;
  }

  // private mounted() {
  //   Log.info("propsCampaign: " + JSON.stringify(result));
  // }
}
</script>

<style scoped>
/* .main {
  background-image: url(post.imageUrl);
} */
</style>

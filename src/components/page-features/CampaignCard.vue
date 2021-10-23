<template>
  <div class="h-full ">
    <!-- <div :style="{ backgroundImage: `url(${post.imageUrl})` }"></div> -->

    <div class="h-full flex items-end lotteryNcampaignGrid ">
      <div class="flex-shrink-0">
        <img class="h-48 w-full object-cover" :src="post.imageUrl" alt="" />
      </div>
      <div class="backgroundGrey h-full flex items-end">
        <div
          class="flex-1 p-6 flex flex-col justify-between lotteryNcampaignTxt"
        >
          <div class="flex-1">
            <!-- <div class="mt-6 flex justify-end mb-44">
            <div
              class=" h-11 w-20 lotteryBtn rounded-lg flex justify-center items-center"
            >
              <span>Lottery</span>
            </div>
          </div> -->

            <p class="text-sm font-bold ">
              20 regular and 5 VIP tickets to Wizkid’s MIL concert in December
            </p>
            <p class="mt-3 text-base ">
              5,000 raffle tickets sold
            </p>
            <p class="mt-3 text-base ">
              N250,000 raised out of N2million
            </p>
          </div>
          <div class="mt-0 grid grid-cols-2 items-center">
            <div
              class=" h-11 w-full buyLotteryBtn flex justify-center items-center"
            >
              <span>Donate</span>
            </div>

            <div class="flex justify-center ">
              <div class=" h-6 w-20 flex justify-center items-center">
                <span>Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import {  PropType } from "vue"

@Component({
  name: "CampaignCard",
  props: {
    post: {
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
export default class CampaignCard extends Vue {}
</script>

<style scoped>
/* .main {
  background-image: url(post.imageUrl);
} */
</style>

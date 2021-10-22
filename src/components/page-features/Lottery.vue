<template>
  <div class="h-full ">
    <div class="h-full" :style="{ backgroundImage: `url(${post.imageUrl})` }">
      <!-- <div class="flex-shrink-0">
        <img class="h-48 w-full object-cover" :src="post.imageUrl" alt="" />
      </div> -->
      <div class="flex-1 p-6 flex flex-col justify-between lotteryNcampaignTxt">
        <div class="flex-1">
          <div class="mt-6 flex justify-end mb-44">
            <div
              class=" h-11 w-20 lotteryBtn rounded-lg flex justify-center items-center"
            >
              <span>Lottery</span>
            </div>
          </div>

          <p class="text-sm font-bold ">
            20 regular and 5 VIP tickets to Wizkid’s MIL concert in December
          </p>
          <p class="mt-3 text-base ">
            5,000 raffle tickets sold
          </p>
        </div>
        <div class="mt-0 flex items-center">
          <div
            class=" h-11 w-full buyLotteryBtn flex justify-center items-center"
          >
            <span>Buy Ticket</span>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <div class=" h-6 w-20 flex justify-center items-center">
            <span>Details</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Lottery",
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
})
export default class Lottery extends Vue {}
</script>

<style scoped></style>

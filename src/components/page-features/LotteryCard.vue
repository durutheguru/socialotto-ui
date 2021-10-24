<template>
  <div
    class="h-full bg-cover"
    :style="{ backgroundImage: `url(${post.imageUrl})` }"
  >
    <!-- <div :style="{ backgroundImage: `url(${post.imageUrl})` }"></div> -->
    <div class="h-full flex items-end bg-transparent-black">
      <!-- <div class="flex-shrink-0 ">
        <img class="h-48 w-full object-cover" :src="post.imageUrl" alt="" />
      </div> -->
      <!-- <div class="backgroundGrey h-full flex items-end"> -->
      <div class="flex-1  p-6 flex flex-col justify-between text-white">
        <div class="flex-1">
          <div class="mt-6 flex justify-end mb-44 ">
            <div
              class="cursor-pointer h-11 w-20 lotteryBtn rounded-lg flex justify-center items-center"
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
            class="cursor-pointer h-11 w-full buyLotteryBtn flex justify-center items-center active:translate-y-2"
          >
            <span>Buy Ticket</span>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <div class="cursor-pointer h-6 w-20 flex justify-center items-center">
            <span>Details</span>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "LotteryCard",
  props: {
    post: {
      required: true,
      type: Object,
    },
  },
})
export default class LotteryCard extends Vue {}
</script>

<style scoped></style>

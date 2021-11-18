<template>
  <!-- :style="{ backgroundImage: `url(${post.imageUrl})` }" -->

  <div
    class="h-full bg-cover bg-center"
    :style="{
      'background-image':
        'url(' + util.searchImageUrl(result.lotteryFiles) + ')',
    }"
  >
    <!-- <div :style="{ backgroundImage: `url(${post.imageUrl})` }"></div> -->
    <div class="h-full flex items-end bg-transparent-black">
      <!-- <div class="flex-shrink-0 ">
        <img class="h-48 w-full object-cover" :src="post.imageUrl" alt="" />
      </div> -->
      <!-- <div class="backgroundGrey h-full flex items-end"> -->
      <div
        class="h-full flex-1 justify-end relative p-6 flex flex-col text-white"
      >
        <div class="mb-auto flex justify-end relative">
          <div
            class="cursor-pointer lotteryBtn rounded-lg flex justify-center items-center"
          >
            <span class="spartan text-sm ">Lottery</span>
          </div>
        </div>
        <div class="flex flex-col">
          <div>
            <p class="text-sm font-semibold spartan ">
              {{ result.name }}
            </p>
            <p class="mt-3 text-xs spartan leading-5">
              {{ util.managedString(result.description, 100) }}
            </p>
          </div>
        </div>
        <div class="mt-0 flex items-center spartan">
          <div
            class="cursor-pointer spartan h-11 w-full buyLotteryBtn flex justify-center items-center active:translate-y-2"
          >
            <span>Buy Ticket</span>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <div
            class=" spartan cursor-pointer h-6 w-20 flex justify-center items-center"
          >
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
import BaseVue from "../../components/BaseVue";

@Component({
  name: "LotteryCard",
  props: {
    result: {
      required: true,
      type: Object,
    },
  },
})
export default class LotteryCard extends BaseVue {}
</script>

<style scoped></style>

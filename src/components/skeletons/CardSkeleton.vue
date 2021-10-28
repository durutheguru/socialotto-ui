<template>
  <!-- :style="{ backgroundImage: `url(${post.imageUrl})` }" -->
  <div
    class="w-full sm:w-4/5 mx-auto md:w-full flex flex-col rounded-lg overflow-hidden"
    style="height: 458px;"
  >
    <div class="h-full ">
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
              class="cursor-pointer block animate-pulse h-11 w-20  rounded-lg flex justify-center items-center"
            >
              <!-- <span>Lottery</span> -->
            </div>
          </div>
          <div class="flex flex-col">
            <div>
              <p
                class="text-sm block font-bold animate-pulse h-5 w-4/5 rounded-sm bg-gray-50"
              >
                <!-- {{ result.name }} -->
              </p>
              <p
                class="mt-3 block text-base animate-pulse h-5 w-full bg-gray-50 rounded-sm"
              >
                <!-- {{ util.managedString(result.description, 100) }} -->
              </p>
            </div>
          </div>
          <div class="mt-0 flex items-center">
            <div
              class="cursor-pointer animate-pulse block h-11 w-full buyLotteryBtn flex justify-center items-center active:translate-y-2"
            >
              <!-- <span>Buy Ticket</span> -->
            </div>
          </div>

          <div class="mt-6 flex justify-center">
            <div
              class="cursor-pointer animate-pulse h-6 w-20 flex justify-center items-center"
            >
              <!-- <span>Details</span> -->
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "cardSkeleton",
})
export default class CardSkeleton extends Vue {}
</script>

<style scoped></style>

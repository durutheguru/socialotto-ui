<template>
  <div class="bg-white">
    <div class="max-w-screen-xl mx-auto pt-5 md:pt-20 sm:w-11/12">
      <div class="pb-14">
        <h1 class="spartan font-semibold text-xl text-black">
          Similar campaigns and lotteries
        </h1>
        <div
          class=" auto-cols-fr mx-auto grid gap-10 md:gap-10  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none mb-16"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "CampaignDetailsSec3",
})
export default class CampaignDetailsSec3 extends Vue {}
</script>

<style scoped></style>

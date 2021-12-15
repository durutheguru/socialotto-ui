<template>
  <div
    class="divContainer overflow-auto lg:overflow-y-scroll bg-blue-50 spartan"
  >
    <h1 class="">ViewLotteryDetails</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ViewLotteryDetails",
})
export default class ViewLotteryDetails extends Vue {
  get lotteryDetailsId() {
    return this.$route.params;
  }

  private mounted() {
    console.log("route:", "viewLottery");
  }
}
</script>

<style scoped></style>

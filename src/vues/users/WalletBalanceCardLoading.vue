<template>
  <div
    style="
        background: linear-gradient(137.03deg, #4691A6 29.77%, #2C5662 87.65%);
        border-radius: 12px;
        width: 50rem
	      "
    class="spartan flex items-center justify-between py-4 px-6 "
  >
    <div class="fanimate-pulse lex flex-col justify-between  mr-4 w-60">
      <span class="text-white fw-400 fs-16 mb-2"></span>
      <h1 class="fw-700 fs-32 text-white mb-0"></h1>
    </div>

    <div class="flex-col w-80">
      <div
        class="animate-pulse br-12 h-12 cursor-pointer flex items-center justify-center mb-4"
        style="border: 1px solid #FFFFFF;"
      >
        <span class="animate-pulse text-white fw-500 fs-16"></span>
      </div>

      <div class="flex justify-between">
        <div
          class="animate-pulse px-7 py-2.5 h-10 bg-white cursor-pointer w-6/12 br-12 flex justify-center"
        >
          <span
            class="animate-pulse fw-500 fs-16"
            style="color: #3C798A;"
          ></span>
        </div>
        <div
          style="background-color: #CDE4EA;"
          class="animate-pulse  py-2.5  h-10 cursor-pointer flex justify-center w-5/12 br-12"
        >
          <span
            class="animate-pulse fw-500 fs-16 mr-2"
            style="color: #3C798A;"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "WalletBalanceCardLoading",
})
export default class WalletBalanceCardLoading extends Vue {}
</script>

<style scoped></style>

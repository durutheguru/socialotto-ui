<template>
  <div>
    <div class="">
      <div class="flex spartan font-medium text-sm mb-12 w-full ">
        <button
          class="animate-pulse mr-10 cursor-pointer focus:underline h-2 w-12 bg-blue-50"
        >
          <!-- Info -->
        </button>
        <button
          class="animate-pulse mr-10 cursor-pointer focus:underline h-2 w-12 bg-blue-50"
        >
          <!-- Campaign Status -->
        </button>
        <button
          class="animate-pulse mr-10 cursor-pointer focus:underline h-2 w-12 bg-blue-50"
        >
          <!-- Updates -->
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "InfoStatusUpdatesSkeleton",
})
export default class InfoStatusUpdatesSkeleton extends Vue {}
</script>

<style scoped></style>

<template>
  <div class="lg:ml-10 lg:w-11/12 relative" style="top: -47px; left: 0%;">
    <div class="h-2 w-12 bg-blue-50 animate-pulse mb-12">
      <h1
        class="animate-pulse spartan text-grey-light text-sm font-medium mb-12"
      ></h1>
    </div>
    <div class="bg-dark-blue rounded-md p-4 animate-pulse">
      <h1
        class="bg-gray-50 h-4 w-12 animate-pulse spartan font-semibold text-white text-base mb-7 "
      >
        <!-- Other info -->
      </h1>
      <ul class="list-disc text-white space-y-4">
        <li
          class="bg-gray-50 h-4 w-44 animate-pulse text-gray-300 text-sm spartan font-normal"
          style="margin-left: 1.3rem;"
        >
          <!-- <span class="text-gray-400"
            >Aliqua id fugiat nostrud irure ex duis</span
          > -->
        </li>
        <li
          class="bg-gray-50 h-4 w-44 animate-pulse text-gray-300 text-sm spartan font-normal"
          style="margin-left: 1.3rem;"
        >
          <!-- <span class="text-gray-400"
            >Aliqua id fugiat nostrud irure ex duis</span
          > -->
        </li>
        <li
          class="bg-gray-50 h-4 w-44 animate-pulse text-gray-300 text-sm spartan font-normal"
          style="margin-left: 1.3rem;"
        >
          <!-- <span class="text-gray-400"
            >Aliqua id fugiat nostrud irure ex duis</span
          > -->
        </li>
        <li
          class="bg-gray-50 h-4 w-44 animate-pulse text-gray-300 text-sm spartan font-normal"
          style="margin-left: 1.3rem;"
        >
          <!-- <span class="text-gray-400"
            >Aliqua id fugiat nostrud irure ex duis</span
          > -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "FAQSkeleton",
})
export default class FAQSkeleton extends Vue {}
</script>

<style scoped></style>

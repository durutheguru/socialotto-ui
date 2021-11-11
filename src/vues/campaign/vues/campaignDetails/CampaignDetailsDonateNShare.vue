<template>
  <div class="flex flex-col">
    <div></div>
    <div class="flex border-b-2 border-gray-200 justify-between">
      <span>N246, 000 raised</span>
      <span>32 days left</span>
    </div>
    <div class="flex flex-col border-b-2 border-gray-200">
      <div class="flex  justify-between">
        <span>Campaign goal</span>
        <span>N700,000</span>
      </div>
      <!-- ----------- -->
      <div class="flex  justify-between">
        <span>Contributors</span>
        <span>234 people</span>
      </div>
      <!-- ----------- -->
      <div class="flex  justify-between">
        <span>Contributors</span>
        <div class="flex">
          <span>234 people</span>

          <div class="bg-blue-200 rounded-md">
            <svg
              class="m-1"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5"
                stroke="#FCFCFC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.83301 8.33325L9.99967 12.4999L14.1663 8.33325"
                stroke="#FCFCFC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 12.5V2.5"
                stroke="#FCFCFC"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "CampaignDetailsDonateNShare",
})
export default class CampaignDetailsDonateNShare extends Vue {}
</script>

<style scoped></style>

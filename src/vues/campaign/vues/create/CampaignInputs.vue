<template>
  <div>
    <div>
      <h1>Create your campaign</h1>
    </div>
    <div>
      <div class="flex">
        <div>
          <span
            class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500"
          >
            <span class="text-lg font-medium leading-none text-white">1</span>
          </span>
        </div>
        <div class="w-9/12">
          <div class="w-full mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Campaign title</label
            >
            <div class="mt-1">
              <input
                type="text"
                name="campaign_title"
                id="campaign_title"
                class="h-12 bg-transparent border border-solid px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Help a father of 3 with money for his kidney surgery in India"
              />
            </div>
          </div>

          <div class="w-full mb-6">
            <label
              for="campaign_details"
              class="block text-sm font-medium text-gray-700"
              >Campaign details</label
            >
            <div class="mt-1 rounded-md">
              <textarea
                autocomplete="off"
                id="campaign_details"
                v-model="campaignDetails"
                required
                rows="6"
                class="bg-transparent border border-solid rounded-md px-2 form-textarea mt-1 border bg-cool-gray-50 border-gray-200 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                placeholder="Bank details for X..."
              ></textarea>
            </div>
          </div>

          <div class="w-full mb-6">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Upload campaign images</label
            >
            <div class="mt-1">
              <div
                class="h-12 flex bg-transparent border border-solid rounded-md"
              >
                <input
                  type="text"
                  name="campaign_title"
                  id="campaign_title"
                  class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
                  placeholder="Help a father of 3 with money for his kidney surgery in India"
                />
                <div>
                  <span>Upload</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "CampaignInputs",
})
export default class CampaignInputs extends Vue {}
</script>

<style scoped></style>

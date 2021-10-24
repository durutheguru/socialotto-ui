<template>
  <div class="grid lg:grid-col-2 grid-flow-col gap-10 rounded-md lg:max-w-none">
    <div class="flex flex-col relative h-12 ">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        id="email"
        class="rounded-md text-sm spartan form-input w-full h-full pl-10 sm:text-sm sm:leading-5 bg-transparent border-grey-dark placeholder-gray-900 text-gray-900"
        placeholder="search for NGOs or campaign names"
      />
    </div>

    <div class="flex flex-col">
      <span class="flex justify-end rounded-md h-full ">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border-grey-dark text-base leading-6 font-medium rounded-md text-grey-light bg-transparent focus:outline-none transition ease-in-out duration-150"
        >
          Filter
          <svg
            class="ml-3 -mr-1 h-5 w-5 text-grey-light"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
            />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SearchNFilter extends Vue {}
</script>

<style scoped></style>

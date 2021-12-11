<template>
  <div
    @click="toggleMenu"
    class="relative cursor-pointer relative h-8 w-8 rounded-full flex justify-center items-center my-auto "
  >
    <div class="">
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
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
      </svg>
    </div>
    <div class="absolute shadow-sm rounded-md  right-0 top-0 z-50" v-if="show">
      <ul class="h-44 w-40 grid grid-rows-3">
        <li
          class="grid-rows-1 bg-white hover:bg-gray-200 grid justify-center items-center td-elipsis-menu "
        >
          View Details
        </li>
        <li
          class="grid-rows-1 bg-white hover:bg-gray-200 grid justify-center items-center"
        >
          Extend
        </li>
        <li
          class="grid-rows-1 bg-white hover:bg-gray-200 grid justify-center items-center"
        >
          Suspend
        </li>
      </ul>
      <!-- <ul class="h-44 w-40 flex flex-col">
        <li class="bg-white hover:bg-gray-200">view</li>
      </ul> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "LotteryRowMenu",
  props: {
    status: String,
  },
})
export default class LotteryRowMenu extends Vue {
  private show: boolean = false;

  private toggleMenu() {
    this.show = !this.show;
  }
}
</script>

<style scoped></style>

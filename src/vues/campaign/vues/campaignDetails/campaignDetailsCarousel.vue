<template>
  <div class="h-full relative rounded-md">
    <carousel-slides
      v-for="(slide, index) in slides"
      :key="index"
      :index="index"
      :visibleSlide="visibleSlide"
      :direction="direction"
    >
      <!-- <img class="w-full" :src="slide" alt="" /> -->

      <div
        class="h-full bg-cover  bg-center rounded-md"
        :style="{
          'background-image': 'url(' + slide + ')',
        }"
      ></div>
    </carousel-slides>
    <button
      @click="next"
      class="absolute right-0  top-1/3 px-2 py-4 bg-transparent-black cursor-pointer  hover:text-white"
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
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
    <button
      @click="prev"
      class="absolute left-0 top-1/3 px-2 py-4 bg-transparent-black cursor-pointer hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CarouselSlides from "./CarouselSlides.vue";

@Component({
  name: "CampaignDetailsCarousel",
  components: {
    CarouselSlides,
  },
})
export default class CampaignDetailsCarousel extends Vue {
  private slides = [
    "https://picsum.photos/id/237/500/300",
    "https://picsum.photos/id/238/500/300",
    "https://picsum.photos/id/239/500/300",
  ];
  private visibleSlide = 0;

  private direction = "";

  private next() {
    this.direction = "left";
    if (this.visibleSlide >= this.slides.length - 1) {
      this.visibleSlide = 0;
    } else {
      this.visibleSlide++;
    }
  }

  private prev() {
    this.direction = "right";
    if (this.visibleSlide <= 0) {
      this.visibleSlide = this.slides.length - 1;
    } else {
      this.visibleSlide--;
    }
  }
}
</script>

<style scoped>
/* * {
  box-sizing: border-box;
} */
</style>

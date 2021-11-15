<template>
  <div class="h-full relative rounded-md">
    <carousel-slides
      v-for="(slide, index) in slides"
      :key="index"
      :index="index"
      :visibleSlide="visibleSlide"
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
      style="top: calc(50% - 35px);"
      class="absolute right-0  px-2 py-4 bg-transparent-black cursor-pointer  hover:text-white"
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
      style="top: calc(50% - 35px);"
      class="absolute left-0  px-2 py-4 bg-transparent-black cursor-pointer hover:text-white"
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
    <br />

    <div style="text-align:center" class="absolute w-full bottom-0 mb-3">
      <div>
        <button
          v-for="(slide, index) in slides"
          :key="index"
          class="dot"
          :class="visibleSlide === index ? 'activeDot' : 'dot'"
          @click="currentSlide(index)"
        ></button>
      </div>
    </div>
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

  private currentSlide(n: number) {
    this.visibleSlide = n;
  }

  private next() {
    if (this.visibleSlide >= this.slides.length - 1) {
      this.visibleSlide = 0;
    } else {
      this.visibleSlide++;
    }
  }

  private prev() {
    if (this.visibleSlide <= 0) {
      this.visibleSlide = this.slides.length - 1;
    } else {
      this.visibleSlide--;
    }
  }
}
</script>

<style scoped>
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.4s ease;
  position: relative;
}
/* .active,
.dot:focus {
  background-color: #717171;
} */
.dot:hover {
  background-color: #717171;
}

.activeDot {
  background-color: #717171;
}

.inactiveDot {
  background-color: blue;
}
</style>

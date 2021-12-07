<template>
  <div class="h-full relative rounded-md">
    <carousel-slides
      v-for="(slide, index) in images"
      :key="index"
      :index="index"
      :visibleSlide="visibleSlide"
    >
      <!-- <img class="w-full" :src="slide" alt="" /> -->

      <div
        class="h-full bg-cover  bg-center rounded-md"
        :style="{
          'background-image': `url(${slide.publicUrl})`,
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
          v-for="(slide, index) in images"
          :key="slide.reference"
          class="dot"
          :class="visibleSlide === index ? 'activeDot' : 'dot'"
          @click="currentSlide(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CarouselSlides from "@/vues/campaign/vues/campaignDetails/CarouselSlides.vue";
// import { Component, Vue,  } from "vue-property-decorator";

@Component({
  name: "LotteryDetailsCarousel",
  components: {
    CarouselSlides,
  },
})
export default class LotteryDetailsCarousel extends Vue {
  @Prop()
  private images!: any[];
  // private images!: Array<any>;

  private visibleSlide = 0;

  private currentSlide(n: number) {
    this.visibleSlide = n;
  }

  private next() {
    if (this.visibleSlide >= this.images.length - 1) {
      this.visibleSlide = 0;
    } else {
      this.visibleSlide++;
    }

    // Log.info("");
  }

  private prev() {
    if (this.visibleSlide <= 0) {
      this.visibleSlide = this.images.length - 1;
    } else {
      this.visibleSlide--;
    }
  }
}
</script>

<style scoped></style>

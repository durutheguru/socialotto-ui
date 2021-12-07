<template>
  <transition name="fade">
    <div v-show="visibleSlide === index" class="rounded-md carousel-slide">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "CarouselSlides",
  props: {
    //   img: {
    //     required: true,
    //     type: String,
    //   },
    index: {
      required: true,
      type: Number,
    },
    visibleSlide: {
      required: true,
      type: Number,
    },
  },
})
export default class CarouselSlides extends Vue {}
</script>

<style scoped>
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

.carousel-slide {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
/* .left-enter-active {
  animation: leftInAnimation 0.4s ease-in-out;
}

.left-leave-active {
  animation: leftOutAnimation 0.4s ease-in-out;
}
@keyframes leftInAnimation {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes leftOutAnimation {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}

.right-enter-active {
  animation: rightInAnimation 0.4s ease-in-out;
}

.right-leave-active {
  animation: rightOutAnimation 0.4s ease-in-out;
}
@keyframes rightInAnimation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}
@keyframes rightOutAnimation {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
} */
</style>

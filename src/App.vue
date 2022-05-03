<template>
  <section id="container" class="overflow-hidden">
      <!-- <fade-transition origin="center" mode="out-in" :duration="250"> -->
        <template>
        <global-alert />
        <!-- <global-alert-2 /> -->
       
          <router-view />
          </template>
      <!-- </fade-transition> -->
  </section>
</template>

<script>
import { FadeTransition } from "vue2-transitions";
import GlobalAlert from "./vues/Alert/GlobalAlert.vue"
// import GlobalAlert2 from "./vues/Alert/GlobalAlert2.vue"

export default {
  components: {
    FadeTransition,
    GlobalAlert,
    // GlobalAlert2
  }
};
</script>

<style src="./assets/tailwind.css">

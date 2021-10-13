<template>
  <section id="container">
      <!-- <fade-transition origin="center" mode="out-in" :duration="250"> -->
        <template>
        <global-alert />
          <router-view />
          </template>
      <!-- </fade-transition> -->
  </section>
</template>

<script>
import { FadeTransition } from "vue2-transitions";
import GlobalAlert from "./vues/Alert/GlobalAlert.vue"

export default {
  components: {
    FadeTransition,
    GlobalAlert
  }
};
</script>

<style src="./assets/tailwind.css">

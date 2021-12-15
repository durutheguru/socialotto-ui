<template>
  <section id="container" class="overflow-hidden">
      <!-- <fade-transition origin="center" mode="out-in" :duration="250"> -->
        <template>
        <global-alert />
        <lottery-disapproval-modal />
          <router-view />
          </template>
      <!-- </fade-transition> -->
  </section>
</template>

<script>
import { FadeTransition } from "vue2-transitions";
import GlobalAlert from "./vues/Alert/GlobalAlert.vue"
import LotteryDisapprovalModal from "@/vues/backoffice/vues/lottery/LotteryDisapprovalModal.vue"

export default {
  components: {
    FadeTransition,
    GlobalAlert,
    LotteryDisapprovalModal
  }
};
</script>

<style src="./assets/tailwind.css">

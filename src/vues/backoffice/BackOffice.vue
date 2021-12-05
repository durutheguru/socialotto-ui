<template>
  <div class="h-full w-full grid grid-cols-6">
    <BackofficeSidebar />

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BackofficeSidebar from "./BackOfficeSidebar.vue";
// import BackOfficeHome from './BackOfficeHome';

@Component({
  name: "BackOffice",
  components: {
    // BackOfficeHome,
    BackofficeSidebar,
  },
})
export default class BackOffice extends Vue {}
</script>

<style lang="scss" src="@/sass/main.scss"></style>

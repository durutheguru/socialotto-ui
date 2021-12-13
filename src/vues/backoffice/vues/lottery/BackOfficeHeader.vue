<template>
  <div class="wrapper ">
    <div class="background h-20"><h1>Header BackOffice</h1></div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "BackOfficeHeader",
})
export default class BackOfficeHeader extends Vue {}
</script>

<style scoped>
.background {
  background-color: #1d414b;
}
</style>

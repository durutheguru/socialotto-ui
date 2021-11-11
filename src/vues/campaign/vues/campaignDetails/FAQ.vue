<template>
  <div>
    <h1>FAQ</h1>
    <div class="bg-dark-blue rounded-md p-4">
      <h1>Others</h1>
      <ul class="list-disc text-white space-y-4">
        <li class="ml-4">beans</li>
        <li class="ml-4">beans</li>
        <li class="ml-4">beans</li>
        <li class="ml-4">beans</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "FAQ",
})
export default class FAQ extends Vue {}
</script>

<style scoped></style>

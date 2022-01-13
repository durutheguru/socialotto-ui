<template>
  <div>
    <!-- <ul v-for=>
            <li></li>
        </ul> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "StatusMenu",
  props: {
    menuItems: Array,
  },
})
export default class StatusMenu extends Vue {}
</script>

<style scoped></style>

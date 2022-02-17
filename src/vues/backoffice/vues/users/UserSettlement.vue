<template>
  <div class="p-8 w-8/12">
    <div class="spartan text-black fs-16 flex ">
      <div class="mr-8 cursor-pointer">
        <input type="radio" v-model="settlement" v-bind:value="'rate'" /><span
          class="ml-3 spartan fw-500 fs-16"
          >Rate</span
        >
      </div>
      <div class="curspor-pointer">
        <input type="radio" v-model="settlement" v-bind:value="'fiat'" /><span
          class="ml-3 spartan fw-500 fs-16"
          >Fiat</span
        >
      </div>
    </div>
    <Rate v-if="settlement === 'rate'" />
    <Fiat v-if="settlement === 'fiat'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Rate from "./Rate.vue";
import Fiat from "./Fiat.vue";
@Component({
  name: "UserSettlement",
  components: {
    Rate,
    Fiat,
  },
})
export default class UserSettlement extends Vue {
  private settlement = "rate";
}
</script>

<style scoped></style>

<template>
  <div class="p-8 pb-20 w-8/12">
    <div class="spartan text-black fs-16 flex ">
      <div class="mr-8 cursor-pointer">
        <input type="radio" v-model="settlement" v-bind:value="'rate'" /><span
          class="ml-3 spartan fw-500 fs-16"
          >Rate</span
        >
      </div>
      <div class="curspor-pointer">
        <input type="radio" v-model="settlement" v-bind:value="'flat'" /><span
          class="ml-3 spartan fw-500 fs-16"
          >Flat</span
        >
      </div>
    </div>
    <Rate v-if="settlement === 'rate'" :username="username" />
    <Flat v-if="settlement === 'flat'" :username="username" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Rate from "./Rate.vue";
import Flat from "./Flat.vue";
@Component({
  name: "UserSettlement",
  props: {
    username: String,
  },
  components: {
    Rate,
    Flat,
  },
})
export default class UserSettlement extends Vue {
  private settlement = "rate";
}
</script>

<style scoped></style>

<template>
  <div>
    <!-- <div class="mx-3">
      <i
        v-on:click="dropOpen = !dropOpen"
        class="material-icons md-36 cursor-pointer"
        aria-haspopup="true"
        :aria-expanded="dropOpen"
        >more_horiz</i
      >
    </div>
    <div class="mt-16">
      <div
        v-if="dropOpen"
        id="dropdown"
        class="absolute  rounded shadow right-0  bg-white w-1/12"
      >
        <a href="#" class="">Setting</a>
        <a href="#" class="">Logout</a>
      </div>
    </div> -->
    <div class="box p-6 w-40 mx-auto my-10  bg-pink-500">
      Click outside me to hide me
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ExpMenu",
})
export default class ExpMenu extends Vue {
  private mounted() {
    document.addEventListener("click", function(event) {
      let box = document.querySelector(".box") as HTMLFormElement;
      const etarget = event.target as HTMLFormElement;

      if (etarget.closest(".box")) {
        return;
      }
      console.log("box:", box);
      box.classList.add("box-hidden");
    });
  }
}
</script>

<style scoped>
.box-hidden {
  display: none;
}
</style>

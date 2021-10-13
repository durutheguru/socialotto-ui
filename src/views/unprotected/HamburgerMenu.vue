<template>
  <div v-if="dropMenu" class="h-full w-full bg-gray-50 fixed top-0 left-0 z-20">
    Hello
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../../store/index";
@Component({
  name: "Hamburger Menu",
})
export default class HamburgerMenu extends Vue {
  private get dropMenu(): boolean {
    return store.state.dropMenu;
  }

  private close() {
    store.commit("setDropMenu", false);
  }
}
</script>

<style scoped></style>

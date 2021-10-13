<template>
  <div v-if="dropMenu" class="h-full w-full bg-gray-50 fixed top-0 left-0 z-20">
    <div class=" mb-20 h-full  flex flex-col py-6">
      <div class=" flex flex-row justify-between px-6 py-6 mb-2">
        <span class="hamburgerLogo my-auto">Socialotto</span>
        <div class="flex items-center w-8 justify-center " @click="close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:text-3xl"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <router-link
        :to="'/login'"
        class="text-gray-500"
        exact
        active-class=" no-underline"
      >
        <div class="px-6 py-6 " @click="close">
          <span class="text-2xl sm:text-3xl hamburgerLink no-underline"
            >Sign in</span
          >
        </div>
      </router-link>

      <router-link
        :to="'/signup'"
        class="text-gray-500"
        exact
        active-class=" no-underline"
      >
        <div class="px-6 py-6 " @click="close">
          <span class="text-2xl sm:text-3xl hamburgerLink ">Sign up</span>
        </div>
      </router-link>
    </div>
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

<style scoped>
.active {
  /* @apply bg-gray-100; */
  @apply text-gray-900;
}
</style>

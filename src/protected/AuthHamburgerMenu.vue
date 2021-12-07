<template>
  <div
    v-if="dropAuthMenu"
    class="h-full w-full bg-gray-50 fixed top-0 left-0 z-20"
  >
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
        :to="'/support'"
        class="text-gray-500"
        exact
        active-class=" no-underline"
      >
        <div class="px-6 py-6 " @click="close">
          <span
            class="text-2xl light-blue-text sm:text-3xl hamburgerLink no-underline"
            >Support a campaign</span
          >
        </div>
      </router-link>

      <router-link
        :to="'/lotteries'"
        class="text-gray-500"
        exact
        active-class=" no-underline"
      >
        <div class="px-6 py-6 " @click="close">
          <span class="text-2xl sm:text-3xl hamburgerLink no-underline"
            >Lotteries</span
          >
        </div>
      </router-link>

      <router-link
        :to="'/profile'"
        class="text-gray-500"
        exact
        active-class=" no-underline"
      >
        <div class="px-6 py-6" @click="close">
          <div class="flex ">
            <div class="my-auto mr-2 pb-1">
              <img
                class="inline-block h-8 w-8  rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div class="my-auto mr-2 mb-2">
              <span
                class="text-2xl sm:text-3xl my-auto hamburgerLink no-underline leading-3"
                >Profile</span
              >
            </div>
          </div>
        </div>
      </router-link>

      <router-link
        :to="'/about'"
        class="text-gray-500"
        exact
        active-class=" no-underline"
      >
        <div class="px-6 py-6 " @click="close">
          <span class="text-2xl sm:text-3xl hamburgerLink "
            >About Socialotto</span
          >
        </div>
      </router-link>

      <router-link
        :to="'/partners'"
        class="text-gray-500"
        exact
        active-class=" no-underline"
      >
        <div class="px-6 py-6 " @click="close">
          <span class="text-2xl sm:text-3xl hamburgerLink ">Partners</span>
        </div>
      </router-link>

      <router-link
        :to="'/contact'"
        class="text-gray-500"
        exact
        active-class=" no-underline"
      >
        <div class="px-6 py-6 " @click="close">
          <span class="text-2xl sm:text-3xl hamburgerLink ">Contact us</span>
        </div>
      </router-link>

      <div class="fixed bottom-0 w-full p-6">
        <div
          class=" p-2 mx-auto flex items-center w-8 justify-center "
          @click="close"
        >
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store/index";
@Component({
  name: "AuthHamburger_Menu",
})
export default class AuthHamburgerMenu extends Vue {
  private get dropAuthMenu(): boolean {
    return store.state.dropAuthMenu;
  }

  private close() {
    store.commit("setDropAuthMenu", false);
  }
}
</script>

<style scoped>
.active {
  /* @apply bg-gray-100; */
  @apply text-gray-900;
}
</style>

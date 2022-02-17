<template>
  <div class="spartan flex w-full  border-b border-gray-200">
    <!-- ------------------------- -->
    <div class="h-16 flex flex-col justify-between ">
      <div class="h-2"></div>
      <div class="fw-600 fs-14 text-gray-400 px-6">
        <router-link
          :class="
            currentPage === 'User Authorities'
              ? 'nav-link-color'
              : 'text-gray-400'
          "
          :to="`/back-office/users/authorities/${username}`"
          >Authorities</router-link
        >
      </div>
      <div
        class="h-1 bg-gray-200 w-full"
        :class="{
          'nav-link-bg': currentPage === 'User Authorities',
        }"
      ></div>
    </div>
    <!-- ------------------------- -->
    <div class="h-16  flex flex-col justify-between ">
      <div class="h-2"></div>
      <div class="fw-600 fs-14 text-gray-400 px-6">
        <router-link
          :class="
            currentPage === 'User Settlement'
              ? 'nav-link-color'
              : 'text-gray-400'
          "
          :to="`/back-office/users/settlement/${username}`"
          >Settlement</router-link
        >
      </div>
      <div
        class="h-1 bg-gray-200 w-full"
        :class="{ 'nav-link-bg': currentPage === 'User Settlement' }"
      ></div>
    </div>
    <!-- ------------------------- -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "UserProfileNav",
  props: {
    username: String,
  },
})
export default class UserProfileNav extends Vue {
  //   private username = this.$route.params.username;
  private get currentPage() {
    return this.$route.name;
  }
}
</script>

<style scoped></style>

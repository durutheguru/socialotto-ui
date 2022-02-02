<template>
  <div
    class="spartan relative right-0 col-span-5 pt-20 px-10 h-screen overflow-y-auto bg-blue-50"
  >
    <h1
      class="flex justify-center sm:justify-start spartan text-3xl font-semibold text-black mb-6 w-9/12"
    >
      User Profile
    </h1>
    <div class="flex flex-col items-center justify-center w-9/12">
      <img
        class="inline-block h-24 w-24 rounded-full"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixusername=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />

      <div
        class="mb-6 flex mt-4 flex-col items-center text-black justify-center"
      >
        <h1 class="fw-600  fs-24">User Name - Platform User</h1>
        <span class="fw-400 fs-16">email@gmail.com</span>
      </div>

      <div class="flex flex-col w-full">
        <UserProfileNav :username="username" />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserProfileNav from "./UserProfileNav.vue";

@Component({
  name: "UserDetails",
  components: {
    UserProfileNav,
  },
})
export default class UserDetails extends Vue {
  private username = this.$route.params.username;
}
</script>

<style scoped></style>

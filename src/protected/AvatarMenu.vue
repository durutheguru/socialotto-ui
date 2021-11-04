<template>
  <div
    class="absolute right-0 top-0 object-right-top  mt-10 w-44 max-w-xs sm:px-0 "
  >
    <!-- <div class="arrow-up"></div> -->
    <div class="rounded-lg dropDownMenu">
      <div class="rounded-lg shadow-xs overflow-hidden">
        <div class="z-20 relative grid gap-0 sm:gap-0 ">
          <a
            href="#"
            class=" p-3 block space-y-1 hover:bg-gray-50 transition ease-in-out duration-150"
          >
            <p
              class=" mb-0 spartan text-base leading-6 font-medium text-gray-900"
            >
              My Profile
            </p>
          </a>
          <a
            href="#"
            class=" p-3 block space-y-1 hover:bg-gray-50 transition ease-in-out duration-150"
          >
            <p
              class=" mb-0 spartan text-base leading-6 font-medium text-gray-900"
            >
              About Socialotto
            </p>
          </a>
          <a
            href="#"
            class=" p-3 block space-y-1 hover:bg-gray-50 transition ease-in-out duration-150"
          >
            <p
              class=" mb-0 spartan text-base leading-6 font-medium text-gray-900"
            >
              Contact us
            </p>
          </a>
          <a
            href="#"
            class=" p-3 block space-y-1 hover:bg-gray-50 transition ease-in-out duration-150"
          >
            <p
              class=" mb-0 spartan text-base leading-6 font-medium text-gray-900"
            >
              Logout
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AvatarMenu",
})
export default class AvatarMenu extends Vue {}
</script>

<style scoped></style>

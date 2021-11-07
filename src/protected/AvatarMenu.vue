<template>
  <div
    id="avatarMenu"
    ref="avatarMenu"
    class="absolute right-0 top-0 object-right-top  mt-10 w-44 max-w-xs sm:px-0 "
  >
    <div class="pointy ml-auto"></div>

    <div class=" dropDownMenu">
      <div class="overflow-hidden pt-2">
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
import { Log, Util } from "@/components/util";
import store from "../store/index";

@Component({
  name: "AvatarMenu",
  props: {
    //   ref: ref
  },
})
export default class AvatarMenu extends Vue {
  $refs!: {
    avatarMenu: HTMLFormElement;
  };
  private avatarMenu: any = document.getElementById("avatarMenu");

  private mounted() {
    // Log.info(String(...this.$refs));
    //     this.element.addEventListener("click", function() {
    //       Log.info("click");
    //     });
    // window.addEventListener("mouseup", (e) => {
    //     if (e.target.id  != this.avatarMenu) {
    //   store.commit("setDropAuthMenu", false);
    //     }
    // });
  }
}
</script>

<style scoped></style>

<template>
  <!-- <div v-if="isModalOpen">
    <h1>Donate Modal</h1>
  </div> -->

  <transition name="fadeIn">
    <div v-if="open" class="fixed z-50 inset-0 overflow-hidden modal-blur">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div
            @click="close"
            class="absolute inset-0 bg-gray-800 bg-opacity-75 modal-blur"
          ></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
        >&#8203;
        <section
          class="main spartan  inline-block py-8 px-4 bg-white align-bottom rounded-lg shadow-xs text-left overflow-hidden transform transition-all max-w-lg mx-auto sm:my-8 sm:align-middle sm:w-full"
        >
          <div class="w-full h-full flex justify-between items-center mb-10">
            <span class="fw-600 fs-20 " style="color: #4691A6"
              >Remove Authorities</span
            >
            <div @click="close" class="cursor-pointer">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.9998 29.3337C23.3636 29.3337 29.3332 23.3641 29.3332 16.0003C29.3332 8.63653 23.3636 2.66699 15.9998 2.66699C8.63604 2.66699 2.6665 8.63653 2.6665 16.0003C2.6665 23.3641 8.63604 29.3337 15.9998 29.3337Z"
                  stroke="#898989"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 12L12 20"
                  stroke="#898989"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 12L20 20"
                  stroke="#898989"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="w-full flex flex-col">
            <div class="w-full flex items-center justify-center mb-8 ">
              <span class="fs-20 fw-500 text-center"
                >Are you sure you want to remove this authority?</span
              >
            </div>
            <!-- ------------------ -->

            <!-- --------------------- -->

            <div class="grid grid-cols-2 gap-4">
              <div
                @click="close"
                style="color: #4691A6; border: 1px solid #4691A6;"
                class="flex w-full rounded-md py-2.5 cursor-pointer justify-center items-center"
              >
                No
              </div>
              <div
                @click="removeAuthority"
                style="background-color: #4691A6;"
                class="flex w-full rounded-md text-white cursor-pointer py-2.5 justify-center items-center"
              >
                Yes
              </div>
            </div>
            <!-- ------------------- -->
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Constants, Log, Util } from "@/components/util";
import UsersService from "@/services/users/usersService";
import FileUploader from "@/components/file-uploader/FileUploader";
// import {
//   Listbox,
//   ListboxButton,
//   ListboxLabel,
//   ListboxOption,
//   ListboxOptions,
// } from "@headlessui/vue";

@Component({
  name: "RemoveAuthoritiesModal",
  props: {
    open: Boolean,
  },
  components: {
    // Listbox,
    // ListboxButton,
    // ListboxLabel,
    // ListboxOption,
    // ListboxOptions,
  },
})
export default class RemoveAuthoritiesModal extends Vue {
  @Prop()
  private open!: boolean;

  private removeAuthority() {
    this.$emit("remove");
  }

  private close() {
    this.$emit("close");
  }
}
</script>

<style lang="scss" scoped>
.fadeIn-enter-active,
.fadeIn-leave-active {
  .main {
    transition: all 0.3s ease-in-out;
  }
}
.fadeIn-leave-to,
.fadeIn-enter-from {
  .main {
    transform: scale(0.8);
    opacity: 0;
  }
}

.flag-icon1 {
  color: #010101;
}

.flag-icon1:hover {
  color: #ff721f;
}
</style>

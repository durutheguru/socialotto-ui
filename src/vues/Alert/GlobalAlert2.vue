<template>
  <transition name="slideDown">
    <div
      v-if="message.show"
      class="main fixed z-50 top-5 right-0 mr-6 min-w-min-content flex sm:max-w-md m-auto over rounded-md p-3"
      :class="message.type === 'success' ? 'bg-green-100' : 'bg-red-50'"
      @click="close"
    >
      <div class="flex">
        <div class="flex-shrink-0 cursor-pointer">
          <!-- Heroicon name: x-circle -->
          <svg
            v-if="message.type !== 'success'"
            class="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-if="message.type === 'success'"
            class="h-5 w-5 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <div
            :class="
              message.type === 'success' ? 'text-green-700' : 'text-red-700'
            "
            class="text-sm leading-5"
          >
            {{ message.text }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../../store/index";
import { Util } from "../../components/util";
@Component({
  name: "Global_Alert2",
})
export default class GlobalAlert2 extends Vue {
  private get message(): any {
    return store.state.globalAlert2;
  }

  private close() {
    // Util.handleGlobalAlert2(false, "", "");
  }
}
</script>

<style scoped></style>

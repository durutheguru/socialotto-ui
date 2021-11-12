<template>
  <div class="">
    <div class="flex spartan font-medium text-sm mb-12 w-full ">
      <a class="mr-10 underline" @click="view = 'info'">Info</a>
      <span class="mr-10" @click="view = 'Campaign Status'"
        >Campaign Status</span
      >
      <span class="mr-10" @click="view = 'Updates'">Updates</span>
    </div>

    <div>
      <!-- --------info---------- -->
      <div v-if="view === 'info'" class="spartan text-black ">
        <h3 class="spartan font-normal text-xl mb-8 text-black">
          About the Campaign
        </h3>
        <div class="font-normal text-base">
          <p class="mb-10">
            Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt
            qui esse pariatur duis deserunt mollit dolore cillum minim tempor
            enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut
            voluptate aute id deserunt nisi.
          </p>

          <p>
            Elit aute irure tempor cupidatat incididunt sint deserunt ut
            voluptate aute id deserunt nisi. Aliqua id fugiat nostrud irure ex
            duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt
            mollit dolore cillum minim tempor enim.
          </p>
        </div>
      </div>

      <!-- --------Campaign Status---------- -->
      <div v-if="view === 'Campaign Status'" class="spartan text-black">
        <h3 class="spartan font-normal text-xl mb-8 text-black">
          Active
        </h3>
      </div>

      <!-- --------Updates---------- -->
      <div v-if="view === 'Updates'" class="spartan relative">
        <ul
          class="list-disc text-dark space-y-4 relative"
          style="right: 0.313rem;"
        >
          <li class="ml-4 text-grey-light">
            <span class="text-black"
              >Aliqua id fugiat nostrud irure ex duis</span
            >
          </li>
          <li class="ml-4 text-grey-light">
            <span class="text-black"
              >Aliqua id fugiat nostrud irure ex duis</span
            >
          </li>
          <li class="ml-4 text-grey-light">
            <span class="text-black"
              >Aliqua id fugiat nostrud irure ex duis</span
            >
          </li>
          <li class="ml-4 text-grey-light">
            <span class="text-black"
              >Aliqua id fugiat nostrud irure ex duis</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "InfoStatusUpdates",
})
export default class InfoStatusUpdates extends Vue {
  private view: string = "info";
}
</script>

<style scoped></style>

<template>
  <div class="grid grid-cols-2 gap-x-4 gap-y-6">
    <div class="w-full  ">
      <label
        for="First Name"
        class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
        >First Name</label
      >
      <div class="mt-1">
        <div
          class="spartan cursor-pointer h-12 relative flex bg-transparent border-2 border-solid rounded-md"
        >
          <input
            v-model="model.firstName"
            type="text"
            name="Authority"
            id="Authority"
            class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
            placeholder=""
          />
        </div>
      </div>
    </div>

    <div class="w-full  ">
      <label
        for="Last Name"
        class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
        >Last Name</label
      >
      <div class="mt-1">
        <div
          class="spartan cursor-pointer h-12 relative flex bg-transparent border-2 border-solid rounded-md"
        >
          <input
            v-model="model.lastName"
            type="text"
            name="Authority"
            id="Authority"
            class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
            placeholder=""
          />
        </div>
      </div>
    </div>

    <!-- --------÷ -->
    <div class="w-full  ">
      <label
        for="Phone"
        class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
        >Phone</label
      >
      <div class="mt-1">
        <div
          class="spartan cursor-pointer h-12 relative flex bg-transparent border-2 border-solid rounded-md"
        >
          <input
            v-model="model.phone"
            type="text"
            name="Authority"
            id="Authority"
            class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
            placeholder=""
          />
        </div>
      </div>
    </div>

    <div class="w-full  ">
      <label
        for="Last Name"
        class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
        >Email</label
      >
      <div class="mt-1">
        <div
          class="spartan cursor-pointer h-12 relative flex bg-transparent border-2 border-solid rounded-md"
        >
          <input
            v-model="model.email"
            type="text"
            name="Authority"
            id="Authority"
            class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
            placeholder=""
          />
        </div>
      </div>
    </div>

    <div class="w-full  col-span-2">
      <label
        for="National ID Number"
        class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
        >National ID Number</label
      >
      <div class="mt-1">
        <div
          class="spartan cursor-pointer h-12 relative flex bg-transparent border-2 border-solid rounded-md"
        >
          <input
            v-model="model.nationalIdNumber"
            type="text"
            name="Authority"
            id="Authority"
            class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
            placeholder=""
          />
        </div>
      </div>
    </div>

    <InputUpload
      @uploaded="setModel"
      documentName="National ID Photo"
      :field="contact"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputUpload from "./InputUpload.vue";
@Component({
  components: {
    InputUpload,
  },
  props: {
    model: Object,
    contact: String,
  },
})
export default class NGOContactsForm extends Vue {
  private setModel(upload: any) {
    const obj = {
      contact: this.$props.contact,
      field: upload.field,
      fileRef: upload.fileRef,
    };
    this.$emit("uploaded", obj);
  }
}
</script>

<style scoped></style>

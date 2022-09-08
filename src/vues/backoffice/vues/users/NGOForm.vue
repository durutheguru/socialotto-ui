<template>
  <div class="w-full flex flex-col gap-6">
    <div class="w-full  mt-6">
      <label
        for="Add A Permission"
        class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
        >Add a permission</label
      >
      <!-- <span>UN: {{ username }}</span> -->
      <div class="mt-1">
        <div
          class="spartan cursor-pointer h-12 relative flex bg-transparent border-2 border-solid rounded-md"
        >
          <!-- <input
            readonly
            type="text"
            name="Authority"
            id="Authority"
            class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
            placeholder=""
          /> -->

          <div
            @click="$emit('mainForm')"
            class="ml-2 bg-gray-300 inset-y-0 my-auto  gap-3 whitespace-nowrap flex items-center max-w-max px-2 h-7 br-8 absolute left-0"
          >
            <span class="fw-400 fs-12">Enable as NGO </span>

            <div>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 0.5L7.5 7.5M0.5 7.5L7.5 0.5L0.5 7.5Z"
                  stroke="#242424"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div
            class="inset-y-0 my-auto mr-3 absolute right-0 flex items-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------ -->
    <div class="w-full  ">
      <label
        for="Website"
        class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
        >Website</label
      >
      <div class="mt-1">
        <div
          class="spartan cursor-pointer h-12 relative flex bg-transparent border-2 border-solid rounded-md"
        >
          <input
            v-model="ngoDetails.website"
            type="text"
            name="Authority"
            id="Authority"
            class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
            placeholder=""
          />
        </div>
      </div>
    </div>

    <div class="fs-15 fw-700 ">Primary Contact</div>
    <NGOContactsForm
      :model="primaryContact"
      contact="primaryContact"
      @uploaded="setContactIdRef"
    />

    <div class="fs-15 fw-700 ">Secondary Contact</div>
    <NGOContactsForm
      :model="secondaryContact"
      contact="secondaryContact"
      @uploaded="setContactIdRef"
    />

    <div class="h-px w-full bg-gray-300 my-4"></div>
    <!-- --------------------- -->

    <InputUpload
      documentName="CAC Document"
      field="cacDocument"
      inputId="cacDocument"
      @uploaded="setModel"
    />
    <InputUpload
      documentName="Agreement Contract"
      field="ngoAgreementContract"
      inputId="ngoAgreementContract"
      @uploaded="setModel"
    />

    <InputUpload
      documentName="Referee CAC Document"
      field="ngoRefererCacDocument"
      inputId="ngoRefererCacDocument"
      @uploaded="setModel"
    />

    <InputUpload
      documentName="Reference Upload"
      field="ngoReferenceUpload"
      inputId="ngoReferenceUpload"
      @uploaded="setModel"
    />

    <div class="grid grid-cols-2 gap-4">
      <div
        @click="close"
        style="color: #4691A6; border: 1px solid #4691A6;"
        class="flex w-full rounded-md py-2.5 cursor-pointer justify-center items-center"
      >
        Cancel
      </div>
      <button
        @click="enableAsNGO"
        style="background-color: #4691A6;"
        class="flex w-full rounded-md text-white cursor-pointer py-2.5 justify-center items-center"
      >
        Save
      </button>
    </div>
    <!-- ------------------- -->
  </div>
</template>

<script lang="ts">
import { enableNGO } from "@/services/users/users.mutation";
// import store from "@/store/index";

import NGOContactsForm from "./NGOContactsForm.vue";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Constants, Log, Util } from "@/components/util";
import InputUpload from "./InputUpload.vue";
@Component({
  components: {
    InputUpload,
    NGOContactsForm,
  },
})
export default class extends Vue {
  @Prop()
  private username!: string;
  private loading = false;
  private authority = "Enable as NGO";

  private ngoDetails = {
    username: this.username,
    website: "",
    ngoReferenceUpload: "",
    ngoRefererCacDocument: "",
    cacDocument: "",
    ngoAgreementContract: "",
  };

  private primaryContact = {
    modelName: "primaryContact",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    nationalIdNumber: "",
    nationalIdPhoto: "",
  };

  private secondaryContact = {
    modelName: "secondaryContact",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    nationalIdNumber: "",
    nationalIdPhoto: "",
  };

  private close() {
    this.$emit("close");
  }

  private setContactIdRef(docDetails: any) {
    if (docDetails.contact === "primaryContact") {
      this.primaryContact.nationalIdPhoto = docDetails.fileRef;
    } else if (docDetails.contact === "secondaryContact") {
      this.secondaryContact.nationalIdPhoto = docDetails.fileRef;
    }
  }

  private setModel(upload: any) {
    let { field, fileRef }: { field: string; fileRef: string } = upload;

    if (field === "cacDocument") {
      this.ngoDetails.cacDocument = fileRef;
    } else if (field === "ngoReferenceUpload") {
      this.ngoDetails.ngoReferenceUpload = fileRef;
    } else if (field === "ngoRefererCacDocument") {
      this.ngoDetails.ngoRefererCacDocument = fileRef;
    } else if (field === "ngoAgreementContract") {
      this.ngoDetails.ngoAgreementContract = fileRef;
    }

    Log.info("ngoDetails" + this.ngoDetails);
  }

  private prepareDetails() {
    delete this.primaryContact.modelName;
    delete this.secondaryContact.modelName;

    const info = {
      ngoDetails: {
        username: this.ngoDetails.username,
        website: this.ngoDetails.website,
        primaryContact: this.primaryContact,
        secondaryContact: this.secondaryContact,
        ngoReferenceUpload: this.ngoDetails.ngoReferenceUpload,
        ngoRefererCacDocument: this.ngoDetails.ngoRefererCacDocument,
        cacDocument: this.ngoDetails.cacDocument,
        ngoAgreementContract: this.ngoDetails.ngoAgreementContract,
      },
    };

    return info;
  }

  private enableAsNGO() {
    this.loading = true;
    Log.info("detail: " + JSON.stringify(this.prepareDetails()));

    this.$apollo
      .mutate({
        mutation: enableNGO,
        variables: this.prepareDetails(),
      })
      .then((data: any) => {
        this.loading = false;
        this.close();

        Log.info("data: " + String(data));
        Util.handleGlobalAlert(true, "success", "Successfully enabled NGO");
        // this.$router.push(`/back-office/lotteries`);
      })
      .catch((error) => {
        this.loading = false;
        // this.close();
        Log.error(error);

        Util.handleGlobalAlert(true, "failed", Util.extractGqlError(error));
      });
  }

  @Watch("primaryContact", { deep: true })
  private monitor(newValue: any, oldValue: any) {
    Log.info(
      `primaryContact: ${newValue.nationalIdPhoto} to ${oldValue.nationalIdPhoto}`
    );
  }
}
</script>

<style scoped></style>

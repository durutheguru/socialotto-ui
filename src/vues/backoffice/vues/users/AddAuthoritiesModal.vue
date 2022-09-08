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
          class="main spartan   inline-block py-8  bg-white align-bottom rounded-lg shadow-xs text-left transform transition-all max-w-lg mx-auto sm:my-8 sm:align-middle sm:w-full"
        >
          <div
            style="max-height: 500px;"
            class=" px-4 h-full w-full overflow-y-auto"
          >
            <div class="w-full h-full flex justify-between items-center mb-16">
              <span class="fw-600 fs-20 " style="color: #4691A6"
                >Add Authorities</span
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

            <div v-if="showNGOForm === true" class="w-full">
              <NGOForm
                :username="username"
                @close="close"
                @mainForm="showMainForm"
              />
            </div>
            <div
              v-else-if="showNGOForm === false"
              class="w-full flex flex-col gap-6"
            >
              <div class="w-full  mt-6">
                <label
                  for="Add Permission"
                  class="spartan font-medium text-dark block text-sm  text-gray-700"
                  >Add a permission</label
                >
                <div class="mt-1">
                  <div
                    @click="toggle"
                    class="spartan cursor-pointer h-12 relative flex bg-transparent border-2 border-solid rounded-md"
                  >
                    <input
                      readonly
                      v-model="authority.name"
                      type="text"
                      name="Authority"
                      id="Authority"
                      class="h-full px-2 bg-transparent focus:ring-indigo-500  focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
                      placeholder="select authority"
                    />

                    <div class="inset-y-0 my-auto mr-3">
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
                  <div class="relative bg-white z-20" v-if="openMenu">
                    <ul
                      class="py-2 absolute w-full rounded-md shadow-md bg-white spartan text-sm"
                    >
                      <li
                        class="cursor-pointer hover:bg-gray-50 py-1.5 px-2"
                        @mousedown="selectAuthority(authority)"
                        v-for="(authority, index) in authorities"
                        :key="index"
                      >
                        {{ authority.name }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- ------------------ -->

              <!-- --------------------- -->
              <div class="w-full mb-6 ">
                <label
                  for="Upload Supporting Documents"
                  class="spartan font-medium text-dark block text-sm  text-gray-700"
                  >Upload Supporting Documents</label
                >
                <div class="mt-1">
                  <div
                    class="spartan h-12 flex bg-transparent border-2 border-solid rounded-md"
                  >
                    <input
                      readonly
                      type="text"
                      name="Authority file uploads"
                      id="Authority file uploads"
                      class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
                      placeholder="select files"
                    />
                    <div
                      @click="chooseFiles"
                      class="cursor-pointer bg-dark-blue rounded-md flex items-center justify-center text-white w-40 h-9 my-auto mr-0.5"
                    >
                      <span class="spartan text-sm">Upload</span>

                      <input
                        required
                        autocomplete="off"
                        multiple
                        type="file"
                        id="supportDocuments"
                        name="supportDocuments"
                        accept="image/png, image/jpeg, .pdf, .doc"
                        placeholder="upload file"
                        class="hidden"
                        v-on:change="fileChanged"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="fileUploader.uploads.length > 0">
                  <table
                    role="presentation"
                    class="table v-margin-medium table-striped"
                  >
                    <tbody class="files">
                      <tr
                        v-for="fileUpload in fileUploader.uploads"
                        :key="fileUpload.getFile().name"
                      >
                        <td class="col--6 ">
                          <p class="mb-0">{{ fileUpload.getFile().name }}</p>
                        </td>
                        <td class="col--3">
                          <br />
                          <div
                            v-if="fileUpload.getResource().loading"
                            class="progress progress-striped active"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            aria-valuenow="0"
                          >
                            <div
                              class="progress-bar progress-bar-success"
                              role="progressbar"
                              aria-valuenow="45"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width:100%"
                            ></div>
                          </div>
                        </td>
                        <td class="col--3">
                          <button
                            data-toggle="button"
                            class="pull-right btn btn-danger"
                            @click="
                              fileUploader.removeFile(fileUpload.getFile())
                            "
                          >
                            <i class="fa fa-trash slight-bigger-text"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div
                  @click="close"
                  style="color: #4691A6; border: 1px solid #4691A6;"
                  class="flex w-full rounded-md py-2.5 cursor-pointer justify-center items-center"
                >
                  Cancel
                </div>
                <button
                  :disabled="
                    fileUploader.uploads.length === 0 || authority.value === ''
                  "
                  :class="[
                    fileUploader.uploads.length === 0 || authority.value === ''
                      ? 'opacity-25'
                      : 'opacity-100',
                  ]"
                  @click="saveAuthority"
                  style="background-color: #4691A6;"
                  class="flex w-full rounded-md text-white cursor-pointer py-2.5 justify-center items-center"
                >
                  Save
                </button>
              </div>
              <!-- ------------------- -->
            </div>
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import NGOForm from "./NGOForm.vue";
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
  name: "AddAuthoritiesModal",
  props: {
    open: Boolean,
    username: String,
  },
  components: {
    // Listbox,
    // ListboxButton,
    // ListboxLabel,
    // ListboxOption,
    // ListboxOptions,
    NGOForm,
  },
})
export default class AddAuthoritiesModal extends Vue {
  @Prop()
  private username!: string;
  private open!: boolean;

  private fileUploader: FileUploader = new FileUploader(
    "/upload",
    5,
    Constants.defaultFileUploadExtensions,
    Constants.defaultMaxFileUploadSize
  );

  private openMenu = false;
  private showNGOForm = false;

  private showMainForm() {
    this.showNGOForm = false;
  }

  private toggle() {
    this.openMenu = !this.openMenu;
  }

  private authority = {
    name: "",
    value: "",
  };

  private authorities = [
    {
      name: "can create lottery",
      value: "CAN_CREATE_LOTTERY",
    },
    {
      name: "can create campaign",
      value: "CAN_CREATE_CAMPAIGN",
    },
    {
      name: "can sponsor lottery",
      value: "CAN_SPONSOR_LOTTERY",
    },

    {
      name: "enable as NGO",
      value: "ENABLE_AS_NGO",
    },
  ];

  public fileChanged(event: any) {
    this.fileUploader.fileChange(event);
    // this.$forceUpdate();
  }

  private chooseFiles() {
    const showFilesToSelect: any = document.getElementById("supportDocuments");
    showFilesToSelect.click();
  }

  private selectAuthority(auth: any) {
    if (auth.value === "ENABLE_AS_NGO") {
      this.showNGOForm = true;

      return;
    }
    this.authority = auth;
    this.openMenu = false;

    Log.info(this.authority.value);
  }

  private prepareDetails() {
    const obj = {
      username: this.username,
      authority: this.authority.value,
      fileReferences: this.fileUploader.uploads.map((val) =>
        val.getReference()
      ),
    };

    Log.info("obj" + JSON.stringify(obj));
    return obj;
  }

  private saveAuthority() {
    Log.info("authority" + JSON.stringify(this.authority));
    Log.info(
      "filerefs" +
        JSON.stringify(
          this.fileUploader.uploads.map((val) => val.getReference())
        )
    );

    UsersService.addAuthority(
      this.prepareDetails(),
      (response: any) => {
        Log.info(response);
        this.$emit("authAdded");
        this.close();
        // this.$emit("removeAuthority");
      },
      (error: any) => {
        Log.error(error);
      }
    );
  }

  private close() {
    if (this.fileUploader.uploads.length) {
      this.fileUploader = new FileUploader(
        "/upload",
        5,
        Constants.defaultFileUploadExtensions,
        Constants.defaultMaxFileUploadSize
      );
    }
    this.$emit("close");
    this.showNGOForm = false;
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

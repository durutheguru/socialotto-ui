<template>
  <div class="w-full col-span-2">
    <label
      for=""
      class="spartan font-medium text-dark block text-sm  text-gray-700"
      >{{ $props.documentName }}</label
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
      <table role="presentation" class="table v-margin-medium table-striped">
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
                @click="fileUploader.removeFile(fileUpload.getFile())"
              >
                <i class="fa fa-trash slight-bigger-text"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FileUploader from "@/components/file-uploader/FileUploader";
import { Constants, Log, Util } from "@/components/util";

@Component({
  props: {
    documentName: String,
  },
})
export default class extends Vue {
  private fileUploader: FileUploader = new FileUploader(
    "/upload",
    5,
    Constants.defaultFileUploadExtensions,
    Constants.defaultMaxFileUploadSize
  );

  public fileChanged(event: any) {
    this.fileUploader.fileChange(event);
    // this.$forceUpdate();
  }

  private chooseFiles() {
    const showFilesToSelect: any = document.getElementById("supportDocuments");
    showFilesToSelect.click();
  }
}
</script>

private fileUploader: FileUploader = new FileUploader(

<style scoped></style>

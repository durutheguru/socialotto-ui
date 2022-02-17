<template>
  <div class="spartan w-full py-10">
    <span style="color: #1D414B;" class="fw-700 fs-14 ">
      Permissions
    </span>
    <div class="grid grid-cols-8 gap-4 mt-2">
      <div class="col-span-2 flex items-center justify-start py-3 ">
        <span style="color: #454545" class="fs-14 fw-500"
          >This user is authorised to
        </span>
      </div>
      <div
        v-for="(authority, index) in authorities"
        :key="index"
        @click="openRemovalModal(authority.authorityId, username)"
        style="background-color: #EBEBEB; border-radius: 8px"
        class="cursor-pointer col-span-3 flex justify-center items-center"
      >
        <div class=" flex items-center justify-between px-4 w-full ">
          <span style="color: #696969">{{ authority.authorityId }}</span>
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z"
                stroke="#696969"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 10L10 14"
                stroke="#696969"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 10L14 14"
                stroke="#696969"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-4 mt-4 mb-6">
      <div
        @click="openModal"
        style="background-color: #FFFFFF; border: 1px solid #4691A6; border-radius: 8px;"
        class="cursor-pointer col-span-1 p-3"
      >
        <span style="color: #4691A6" class="">Add new permissions</span>
      </div>
    </div>

    <!-- --------------- -->
    <div v-if="refResponse.length > 0" class="flex flex-col">
      <span style="color: #1D414B;" class="fw-700 fs-14 ">
        Documents
      </span>
      <div class="grid grid-cols-4 gap-4 mt-2">
        <div
          v-for="file in refResponse"
          :key="file.reference"
          style="background-color: #EBEBEB; border-radius: 8px"
          class="col-span-1 flex items-center justify-between px-3 py-3"
        >
          <span style="color: #696969">{{ file.originalFileName }}</span>
          <div class="ml-2">
            <a :href="`${file.publicUrl}`" target="_blank">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26 9.17647H18.5714V0H7.42857V9.17647H0L13 19.8824L26 9.17647ZM0 22.9412V26H26V22.9412H0Z"
                  fill="#4691A6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- -------------- -->
    <add-authoritiesmodal
      @close="closeModal"
      @authAdded="authAdded"
      :username="username"
      :open="open"
    />
    <remove-authorities-modal
      @remove="removeAuthority"
      :open="openRemoval"
      @close="closeRemovalModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UsersService from "@/services/users/usersService";
import { Log, Util } from "@/components/util";
import AddAuthoritiesmodal from "./AddAuthoritiesModal.vue";
import RemoveAuthoritiesModal from "./RemoveAuthoritiesModal.vue";
@Component({
  name: "UserAuthorities",
  props: {
    authorities: Array,
    username: String,
    refResponse: Array,
  },
  components: {
    AddAuthoritiesmodal,
    RemoveAuthoritiesModal,
  },
})
export default class UserAuthorities extends Vue {
  // private userDetails = this.$route.params.userDetails.split(":");
  // private username = window.atob(this.userDetails[0]);
  // private userType = window.atob(this.userDetails[1]);
  private details = {
    username: "",
    authority: "",
  };

  // private

  private open = false;

  private openModal() {
    this.open = true;
  }

  private closeModal() {
    this.open = false;
  }

  private openRemoval = false;

  private openRemovalModal(authId: string, userName: string) {
    this.details = {
      username: userName,
      authority: authId,
    };
    this.openRemoval = true;
  }

  private closeRemovalModal() {
    this.openRemoval = false;
  }

  private authAdded() {
    this.$emit("authAdded");
  }

  private removeAuthority() {
    UsersService.removeAuthority(
      this.details,
      (response: any) => {
        Log.info(response);
        this.$emit("removeAuthority");
      },
      (error: any) => {
        Log.error(error);
      }
    );
  }
}
</script>

<style scoped></style>

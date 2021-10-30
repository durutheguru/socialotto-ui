<template>
  <div>
    <div class="px-6 mb-16 md:mb-0">
      <div class="max-w-sm sm:max-w-md md:w-full mx-auto">
        <div class="mb-10">
          <h1
            class="flex justify-center sm:justify-start spartan text-3xl font-semibold dark-blue-text mb-0"
          >
            Create your campaign
          </h1>
        </div>
        <!-- -----------InstructionsHamburger---------- -->
        <CampaignInstructionsMenu class="lg:hidden" />
        <div>
          <div class=" mb-2">
            <div class=" sm:flex">
              <div class="mb-8 sm:mr-8 md:mb-0 ">
                <span
                  class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-dark-blue"
                >
                  <span class="text-lg font-medium leading-none text-white"
                    >1</span
                  >
                </span>
              </div>
              <div class="w-full md:w-9/12 lg:w-4/5">
                <div class="w-full mb-6">
                  <label
                    for="email"
                    class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                    >Campaign title</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="campaign_title"
                      id="campaign_title"
                      class="spartan h-12 bg-transparent  border-gray-300 border-2 border-opacity-25  px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
                      placeholder="Help a father of 3 with money for his kidney surgery in India"
                    />
                  </div>
                </div>

                <div class="w-full mb-6">
                  <label
                    for="campaign_details"
                    class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                    >Campaign details</label
                  >
                  <div class="mt-1 rounded-md ">
                    <div>
                      <textarea
                        autocomplete="off"
                        id="campaign_details"
                        required
                        rows="6"
                        class="max-h-44 spartan bg-transparent border border-solid rounded-md px-2 pt-2 pb-8 form-textarea mt-1 border bg-cool-gray-50 border-gray-200 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        placeholder="Bank details for X..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div class="w-full mb-6">
                  <label
                    for="email"
                    class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                    >Upload campaign document</label
                  >
                  <div class="mt-1">
                    <div
                      class="spartan h-12 flex bg-transparent border border-solid rounded-md"
                    >
                      <input
                        type="text"
                        name="campaign_title"
                        id="campaign_title"
                        class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
                        placeholder="confirm password"
                      />
                      <div
                        class="bg-dark-blue rounded-md flex items-center justify-center text-white w-28 h-10 my-auto mr-0.5"
                      >
                        <span class="spartan">Upload</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------- -->
          <div>
            <div class="sm:flex">
              <div class="mb-8 sm:mr-8 md:mb-0 ">
                <span
                  class="inline-flex items-center justify-center h-12 w-12 rounded-full bg-dark-blue"
                >
                  <span class="text-lg font-medium leading-none text-white"
                    >2</span
                  >
                </span>
              </div>
              <div class="w-full md:w-9/12 lg:w-4/5">
                <div class="w-full mb-6">
                  <label
                    for="email"
                    class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                    >Total amount</label
                  >
                  <div class="mt-1">
                    <input
                      type="text"
                      name="campaign_title"
                      id="campaign_title"
                      class="spartan h-12 bg-transparent  border-gray-300 border-2 border-opacity-25  px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
                      placeholder="N10000"
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between w-full mb-8">
                  <div class="flex items-end">
                    <input
                      id="terms"
                      name="terms"
                      value="true"
                      type="checkbox"
                      class="checkbox"
                    />
                    <label
                      for="agree"
                      style="font-family: 'Spartan', sans-serif;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 14px;
                        line-height: 100%;
                        text-align: center;
                        color: #797979;"
                      class="ml-2 mb-0 block"
                    >
                      I agree to the
                      <span class="light-blue-text font-semibold spartan"
                        >Conditions of campaign creation and Socialotto</span
                      >
                    </label>
                  </div>

                  <!-- <div class="text-sm">
                    <a
                        href="#"
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Forgot your password?
                    </a>
                    </div> -->
                </div>

                <div class="w-full mb-6">
                  <div class="mt-1">
                    <div>
                      <div
                        class="bg-blue-200 spartan w-full flex justify-center items-center h-12 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Create campaign
                        <!-- <i
                        class="ml-px fa fa-spinner fa-spin"
                        v-if="userLogin.loading"
                    ></i> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- -------------------------- -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CampaignInstructionsMenu from "@/components/page-features/CampaignInstructionsMenu.vue";

@Component({
  name: "CampaignInputs",
  components: {
    CampaignInstructionsMenu,
  },
})
export default class CampaignInputs extends Vue {}
</script>

<style scoped></style>

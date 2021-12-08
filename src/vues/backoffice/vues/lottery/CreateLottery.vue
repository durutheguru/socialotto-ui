<template>
  <div class="col-span-5 pt-20 px-10 h-screen overflow-y-auto">
    <h1
      class="flex justify-center sm:justify-start spartan text-3xl font-semibold text-black mb-6"
    >
      Create your campaign
    </h1>
    <validation-observer
      ref="observer"
      id="createLottery_form"
      tag="form"
      role="form"
      v-slot="{ invalid }"
      @submit.prevent="createLottery"
      novalidate
    >
      <div class=" grid grid-cols-6 ">
        <div class="col-span-3">
          <div class="w-11/12">
            <div class="w-full">
              <div class="w-full mb-6">
                <label
                  for="Lottery_title"
                  class="spartan font-medium text-dark block text-sm text-gray-700"
                  >Lottery title</label
                >
                <div class="mt-1">
                  <validation-provider
                    mode="aggressive"
                    rules="required|min:5"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="lottery.name"
                      required
                      type="text"
                      name="lottery title"
                      id="campaign_title"
                      :class="{
                        'border-red-400': errors.length > 0,
                      }"
                      class="spartan h-12 bg-transparent  border-gray-300 border-2  px-2  focus:border-blue-500 block w-full sm:text-sm rounded-md"
                      placeholder="title"
                    />
                    <span class="text-red-500 spartan">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>

              <!-- -----------lottery description----------- -->
              <div class="w-full mb-6">
                <label
                  for="Lottery_description"
                  class="spartan font-medium text-dark block text-sm text-gray-700"
                  >Lottery description</label
                >
                <div class="mt-1">
                  <validation-provider
                    mode="aggressive"
                    rules="required|min:20|max:240"
                    v-slot="{ errors }"
                  >
                    <textarea
                      v-model="lottery.description"
                      autocomplete="off"
                      id="lottery description"
                      required
                      rows="6"
                      :class="{
                        'border-red-400': errors.length > 0,
                      }"
                      class="max-h-44 spartan bg-transparent rounded-md px-2 pt-2 pb-8 form-textarea mt-1 border-gray-300 border-2 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5  focus:border-blue-500"
                      placeholder="description"
                    ></textarea>
                    <span class="text-red-500 spartan">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>

              <!-- -------Lottery Owner------- -->
              <div class="w-full mb-6 ">
                <label
                  for="Lottery owner"
                  class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                  >Lottery owner</label
                >
                <div v-if="lottery.lotteryOwner.length === 0">
                  <div class="mt-1 relative">
                    <validation-provider rules="required" v-slot="{ errors }">
                      <input
                        v-model="lotteryOwner"
                        required
                        type="text"
                        name="Lottery owner"
                        id="lottery owner"
                        :class="{
                          'border-red-400': errors.length > 0,
                        }"
                        class="spartan h-12 bg-transparent border-gray-300 border-2  px-2 focus:ring-indigo-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                        placeholder="Search"
                      />

                      <span class="text-red-500 spartan">{{ errors[0] }}</span>
                    </validation-provider>
                  </div>
                  <div class="relative bg-white z-20" v-if="owners.length > 0">
                    <ul
                      class="py-2 absolute w-full rounded-md shadow-md bg-white spartan text-sm"
                    >
                      <li
                        class="cursor-pointer hover:bg-gray-50 py-1.5 px-2"
                        @click="selectOwner(owner.name)"
                        v-for="(owner, index) in owners"
                        :key="index"
                      >
                        {{ owner.name }}
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- -----v-if owner chosen------ -->
                <div class="mt-1 relative" v-else>
                  <input
                    readonly
                    class="spartan h-12 bg-transparent  border-gray-300 border-2  px-2 focus:ring-indigo-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                  />
                  <div
                    class="absolute left-0 top-0 h-full flex justify-center items-center"
                  >
                    <div
                      style="max-width: 11rem;"
                      class="h-4/6 flex justify-center items-center rounded-lg bg-gray-300 px-2 ml-3"
                    >
                      <span class="spartan text-sm truncate">{{
                        lottery.lotteryOwner
                      }}</span>

                      <div @click="cancelOwner">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-2 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- -------Supported Campaigns------ -->

              <div class="w-full mb-1">
                <label
                  for="Supported Campaigns"
                  class="spartan font-medium text-dark block text-sm text-gray-700"
                  >Supported Campaigns (max {{ maxCampaigns }})</label
                >
                <div class="mt-1 relative">
                  <validation-provider
                    mode="aggressive"
                    rules=""
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="supportedCampaign"
                      type="text"
                      name="supported campaign"
                      id="supported campaign"
                      :class="{
                        'border-red-400': errors.length > 0,
                      }"
                      class="spartan h-12 bg-transparent  border-gray-300 border-2  px-2  focus:border-blue-500 block w-full sm:text-sm rounded-md"
                      placeholder="campaign name"
                    />
                    <span class="text-red-500 spartan">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div
                  class="relative bg-white z-20"
                  v-if="searchCampaignsNamesQuery.campaignData.length > 0"
                >
                  <ul
                    class="py-2 absolute w-full rounded-md shadow-md bg-white spartan text-sm"
                  >
                    <li
                      class="cursor-pointer hover:bg-gray-50 py-1.5 px-2"
                      @click="selectCampaign(campaign)"
                      v-for="campaign in searchCampaignsNamesQuery.campaignData"
                      :key="campaign.id"
                    >
                      {{ campaign.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <!-- ----------------- -->
              <div
                v-if="chosenCampaigns.length > 0"
                class=" h-12 flex justify-start items-center"
              >
                <div
                  v-for="(chosenCampaign, index) in chosenCampaigns"
                  :key="chosenCampaign.id"
                  style="max-width: 11rem;"
                  class="h-4/6 flex justify-start items-center rounded-lg bg-gray-300 px-2 mr-3"
                >
                  <span class="spartan text-sm truncate">{{
                    chosenCampaign.name
                  }}</span>

                  <div @click="cancelSupportedCampaign(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <!-- ------------------- -->

              <div class="w-full mb-6 mt-6">
                <label
                  for="email"
                  class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                  >Lottery file uploads</label
                >
                <div class="mt-1">
                  <validation-provider rules="required" v-slot="{}">
                    <div
                      class="spartan h-12 flex bg-transparent border border-solid rounded-md"
                    >
                      <input
                        readonly
                        type="text"
                        name="Lottery file uploads"
                        id="Lottery file uploads"
                        class="h-full px-2 bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 "
                        placeholder="select files"
                      />
                      <div
                        @click="chooseFiles"
                        class="cursor-pointer bg-dark-blue rounded-md flex items-center justify-center text-white w-36 h-10 my-auto mr-0.5"
                      >
                        <span class="spartan text-sm">Upload</span>

                        <input
                          required
                          autocomplete="off"
                          multiple
                          type="file"
                          id="lottery_file"
                          name="lottery_file"
                          accept="image/png, image/jpeg, .pdf, .doc"
                          placeholder="upload file"
                          class="hidden"
                          v-on:change="fileChanged"
                        />
                      </div>
                    </div>
                  </validation-provider>
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
                        <td class="col--4">
                          <p>{{ fileUpload.getFile().name }}</p>
                        </td>
                        <td class="col--5">
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
            </div>
          </div>
        </div>

        <!-- --------------------------Second half of page inputs------------------------------ -->
        <div class="col-span-3">
          <div class="w-11/12">
            <!-- -----Cost per ticket---- -->
            <div class="w-full mb-6">
              <label
                for="Cost per ticket"
                class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                >Cost per ticket</label
              >
              <div class="mt-1">
                <validation-provider
                  rules="required|numeric"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="lottery.ticketCost"
                    required
                    min="200"
                    oninput="this.value = Math.abs(Math.round(this.value));"
                    type="number"
                    name="ticket cost"
                    id="ticket cost"
                    :class="{
                      'border-red-400': errors.length > 0,
                    }"
                    class="spartan h-12 bg-transparent  border-gray-300 border-2  px-2 focus:ring-indigo-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                    placeholder="N200"
                  />

                  <span class="text-red-500 spartan">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>

            <!-- ------Number of winners------ -->

            <div class="w-full mb-6">
              <label
                for="Number of winners"
                class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                >Number of winners</label
              >
              <div class="mt-1">
                <validation-provider
                  rules="required|numeric"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="lottery.numberOfWinners"
                    required
                    min="1"
                    oninput="this.value = Math.abs(Math.round(this.value));"
                    type="number"
                    name="Number of winners"
                    id="number of winners"
                    :class="{
                      'border-red-400': errors.length > 0,
                    }"
                    class="spartan h-12 bg-transparent  border-gray-300 border-2  px-2 focus:ring-indigo-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                    placeholder="25"
                  />

                  <span class="text-red-500 spartan">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>

            <!-- ---------- -->

            <!-- ------End date of registration------ -->

            <div class="w-full mb-6">
              <label
                for="Number of winners"
                class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                >End date of registration</label
              >
              <div class="mt-1">
                <validation-provider rules="required" v-slot="{ errors }">
                  <input
                    v-model="lottery.endDate"
                    required
                    type="date"
                    name="End date of registration"
                    id="end date of registration"
                    :class="{
                      'border-red-400': errors.length > 0,
                    }"
                    class="spartan h-12 bg-transparent  border-gray-300 border-2  px-2 focus:ring-indigo-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                    placeholder="13/01/2022"
                  />

                  <span class="text-red-500 spartan">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>

            <!-- ---------- -->

            <!-- ------Date and time of evaluation------ -->

            <div class="w-full mb-6 grid grid-cols-2 gap-4">
              <div class="col-span-1">
                <label
                  for="Date of evaluation"
                  class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                  >Date of evaluation</label
                >
                <div class="mt-1">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      v-model="lottery.evaluationDate"
                      required
                      type="date"
                      name="date of evaluation"
                      id="date of evaluation"
                      :class="{
                        'border-red-400': errors.length > 0,
                      }"
                      class="spartan h-12 bg-transparent  border-gray-300 border-2  px-2 focus:ring-indigo-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                      placeholder="13/01/2022"
                    />

                    <span class="text-red-500 spartan">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>

              <!-- --------time------- -->
              <div class="col-span-1">
                <label
                  for="Number of winners"
                  class="spartan font-medium text-dark block text-sm font-medium text-gray-700"
                  >Time of evaluation</label
                >
                <div class="mt-1">
                  <validation-provider rules="required" v-slot="{ errors }">
                    <input
                      v-model="lottery.evaluationTime"
                      required
                      type="time"
                      name=" time of evaluation"
                      id="time of evaluation"
                      :class="{
                        'border-red-400': errors.length > 0,
                      }"
                      class="spartan h-12 bg-transparent  border-gray-300 border-2  px-2 focus:ring-indigo-500 focus:border-blue-500 block w-full sm:text-sm rounded-md"
                    />

                    <span class="text-red-500 spartan">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
              <!-- ---------- -->
            </div>

            <!-- ---------- -->
            <button
              @click="createLottery"
              :disabled="invalid"
              :class="[invalid ? 'opacity-25' : 'opacity-100']"
              class="bg-blue-200 spartan w-full flex justify-center items-center h-12 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create lottery
              <!-- <i
              class="ml-px fa fa-spinner fa-spin"
              v-if="saveLottery.loading"
            ></i> -->
            </button>
          </div>
        </div>
        <!-- ------------------------------------ -->
      </div>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import ApiResource from "@/components/core/ApiResource";
import { Log, Constants, Util } from "@/components/util";
import FileUploader from "@/components/file-uploader/FileUploader";
import { searchCampaignNames } from "@/services/campaign/campaign.query";
import { ApolloError } from "apollo-client";
import LotteryService from "@/services/lottery/LotteryService";

// import LotteryService from "@/services/lottery/LotteryService";

@Component({
  name: "CreateLottery",
  apollo: {
    $client: "anonymousClient",
    searchCampaigns: {
      query: searchCampaignNames,

      variables() {
        return {
          searchKey: this.supportedCampaign,
          page: this.searchCampaignsNamesQuery.page,
          size: this.searchCampaignsNamesQuery.size,
        };
      },
      skip() {
        return !this.supportedCampaign;
      },

      result({ data }) {
        this.searchCampaignsNamesQuery.campaignData = data.searchCampaigns;
        Log.info(
          "searchCampaignsNamesQuery data : " +
            JSON.stringify(this.searchCampaignsNamesQuery.campaignData)
        );
      },

      error(error: ApolloError) {
        this.searchCampaignsNamesQuery.error = Util.extractGqlError(error);
        if (Util.isValidString(this.searchCampaignsNamesQuery.error)) {
          this.$apollo.queries.searchCampaignNames.refetch();
        }
      },
    },
  },
})
export default class CreateLottery extends Vue {
  // private mounted() {

  // }

  private searchCampaignsNamesQuery: any = {
    // key: "",
    campaignData: [],
    page: 0,
    size: 9,
    error: "",
  };
  private lotteryOwner: string = "";
  private supportedCampaign: string = "";
  private chosenCampaigns: any = [];
  private maxCampaigns = 3;
  private wallets: any = [];
  private owners: any = [];
  // private supportedCampaigns: any = [];
  private saveLottery: ApiResource = ApiResource.create();

  private lottery: any = {
    name: "",
    description: "",
    ticketCost: "",
    numberOfWinners: "",
    lotteryOwner: "",
    supportedCampaigns: this.chosenCampaigns,
    endDate: "",
    evaluationDate: "",
    evaluationTime: "",
  };

  private createLottery() {
    Log.info("lotteryDetails: " + JSON.stringify(this.lottery));
    const lotteryRequest = this.prepareLotteryRequest();
    Log.info("lotteryDetails: " + JSON.stringify(lotteryRequest));
    // LotteryService.createLottery()
  }

  private prepareLotteryRequest() {
    let request = {
      ownerUsername: this.lottery.lotteryOwner,
      lottery: {
        name: this.lottery.name,
        description: this.lottery.description,
        endDate: this.lottery.endDate,
        ticketCost: this.lottery.ticketCost,
        stageDescriptions: [
          {
            stage: "FIRST",
            winnersCount: this.lottery.numberOfWinners,
            evaluationTime: `${this.lottery.evaluationDate} ${this.lottery.evaluationTime}`,
          },
        ],
      },
      fileRefs: this.fileUploader.uploads.map((val) => val.getReference()),
      beneficiaries: this.wallets.map((wallet: any) => {
        const obj = {
          wallet: wallet,
        };
        return obj;
      }),
    };
    return request;
  }

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
    const showFilesToSelect: any = document.getElementById("lottery_file");
    showFilesToSelect.click();
  }

  private populateOwnersArray() {
    LotteryService.getLotteryOwner(
      this.lotteryOwner,
      (response: any) => {
        Log.info(response.data._embedded.platformUsers);
        this.owners = response.data._embedded.platformUsers;
      },
      (error: any) => {
        Log.error("Logged Error: " + JSON.stringify(error));
      }
    );
  }

  private selectOwner(owner: string) {
    const chosen = owner;
    this.lottery.lotteryOwner = chosen;

    Log.info(this.lottery.lotteryOwner);
  }

  private selectCampaign(campaign: any) {
    const chosen = campaign;

    const check =
      this.chosenCampaigns.length === 0 ||
      this.chosenCampaigns.some(
        (chosenCampaign: any) => chosenCampaign.id !== chosen.id
      )
        ? true
        : false;

    Log.info(`check: ${check}`);

    if (check === true) {
      if (this.chosenCampaigns.length < this.maxCampaigns) {
        this.chosenCampaigns.push(chosen);
        this.wallets.push(chosen.wallet);

        console.log("wallets:", this.wallets);

        this.supportedCampaign = "";
      } else {
        Util.handleGlobalAlert(true, "failed", "maximum number reached");
      }
    }

    this.supportedCampaign = "";
    //  this.searchCampaignsNamesQuery.campaignData = [];
  }

  private cancelOwner() {
    this.lotteryOwner = "";
    this.lottery.lotteryOwner = "";
  }

  private cancelSupportedCampaign(index: number) {
    this.chosenCampaigns.splice(index, 1);
    this.wallets.splice(index, 1);
  }

  private get getOwner() {
    return this.lotteryOwner;
  }

  @Watch("lotteryOwner")
  private ownersFilter(newValue: string, oldValue: string) {
    this.populateOwnersArray();
  }

  @Watch("supportedCampaign")
  private supportedCampaignFilter(newValue: string, oldValue: string) {
    this.searchCampaignsNamesQuery.campaignData = [];
  }
}
</script>

<style scoped></style>

<template>
  <div
    class="pb-56 spartan relative right-0 w-full pt-20 px-6 h-screen overflow-y-auto "
  >
    <h1
      class="
        flex
        justify-center
        sm:justify-start
        spartan
        text-3xl
        font-semibold
        text-black
        mb-6
      "
    >
      Create your lottery
    </h1>
    <validation-observer
      ref="vObserver"
      id="createLottery_form"
      tag="form"
      role="form"
      v-slot="{ invalid, reset }"
      @submit.prevent="createLottery"
      @reset.prevent="reset"
      novalidate
    >
      <div class="grid grid-cols-3 lg:grid-cols-6">
        <div class="col-span-3">
          <div class="w-full sm:w-11/12">
            <div class="w-full">
              <div class="w-full mb-6">
                <label
                  for="Lottery_title"
                  class="
                    spartan
                    font-medium
                    text-dark
                    block
                    text-sm text-gray-700
                  "
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
                      id="lottery_title"
                      :class="{
                        'border-red-400': errors.length > 0,
                      }"
                      class="
                        spartan
                        h-12
                        bg-transparent
                        border-gray-300 border-2
                        px-2
                        focus:border-blue-500
                        block
                        w-full
                        sm:text-sm
                        rounded-md
                      "
                      placeholder="title"
                      autocomplete="off"
                    />
                    <span class="text-red-500 spartan">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>

              <!-- -----------lottery description----------- -->
              <div class="w-full mb-6">
                <label
                  for="Lottery_description"
                  class="
                    spartan
                    font-medium
                    text-dark
                    block
                    text-sm text-gray-700
                  "
                  >Lottery description</label
                >
                <div class="mt-1">
                  <validation-provider
                    mode="aggressive"
                    rules="required|min:20|max:2000"
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
                      class="
                        max-h-44
                        spartan
                        bg-transparent
                        rounded-md
                        px-2
                        pt-2
                        pb-8
                        form-textarea
                        mt-1
                        border-gray-300 border-2
                        block
                        w-full
                        transition
                        duration-150
                        ease-in-out
                        sm:text-sm sm:leading-5
                        focus:border-blue-500
                      "
                      placeholder="description"
                    ></textarea>
                    <span class="text-red-500 spartan">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>

              <!-- -------Lottery Owner------- -->
              <div class="grid grid-cols-10 gap-4">
                <div class="col-span-4">
                  <span
                    for="Lottery Sponsors"
                    class="
                    spartan
                    font-medium
                    text-dark
                    block
                    text-sm
                    
                    text-gray-700
                  "
                    >Lottery Sponsors</span
                  >
                </div>
                <div class="col-span-4">
                  <span
                    for="Amount"
                    class="
                    spartan
                    font-medium
                    text-dark
                    block
                    text-sm
                   
                    text-gray-700
                  "
                    >Amount</span
                  >
                </div>
                <div
                  v-for="(input, index) in inputArray"
                  :key="index"
                  class="col-span-10 grid grid-cols-10 gap-4"
                >
                  <div class="col-span-4  ">
                    <div>
                      <div class="mt-1 relative">
                        <!-- <validation-provider rules="required" v-slot="{ errors }"> -->
                        <input
                          v-model="input.sponsor"
                          @click="input.showOwners = true"
                          @blur="input.showOwners = false"
                          v-on:input="populateOwnersArray(index)"
                          required
                          :disabled="input.name.length > 0"
                          type="text"
                          name="Lottery owner"
                          id="lottery owner"
                          class="
                          spartan
                          h-12
                          bg-transparent
                          border-gray-300 border-2
                          px-2
                          focus:ring-indigo-500 focus:border-blue-500
                          block
                          w-full
                          sm:text-sm
                          rounded-md
                        "
                          placeholder="Search"
                          autocomplete="off"
                        />
                        <div
                          class=" absolute top-2 left-2"
                          v-if="input.name.length > 0"
                        >
                          <div
                            class="
                      flex
                      flex-wrap
                    "
                          >
                            <div
                              style="max-width: 11rem"
                              class="
                        flex
                        justify-center
                        items-center
                        rounded-lg
                        bg-gray-300
                        px-2
                        h-8
                        mr-3
                        mb-2
                      "
                            >
                              <span class="spartan text-sm truncate">{{
                                input.name
                              }}</span>

                              <!-- <div @click="cancelOwner(sponsor)">
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
                          </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="relative bg-white z-20"
                        v-if="owners.length > 0 && input.showOwners"
                      >
                        <ul
                          class="
                        py-2
                        absolute
                        w-full
                        rounded-md
                        shadow-md
                        bg-white
                        spartan
                        text-sm
                      "
                        >
                          <li
                            class="cursor-pointer hover:bg-gray-50 py-1.5 px-2"
                            @mousedown="selectOwner(owner, input)"
                            v-for="(owner, index) in owners"
                            :key="index"
                          >
                            {{ owner.name }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-4">
                    <div class="mt-1 relative">
                      <!-- <validation-provider rules="required" v-slot="{ errors }"> -->
                      <input
                        v-model="input.amount"
                        required
                        type="number"
                        name="Amount"
                        id="Amount"
                        class="
                          spartan
                          h-12
                          bg-transparent
                          border-gray-300 border-2
                          px-2
                          focus:ring-indigo-500 focus:border-blue-500
                          block
                          w-full
                          sm:text-sm
                          rounded-md
                        "
                        placeholder="Amount"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div
                    v-if="inputArray.length > 1"
                    @click="removeInput(index)"
                    class="cursor-pointer col-span-2 flex items-center justify-center"
                  >
                    <span class="text-red-500 fs-12">Delete</span>
                  </div>
                </div>
                <div
                  @click="addInput"
                  class="mb-4 col-span-4 max-w-max cursor-pointer"
                >
                  <span class="text-blue-600">Add Sponsor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- --------------------------Second half of page inputs------------------------------ -->
        <div class="col-span-3">
          <div class="w-full sm:w-11/12">
            <!-- -----Cost per ticket---- -->
            <div class="w-fu">
              <label
                for="Cost per ticket"
                class="
                  spartan
                  
                  text-dark
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
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
                    class="
                      spartan
                      h-12
                      bg-transparent
                      border-gray-300 border-2
                      px-2
                      focus:ring-indigo-500 focus:border-blue-500
                      block
                      w-full
                      sm:text-sm
                      rounded-md
                    "
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
                class="
                  spartan
                
                  text-dark
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
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
                    class="
                      spartan
                      h-12
                      bg-transparent
                      border-gray-300 border-2
                      px-2
                      focus:ring-indigo-500 focus:border-blue-500
                      block
                      w-full
                      sm:text-sm
                      rounded-md
                    "
                    placeholder="25"
                  />

                  <span class="text-red-500 spartan">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>

            <!-- ---------- -->

            <div class="w-full mb-6">
              <label
                for="Winners Earnings"
                class="
                  spartan
                
                  text-dark
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
                >Winners Earnings</label
              >
              <div class="mt-1">
                <validation-provider
                  rules="required|numeric"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="lottery.winnersEarnings"
                    required
                    min="1"
                    oninput="this.value = Math.abs(Math.round(this.value));"
                    type="number"
                    name="Winners Earnings"
                    id="Winners Earnings"
                    :class="{
                      'border-red-400': errors.length > 0,
                    }"
                    class="
                      spartan
                      h-12
                      bg-transparent
                      border-gray-300 border-2
                      px-2
                      focus:ring-indigo-500 focus:border-blue-500
                      block
                      w-full
                      sm:text-sm
                      rounded-md
                    "
                    placeholder="25"
                  />

                  <span class="text-red-500 spartan">{{ errors[0] }}</span>
                </validation-provider>
              </div>
            </div>

            <!-- ------End date of registration------ -->

            <div class="w-full mb-6">
              <label
                for="Number of winners"
                class="
                  spartan
                  font-medium
                  text-dark
                  block
                  text-sm
                 
                  text-gray-700
                "
                >End date of registration</label
              >
              <div class="mt-1">
                <validation-provider
                  name="endDate"
                  rules="required|endDate"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="lottery.endDate"
                    required
                    type="date"
                    name="End date of registration"
                    id="end date of registration"
                    :class="{
                      'border-red-400': errors.length > 0,
                    }"
                    class="
                      spartan
                      h-12
                      bg-transparent
                      border-gray-300 border-2
                      px-2
                      focus:ring-indigo-500 focus:border-blue-500
                      block
                      w-full
                      sm:text-sm
                      rounded-md
                    "
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
                  class="
                    spartan
                   
                    text-dark
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  "
                  >Date of evaluation</label
                >
                <div class="mt-1">
                  <validation-provider
                    rules="required|dateEval:@endDate"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="lottery.evaluationDate"
                      required
                      type="date"
                      name="date of evaluation"
                      id="date of evaluation"
                      :class="{
                        'border-red-400': errors.length > 0,
                      }"
                      class="
                        spartan
                        h-12
                        bg-transparent
                        border-gray-300 border-2
                        px-2
                        focus:ring-indigo-500 focus:border-blue-500
                        block
                        w-full
                        sm:text-sm
                        rounded-md
                      "
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
                  class="
                    spartan
                    font-medium
                    text-dark
                    block
                    text-sm
                   
                    text-gray-700
                  "
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
                      class="
                        spartan
                        h-12
                        bg-transparent
                        border-gray-300 border-2
                        px-2
                        focus:ring-indigo-500 focus:border-blue-500
                        block
                        w-full
                        sm:text-sm
                        rounded-md
                      "
                    />

                    <span class="text-red-500 spartan">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
              </div>
              <!-- ---------- -->
            </div>

            <!-- ---------- -->
            <button class="hidden" id="clearLotteryInput" type="reset">
              Reset
            </button>

            <!-- <div v-if="returnBoolean || invalid">
              show me {{ returnBoolean }} {{ invalid }}
            </div> -->

            <!-- --- -->
            <button
              @click="createLottery"
              :disabled="
                invalid ||
                  saveLottery.loading ||
                  !dateCheck ||
                  lottery.lotteryUserNames.length === 0
              "
              :class="[
                invalid ||
                saveLottery.loading ||
                !dateCheck ||
                lottery.lotteryUserNames.length === 0
                  ? 'opacity-25'
                  : 'opacity-100',
              ]"
              class="
                bg-blue-200
                spartan
                w-full
                flex
                justify-center
                items-center
                h-12
                px-4
                mb-20
                rounded-md
                text-white
                focus:outline-none focus:ring-2 focus:ring-indigo-500
              "
            >
              Create lottery
              <i
                class="ml-px fa fa-spinner fa-spin"
                v-if="saveLottery.loading"
              ></i>
            </button>
          </div>
          <!-- <div>{{ checkFileLoading }}</div>
          <div>{{ !dateCheck }}</div> -->
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
import BaseVue from "@/components/BaseVue";

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
          status: "ACTIVE",
          page: this.searchCampaignsNamesQuery.page,
          size: this.searchCampaignsNamesQuery.size,
        };
      },
      skip() {
        return this.supportedCampaign.length === 0;
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
export default class CreateLottery extends BaseVue {
  // private mounted() {

  // }

  private ownerlistIsVisible: boolean = false;
  private campaignListIsVisible: boolean = false;
  private lotteryOwner: any = "";
  private supportedCampaign: string = "";
  private chosenCampaigns: any = [];
  private maxCampaigns = 3;
  private wallets: any = [];
  private owners: any = [];
  private saveLottery: ApiResource = ApiResource.create();

  private lottery: any = {
    name: "",
    description: "",
    ticketCost: "",
    numberOfWinners: "",
    winnersEarnings: "",
    // lotteryOwner: "",
    lotteryUserNames: [],
    supportedCampaigns: this.chosenCampaigns,
    endDate: "",
    evaluationDate: "",
    evaluationTime: "",
  };

  private inputArray = [
    {
      sponsor: "",
      amount: "",
      email: "",
      name: "",
      owners: this.owners,
      showOwners: false,
    },
  ];

  private searchCampaignsNamesQuery: any = {
    // key: "",
    campaignData: [],
    page: 0,
    size: 9,
    error: "",
  };

  private addInput() {
    const obj = {
      sponsor: "",
      amount: "",
      email: "",
      name: "",
      owners: this.owners,
      showOwners: false,
    };

    if (this.inputArray.length < 10) {
      this.inputArray.unshift(obj);
    }
  }

  private removeInput(index: any) {
    if (this.inputArray.length > 1) {
      this.inputArray.splice(index, 1);
    }
  }

  private get dateCheck() {
    return this.lottery.evaluationDate > this.lottery.endDate;
  }

  private get now() {
    const d = new Date();
    const newD = d.setDate(d.getDate() + 50);

    return newD;
  }

  private populateOwnersArray(index: number) {
    let self = this;

    if (!Util.isValidString(this.inputArray[index].sponsor)) {
      return;
    }

    // Util.throttle({
    //   key: "lottery-owmer-search",
    //   run: () => {
    LotteryService.getLotteryOwner(
      this.inputArray[index].sponsor,

      (response: any) => {
        Log.info(response.data._embedded.platformUsers);
        const owners = response.data._embedded.platformUsers;
        self.owners = owners.filter(
          (sponsor: any) => !this.ownerIsSelected(sponsor)
        );
      },

      (error: any) => {
        Log.error("Logged Error: " + JSON.stringify(error));
      }
    );
    //   },
    //   time: 400,
    // });
  }

  private ownerIsSelected(owner: any) {
    return this.lottery.lotteryUserNames.some((sponsor: any) => {
      return sponsor.username === owner.username;
    });
  }

  private selectOwner(owner: any, input: any) {
    input.sponsor = "";
    input.email = owner.email;
    input.name = owner.name;
    const obj = {
      name: owner.name,
      username: owner.username,
    };
    this.lottery.lotteryUserNames.push(obj);
    this.lotteryOwner = "";
    this.owners = this.owners.filter(
      (sponsor: any) => !this.ownerIsSelected(sponsor)
    );

    Log.info("sponsors: " + JSON.stringify(this.lottery.lotteryUserNames));
    Log.info("inputs: " + JSON.stringify(this.inputArray));
  }

  private cancelOwner(sponsor: any) {
    // this.lotteryOwner = "";
    // only keep objects in array where obj.field !== 'money'
    this.lottery.lotteryUserNames = this.lottery.lotteryUserNames.filter(
      (obj: any) => {
        return obj.username !== sponsor.username;
      }
    );
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

  private reset() {
    this.lottery.name = "";
    this.lottery.description = "";
    this.lottery.ticketCost = "";
    this.lottery.numberOfWinners = "";
    this.lottery.lotteryOwner = "";
    this.lottery.lotteryUserNames = [];
    this.lottery.supportedCampaigns = [];
    this.lottery.endDate = "";
    this.lottery.evaluationDate = "";
    this.lottery.evaluationTime = "";

    this.chosenCampaigns = [];
    this.lotteryOwner = null;

    (this.$refs.vObserver as any).reset();

    Log.info("Done Resetting form...");
  }

  private cancelSupportedCampaign(index: number) {
    this.chosenCampaigns.splice(index, 1);
    this.wallets.splice(index, 1);
  }

  private get getOwner() {
    return this.lotteryOwner;
  }

  private prepareLotteryRequest() {
    const time = Util.formatTime(
      `${this.lottery.evaluationDate} ${this.lottery.evaluationTime}`,
      "YYYY-MM-DD HH:mm",
      "YYYY-MM-DD HH:mm:ss.SSSS Z"
    );

    Log.info(Util.removeLastChar(time, ":"));

    Log.info(time);

    const sponsors = this.inputArray.reduce((accumulator, value, index) => {
      return { ...accumulator, [value.email]: Number(value.amount) };
    }, {});

    let request = {
      name: this.lottery.name,
      description: this.lottery.description,
      endDate: this.lottery.endDate,
      evaluationTime: Util.removeLastChar(time, ":"),
      sponsors: sponsors,

      ticketCost: Number(this.lottery.ticketCost),
      winnersCount: Number(this.lottery.numberOfWinners),
      winnersEarning: Number(this.lottery.winnersEarnings),
    };
    return request;
  }

  private createLottery() {
    let self = this;

    Log.info(`datecheck: ${this.dateCheck}`);

    self.saveLottery.loading = true;
    self.saveLottery.error = "";

    const lotteryRequest = this.prepareLotteryRequest();
    Log.info("lotteryDetails: " + JSON.stringify(lotteryRequest));
    LotteryService.createLottery(
      lotteryRequest,
      (response: any) => {
        self.saveLottery.loading = false;
        Util.handleGlobalAlert(true, "success", "Successfully created lottery");

        let resetButton: any = document.getElementById("clearLotteryInput");
        resetButton.click();
      },
      (error: any) => {
        self.saveLottery.loading = false;
        self.saveLottery.error = self.extractError(error);
        Log.error(`Error while creating lottery: ${error}`);
        Util.handleGlobalAlert(true, "failed", self.saveLottery.error);
      }
    );
  }

  // @Watch("this.inputArray", { deep: true })
  // private ownersFilter(newValue: string, oldValue: string) {
  //   const index = this.inputArray.findIndex(
  //     (input: any) => input.showOwners === true
  //   );

  //   Log.info("Index: " + JSON.stringify(index));
  //   this.populateOwnersArray(index);
  // }

  @Watch("supportedCampaign")
  private supportedCampaignFilter(newValue: string, oldValue: string) {
    this.searchCampaignsNamesQuery.campaignData = [];
  }
}
</script>

<style scoped></style>

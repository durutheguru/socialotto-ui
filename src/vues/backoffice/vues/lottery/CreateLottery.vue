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
                <div v-if="chosenOwner.length === 0">
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
                  <ul class="absolute" v-if="owners.length > 0">
                    <li
                      @click="selectOwner(owner)"
                      v-for="owner in owners"
                      :key="owner"
                    >
                      {{ owner }}
                    </li>
                  </ul>
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
                      class="h-4/6 flex justify-center items-center rounded-lg bg-gray-300 px-2 ml-3"
                    >
                      <span class="spartan text-sm">{{ chosenOwner }}</span>

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
                  >Supported Campaigns (max 3)</label
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
                <ul
                  class="absolute p-2 bg-blue-50 rounded-md "
                  v-if="supportedCampaigns.length > 0"
                >
                  <li
                    class="cursor-pointer"
                    @click="selectCampaign(campaign)"
                    v-for="campaign in supportedCampaigns"
                    :key="campaign"
                  >
                    {{ campaign }}
                  </li>
                </ul>
              </div>
              <!-- ----------------- -->
              <div
                v-if="chosenCampaigns.length > 0"
                class="mb-6 h-12 flex justify-start items-center"
              >
                <div
                  v-for="(chosenCampaign, index) in chosenCampaigns"
                  :key="chosenCampaign"
                  class="h-4/6 flex justify-start items-center rounded-lg bg-gray-300 px-2 mr-3"
                >
                  <span class="spartan text-sm">{{ chosenCampaign }}</span>

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
            <button
              :disabled="invalid"
              :class="[invalid ? 'opacity-25' : 'opacity-100']"
              class="bg-blue-200 spartan w-full flex justify-center items-center h-12 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create lottery
              <!-- <i
              class="ml-px fa fa-spinner fa-spin"
              v-if="saveCampaign.loading"
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

@Component({
  name: "CreateLottery",
})
export default class CreateLottery extends Vue {
  // private mounted() {

  // }
  private chosenOwner: string = "";
  private lotteryOwner: string = "";
  private supportedCampaign: string = "";
  private chosenCampaigns: any = [];

  private owners: any = [];
  private supportedCampaigns: any = [];

  private populateOwnersArray() {
    const ownersList = ["kai", "dumebi", "kaine"];
    this.owners = ownersList.filter((owner) => {
      return this.getOwner.length > 0 ? owner.match(this.getOwner) : false;
    });

    Log.info("filteredOwners: " + this.owners + " " + this.getOwner);
  }

  private populateSupportedCampaigns() {
    const supportedCampaignsList = ["help me", "build me"];
    this.supportedCampaigns = supportedCampaignsList.filter((campaignName) => {
      return this.supportedCampaign.length > 0
        ? campaignName.match(this.supportedCampaign) &&
            !this.chosenCampaigns.includes(campaignName)
        : false;
    });

    Log.info(
      "filteredsupportedCampaignsList: " +
        this.supportedCampaigns +
        " " +
        this.supportedCampaign
    );
  }

  private selectOwner(owner: string) {
    const chosen = owner;
    this.chosenOwner = chosen;

    Log.info(this.chosenOwner);
  }

  private selectCampaign(campaign: string) {
    const chosen = campaign;
    this.chosenCampaigns.push(chosen);
    this.supportedCampaign = "";
  }

  private cancelOwner() {
    this.lotteryOwner = "";
    this.chosenOwner = "";
  }

  private cancelSupportedCampaign(index: number) {
    this.chosenCampaigns.splice(index, 1);
  }

  private get getOwner() {
    return this.lotteryOwner;
  }

  @Watch("getOwner")
  private ownersFilter(newValue: string, oldValue: string) {
    this.populateOwnersArray();
  }

  @Watch("supportedCampaign")
  private supportedCampaignFilter(newValue: string, oldValue: string) {
    this.populateSupportedCampaigns();
  }

  private saveLottery: ApiResource = ApiResource.create();

  private lottery: any = {
    name: "",
    description: "",
    ticketCost: "",
    numberOfWinners: "",
    lotteryOwner: this.chosenOwner,
    supportedCampaigns: [],
  };

  private createLottery() {
    Log.info("lotteryDetails: " + JSON.stringify(this.lottery));
  }
}
</script>

<style scoped></style>

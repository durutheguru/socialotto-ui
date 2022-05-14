<template>
  <div
    class="spartan relative right-0 w-full pt-20 px-6 h-screen overflow-y-auto bg-blue-50"
  >
    <h1
      class="flex justify-center sm:justify-start spartan text-3xl font-semibold text-black mb-6"
    >
      Settlement Participants
    </h1>
    <div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              style="min-height: 700px"
              class=" overflow-hidden border-b border-gray-200 bg-white rounded-md"
            >
              <div
                class="v-padding-medium px-6 w-full bg-white rounded-t-md flex-right justify-between"
              ></div>
              <div
                v-if="$apollo.queries.getSettlementParticipants.loading"
                class="h-full w-full mx-auto  absoluto rounded-md block"
              >
                <div class="roundLoader opacity-50 mx-auto"></div>
              </div>
              <table
                v-else
                class="v-margin-big min-w-full  overflow-y-scroll divide-y divide-gray-200 bg-white"
              >
                <thead class="th-bg ">
                  <tr>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Wallet ID
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Wallet Name
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Charge Type
                    </th>

                    <th
                      scope="col"
                      style="min-width: 12rem; max-width: 12rem; word-wrap: break-word"
                      class="relative text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 "
                    >
                      Value
                    </th>
                    <th
                      scope="col"
                      class="relative text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 "
                    >
                      Cap
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200 mb-12">
                  <tr
                    class="border border-b"
                    v-for="participant in participants.data"
                    :key="participant.walletId"
                  >
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ participant.walletId }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ participant.walletName }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ participant.chargeType }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ participant.value }}
                    </td>

                    <td
                      class="px-6 py-3 truncate  whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ participant.cap }}
                    </td>
                  </tr>
                  <tr class="h-36 bg-white"></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseVue from "@/components/BaseVue";
import { Component } from "vue-property-decorator";
import { getSettlementParticipants } from "@/services/graphql/settlement-participant/query";
import { ApolloError } from "apollo-client";
import { Log, Util } from "@/components/util";

@Component({
  name: "SettlementParticipants",
  apollo: {
    getSettlementParticipants: {
      query: getSettlementParticipants,
      result({ data }) {
        Log.info(
          `Settlement Participants: ${JSON.stringify(
            data.getSettlementParticipants
          )}`
        );
        this.participants.data = data.getSettlementParticipants;
      },
      error(error: ApolloError) {
        this.participants.error = Util.extractGqlError(error);
        this.$apollo.queries.getSettlementParticipants.refetch();
      },
    },
  },
})
export default class SettlementParticipants extends BaseVue {
  private participants: any = {
    data: [],
    error: "",
  };
}
</script>

<style lang="scss" src="@/sass/main.scss"></style>

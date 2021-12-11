<template>
  <div
    class="spartan relative right-0 col-span-5 pt-20 px-10 h-screen overflow-y-auto bg-blue-50"
  >
    <h1
      class="flex justify-center sm:justify-start spartan text-3xl font-semibold text-black mb-6"
    >
      Lotteries
    </h1>
    <div>
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div class=" overflow-hidden border-b border-gray-200 ">
              <div class="w-full bg-white rounded-t-md py-1 ">
                <div class="h-20 px-6 flex items-center">
                  <div class="relative h-11 ">
                    <input
                      class="h-full rounded-lg pl-5 w-27rem border border-gray-200"
                      type="text"
                      placeholder="Search"
                    />
                  </div>
                  <div class="absolute ml-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <table
                class="min-w-full overflow-y-scroll divide-y divide-gray-200"
              >
                <thead class="th-bg">
                  <tr>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Lottery Owner
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      Amount raised
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      <div class="flex relative h-full">
                        <div>
                          <span>Status</span>
                        </div>
                        <div class="relative th-chevron">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="text-dark fw-700 px-6 py-3 text-left font-medium text-gray-500 fs-14 tracking-wider"
                    >
                      <div class="flex relative">
                        <span>End Date</span>
                        <div class="absolute th-chevron">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Menu</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 ">
                  <tr
                    class="border border-b"
                    v-for="person in people"
                    :key="person.email"
                  >
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ person.id }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ person.title }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ person.lotteryOwner }}
                    </td>
                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ person.amountRaised }}
                    </td>

                    <td
                      :class="{
                        statusDeclined: person.status === 'Declined',
                        statusActive: person.status === 'Active',
                        statusPending: person.status === 'Pending',
                      }"
                      class="fw-600 px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ person.status }}
                    </td>

                    <td
                      class="px-6 py-3 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ person.endDate }}
                    </td>

                    <td
                      class="relative px-6 py-3 whitespace-nowrap text-right text-sm font-medium "
                    >
                      <div class="td-elipsis relative">
                        <LotteryRowMenu :status="person.status" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="px-6 h-16 sm:rounded-b-lg bg-white">
              <div class="px-1 h-full flex justify-between items-center">
                <p class="my-auto">Showing 1-15 of 300 entries</p>

                <div class="flex">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <span class="mx-3.5"> Page 1</span>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LotteryRowMenu from "./LotteryRowMenu.vue";

@Component({
  name: "LotteriesView",
  components: {
    LotteryRowMenu,
  },
})
export default class LotteriesView extends Vue {
  private people: any = [
    {
      id: "2011201122",
      lotteryOwner: "Jane Cooper",
      title: "Chill with Wizkid",
      amountRaised: 20,
      status: "Active",
      color: "statusActive",
      endDate: "23/2/2022",
    },
    {
      id: "2011201122",
      lotteryOwner: "Jane Cooper",
      title: "Chill with Wizkid",
      amountRaised: 20,
      status: "Pending",
      color: "statusPending",
      endDate: "23/2/2022",
    },
    {
      id: "2011201122",
      lotteryOwner: "Jane Cooper",
      title: "Chill with Wizkid",
      amountRaised: 20,
      status: "Declined",
      color: "statusDeclined",
      endDate: "23/2/2022",
    },
    {
      id: "2011201122",
      lotteryOwner: "Jane Cooper",
      title: "Chill with Wizkid",
      amountRaised: 20,
      status: "Active",
      color: "statusActive",
      endDate: "23/2/2022",
    },
    {
      id: "2011201122",
      lotteryOwner: "Jane Cooper",
      title: "Chill with Wizkid",
      amountRaised: 20,
      status: "Pending",
      color: "statusPending",
      endDate: "23/2/2022",
    },
    {
      id: "2011201122",
      lotteryOwner: "Jane Cooper",
      title: "Chill with Wizkid",
      amountRaised: 20,
      status: "Declined",
      color: "statusDeclined",
      endDate: "23/2/2022",
    },

    // More people...
  ];
}
</script>

<style scoped></style>

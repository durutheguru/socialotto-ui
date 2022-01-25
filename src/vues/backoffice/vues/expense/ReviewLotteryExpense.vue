<template>
  <div
    class="spartan relative right-0 col-span-5 pt-20 px-10 h-screen overflow-y-auto bg-blue-50"
  >
    <div class="grid grid-cols-7">
      <div class="flex flex-col col-span-3">
        <h1 class="mb-6 spartan fw-600 fs-32 text-black">
          Raise Lottery Expense
        </h1>
        <h2 style="color: #454545;" class="mb-6 spartan fs-20 fw-700 ">
          <span class="fs-20 fw-400">Lottery Title:</span>
          25 tickets to Wizkid’s concert
        </h2>
        <div class="mb-9 flex justify-between items-center">
          <h2 style="color: #454545;" class="spartan fs-20 fw-700 ">
            <span class="fs-20 fw-400">Lottery Id:</span>
            20211201
          </h2>
          <h2 style="color: #454545;" class="spartan fs-20 fw-700 ">
            <span class="fs-20 fw-400">Amount raised:</span>
            2,102,200
          </h2>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full">
      <div class="grid grid-cols-7">
        <div class="col-span-3">
          <div class="w-full flex justify-start mb-10">
            <div class="px-4 pb-4 pt-8  spartan rounded-md bg-white w-full  ">
              <div class="grid grid-cols-3">
                <div class="col-span-2">
                  <div class=" w-full">
                    <h5
                      class="fw-600 fs-16 mb-4 mr-auto"
                      style="color: #1D414B;"
                    >
                      Expense
                    </h5>
                  </div>
                </div>

                <div class="col-span-1">
                  <div class="flex justify-end  w-full">
                    <h5
                      class="ml-auto fw-600 fs-16 mb-4"
                      style="color: #1D414B;"
                    >
                      Amount
                    </h5>
                  </div>
                </div>
                <!-- ------------------------- -->

                <!-- -------------------- -->
                <div class="col-span-3">
                  <div class="grid col-span-3 grid-cols-3 mb-3">
                    <div class="col-span-2 ">
                      <span
                        class="fw-400 fs-12 break-words "
                        style="color: #B9B9B9;"
                      >
                        description
                      </span>
                    </div>
                    <div class="col-span-1 flex justify-end items-center">
                      <span style="color: #4691A6;" class="fw-500 fs-12 ">
                        240
                      </span>
                    </div>
                  </div>
                  <div class="pt-2 grid col-span-3 grid-cols-3">
                    <div class="col-span-2 ">
                      <span class="fw-700 fs-12 " style="color:#595959;">
                        Total
                      </span>
                    </div>
                    <div class="col-span-1 flex justify-end items-center">
                      <span style="color: #4691A6;" class="fw-500 fs-12 ">
                        240
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-3">
          <div class="w-full flex justify-start">
            <div class="px-4 pb-4 pt-8 ml-8 spartan  w-full  ">
              <div class="grid grid-cols-3">
                <div class="col-span-1">
                  <div class="flex flex-col w-full">
                    <h5
                      class="fw-600 fs-16 mb-4 mr-auto"
                      style="color: #1D414B;"
                    >
                      Amount
                    </h5>
                  </div>
                </div>
                <div class="col-span-1">
                  <div class="flex flex-col w-full">
                    <h5
                      class="fw-600 fs-16 mb-4 mx-auto"
                      style="color: #1D414B;"
                    >
                      Debit
                    </h5>
                  </div>
                </div>
                <div class="col-span-1">
                  <div class="flex flex-col w-full">
                    <h5
                      class="ml-auto fw-600 fs-16 mb-4"
                      style="color: #1D414B;"
                    >
                      Credit
                    </h5>
                  </div>
                </div>
                <div class="col-span-3">
                  <div class="col-span-3 grid grid-cols-3 mb-3">
                    <div class="h-14 flex items-center">
                      <h2 style="color: #4691A6;" class="fw-500 fs-12">
                        240
                      </h2>
                    </div>
                    <div
                      class="h-14 flex flex-col justify-between items-center"
                    >
                      <span style="color: #B9B9B9;" class="fs-12 fw-500">
                        Lottery wallet
                      </span>
                      <h2 style="color: #4691A6;" class="fw-500 fs-12">
                        0987654321
                      </h2>
                    </div>
                    <div class="h-14 flex flex-col justify-between items-end">
                      <span style="color: #B9B9B9;" class="fs-12 fw-500">
                        Lottery wallet
                      </span>
                      <h2 style="color: #4691A6;" class="fw-500 fs-12">
                        0123456789
                      </h2>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 col-span-3">
                  <div class="w-11/12">
                    <div
                      class="bg-blue-200 col-span-1 w-full h-12 rounded-md mt-12 flex items-center justify-center"
                    >
                      <span class="text-white spartan fs-16 fw-600"
                        >Approve</span
                      >
                    </div>
                  </div>
                  <div class="w-11/12 ml-auto">
                    <div
                      style="border: 1px solid #FF0000; border-radius: 8px;"
                      class="bg-transparent col-span-1 w-full h-12 mt-12 flex items-center justify-center"
                    >
                      <span
                        style="color: #FF0000;"
                        class=" spartan fs-16 fw-600"
                        >Decline</span
                      >
                    </div>
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

@Component({
  name: "ReviewLotteryExpense",
})
export default class ReviewLotteryExpense extends Vue {}
</script>

<style scoped></style>

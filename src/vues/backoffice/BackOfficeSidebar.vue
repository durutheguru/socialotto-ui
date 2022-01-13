<template>
  <div class="col-span-1 w-full h-full relative">
    <div
      style="min-width: 17rem;"
      class="flex-1 flex flex-col h-full backOfficeSidebar"
    >
      <div class="flex-1 flex flex-col pt-16 pb-4 overflow-y-auto w-56 mx-auto">
        <div class="">
          <div
            style="background: #2B606E;"
            class="flex flex-col  px-4 mx-auto items-center rounded-lg py-6 w-full"
          >
            <!-- --- -->
            <div class="w-full text-center">
              <img
                class="inline-block h-24 w-24 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <!-- ---------- -->
            <div class="w-full text-center">
              <h1 class="mt-2 text-2xl text-white spartan font-medium">
                Dumebi Duru
              </h1>
              <h2 class="text-lg text-white spartan font-normal">Admin</h2>
            </div>
            <!-- ---------- -->
            <div class="w-full flex justify-center">
              <div class="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <svg
                  class="h-6 w-6"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.71 3.56641C11.444 4.3007 11.9439 5.23616 12.1463 6.25452C12.3488 7.27287 12.2447 8.32838 11.8473 9.2876C11.4499 10.2468 10.777 11.0666 9.91364 11.6434C9.05032 12.2202 8.03535 12.5281 6.99707 12.5281C5.95879 12.5281 4.94383 12.2202 4.08051 11.6434C3.21719 11.0666 2.54428 10.2468 2.14687 9.2876C1.74946 8.32838 1.64539 7.27287 1.84782 6.25452C2.05026 5.23616 2.5501 4.3007 3.28416 3.56641"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7 1.56641V7.39974"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- -------Nav-------- -->
        <nav class="mt-5 flex-1  space-y-1 spartan" aria-label="Sidebar">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="`/back-office/${item.href}`"
            class=" font-normal
                text-gray-300  hover:text-white
              group flex items-center  py-3 text-md
              hover:font-bold "
          >
            <span class="flex-1">
              {{ item.name }}
            </span>
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "BackofficeSidebar",
})
export default class BackofficeSidebar extends Vue {
  private navigation = [
    { name: "Dashboard", href: "#", current: true },
    {
      name: "Create A Lottery",
      href: "create-lottery",

      current: false,
    },
    { name: "Lotteries", href: "lotteries", current: false },
    { name: "Campaigns", href: "campaigns", current: false },
    {
      name: "Raise Lottery Expense",
      href: "raise_lottery_expense",
      current: false,
    },
    { name: "Manage Users", href: "#", current: false },
    { name: "Approval Requests", href: "#", current: false },
  ];
}
</script>

<style scoped>
a.router-link-active {
  color: white;
  font-weight: 600;
}
</style>

<template>
  <div class="absolute right-0 top-0 object-right-top  mt-10  sm:px-0 ">
    <div class="pointy ml-auto"></div>
    <div class="relative dropDownMenu">
      <div class=" shadow-xs overflow-hidden">
        <div class="py-3 px-2 space-y-2">
          <div class="mx-2 ">
            <span class="spartan text-sm font-bold">Notifications</span>
          </div>
          <div class="overflow-y-auto notice max-h-56 ">
            <div class=" relative w-96 whitespace-normal space-y-3.5 mx-2">
              <!-- --------------- -->
              <div class="">
                <span class="text-xs">Today</span>
                <!-- ---------content component goes here---------- -->
                <GreenHeartNotice />
              </div>

              <!-- ------------------------ -->

              <div class="">
                <span class="text-xs">Last week</span>
                <!-- ---------content component goes here---------- -->
                <YellowAlarmNotice />
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
import GreenHeartNotice from "./GreenHeartNotice.vue";
import YellowAlarmNotice from "./YellowAlarmNotice.vue";
import { Log, Util } from "@/components/util";

@Component({
  name: "RecentActivities",
  components: {
    GreenHeartNotice,
    YellowAlarmNotice,
  },
})
export default class RecentActivities extends Vue {
  private recentsMenu: any = document.getElementById("recentsMenu");

  private mounted() {
    Util.clickOutside("recentsMenu", "recentsToggle", "setIsRecentsMenu");
  }
}
</script>

<style scoped></style>

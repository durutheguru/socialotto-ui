<template>
  <!-- <campaign-component /> -->
  <div>Hello</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { lotteriesQuery } from "../../components/graphql/query";
import computed from "vue";
// import CampaignComponent from './CampaignComponent';

@Component({
  // components: {
  //     CampaignComponent,
  // },
})
export default class Campaign extends Vue {
  private searchLotteries: any = [];
  private loading: number = 0;
  // private loading: Number = 0;

  get apollo() {
    return {
      searchLotteries: {
        query: lotteriesQuery,
      },
      //   variables(): any {
      //     return {
      //       searchKey: "a",
      //       page: 0,
      //       size: 10,
      //     };
      //   },
    };
  }

  //   computed: {

  //   }
}
</script>

<template>
    <campaign-home-component />
</template>


<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    import CampaignHomeComponent from './CampaignHomeComponent';


    @Component({
        components: {
            CampaignHomeComponent,
        },
    })
    export default class CampaignHome extends Vue {


        


    }


</script>


<style lang="scss" src="@/sass/main.scss"></style>


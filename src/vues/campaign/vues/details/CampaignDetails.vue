<template>
    <campaign-details-component />
</template>


<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';
    
    import CampaignDetailsComponent from './CampaignDetailsComponent';

    
    @Component({
        components: {
            CampaignDetailsComponent,
        },
    })
    export default class CampaignDetails extends Vue {

        

    }

</script>


<style lang="scss" src="@/sass/main.scss"></style>


<template>
    <campaign-component />
</template>


<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    import CampaignComponent from './CampaignComponent';

    @Component({
        components: {
            CampaignComponent,
        },
    })
    export default class Campaign extends Vue {

    }

</script>



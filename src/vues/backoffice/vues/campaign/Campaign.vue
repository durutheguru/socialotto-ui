<template>
    <campaign-home />
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    import CampaignHome from './CampaignHome';


    @Component({
        components: {
            CampaignHome,
        },
    })
    export default class Campaign extends Vue {

    }

</script>

<style lang="scss" src="@/sass/main.scss"></style>

<template>
    <campaign-approval-home />
</template>

<script lang="ts">
    
    import { Component, Vue } from 'vue-property-decorator';

    import CampaignApprovalHome from './CampaignApprovalHome';


    @Component({
        components: {
            CampaignApprovalHome,
        },
    })
    export default class CampaignApproval extends Vue {
        
    }


</script>

<style lang="scss" src="@/sass/main.scss"></style>


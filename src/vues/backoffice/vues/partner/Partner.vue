<template>
    <partner-home />
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';
    
    import PartnerHome from './PartnerHome';

    @Component({
        components: {
            PartnerHome,
        },
    })
    export default class Partner extends Vue {

    }

</script>

<style lang="scss" src="@/sass/main.scss"></style>


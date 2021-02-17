<template>
    <PartnerUserHome />
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';
    import PartnerUserHome from './PartnerUserHome';


    @Component({
        components: {
            PartnerUserHome,
        },
    })
    export default class PartnerUsers extends Vue {

    }


</script>


<style lang="scss" src="@/sass/main.scss"></style>


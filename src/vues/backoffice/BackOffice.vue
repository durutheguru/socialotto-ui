<template>
    <BackOfficeHome />
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    import BackOfficeHome from './BackOfficeHome';

    @Component({
        components: {
            BackOfficeHome,
        },
    })
    export default class BackOffice extends Vue {



    }

</script>

<style lang="scss" src="@/sass/main.scss"></style>


<template>
    <BackOfficeUsersHome />
</template>


<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';
    import BackOfficeUsersHome from './BackOfficeUsersHome';

    @Component({
        components: {
            BackOfficeUsersHome,
        },
    })
    export default class BackOfficeUsers extends Vue {



    }

</script>

<style lang="scss" src="@/sass/main.scss"></style>


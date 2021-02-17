<template>
    <LotteryUsersHome />
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';
    import LotteryUsersHome from './LotteryUsersHome';

    @Component({
        components: {
            LotteryUsersHome,
        },
    })
    export default class LotteryUsers extends Vue {
        
    }

</script>


<style lang="scss" src="@/sass/main.scss"></style>


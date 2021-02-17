<template>
    <lottery-home-component />
</template>


<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    import LotteryHomeComponent from './LotteryHomeComponent';


    @Component({
        components: {
            LotteryHomeComponent,
        },
    })
    export default class LotteryHome extends Vue {


        


    }


</script>


<style lang="scss" src="@/sass/main.scss"></style>


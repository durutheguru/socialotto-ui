<template>
    <lottery-detail-component />
</template>


<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';
    
    import LotteryDetailComponent from './LotteryDetailComponent';

    
    @Component({
        components: {
            LotteryDetailComponent,
        },
    })
    export default class LotteryDetail extends Vue {

        

    }


</script>


<style lang="scss" src="@/sass/main.scss"></style>


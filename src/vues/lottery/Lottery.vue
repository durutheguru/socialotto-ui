<template>
    <lottery-component />
</template>


<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    import LotteryComponent from './LotteryComponent';

    @Component({
        components: {
            LotteryComponent,
        },
    })
    export default class Lottery extends Vue {

    }

</script>



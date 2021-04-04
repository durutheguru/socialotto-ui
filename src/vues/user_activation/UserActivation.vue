<template>
    <user-activation-component />
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    import UserActivationComponent from './UserActivationComponent';


    @Component({
        components: {
            UserActivationComponent,
        },
    })
    export default class UserActivation extends Vue {

    }


</script>


<template>
    <LoginComponent />
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    import LoginComponent from './LoginComponent';


    @Component({
        components: {
            LoginComponent,
        },
    })
    export default class Login extends Vue {


    }

</script>


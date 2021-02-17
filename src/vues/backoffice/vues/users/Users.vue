<template>
    <div>
        <router-view :key="$route.path" />
    </div>
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Users extends Vue {


    }

</script>



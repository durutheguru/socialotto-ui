<template>
    <div class="margin-top-m pull-right">
        <button 
            @click="previous()"
            :disabled="!canPrevious"
            class="btn btn-danger app-btn-default">
            Previous
        </button>
        <button 
            @click="next()"
            :disabled="!canNext"
            class="btn btn-success app-btn-default">
            Next
        </button>
    </div>
</template>


<script lang="ts">

    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    import BaseVue from '../BaseVue';
    import { Constants } from '../util';


    export default Vue.component('page-navigator', {

        props: ['canNext', 'canPrevious'],

        methods: {

            next() {
                this.$emit(Constants.nextPageNavigationEvent);
            },


            previous() {
                this.$emit(Constants.previousPageNavigationEvent);
            }

        }
        
    });

</script>

<style lang="scss" src="@/sass/main.scss"></style>


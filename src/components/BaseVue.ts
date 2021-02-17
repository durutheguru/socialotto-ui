import Vue from 'vue';
import { Util, Constants } from '@/components/util';
import { Component } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';


@Component
export default class BaseVue extends Vue {

    
    public quantity = Util.quantity;


    public isValidString = Util.isValidString;


    public extractError = Util.extractError;


    public campaignStages = Constants.campaignStages;


    public campaignTypes = Constants.campaignTypes;


}


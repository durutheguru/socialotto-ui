import Vue from 'vue';
import { Util, Constants } from '@/components/util';
import { Component } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';


@Component
export default class BaseVue extends Vue {

    
    public quantity = Util.quantity;


    public isValidString = Util.isValidString;


    public extractError = Util.extractError;


    public dateMoment = Util.dateMoment;


    public zoneDateTimeMoment = Util.zoneDateTimeMoment;


    public zdtToDTFormat(time: string): string {
        return Util.formatTime(
            time, 
            Constants.defaultZoneDateTimeFormat, 
            Constants.defaultDateFormat
        );
    }


    public miniZoneDateTimeMoment(time: string) {
        let moment = this.zoneDateTimeMoment(time);
        return moment.substring(0, moment.indexOf(' ') + 2);
    }


}


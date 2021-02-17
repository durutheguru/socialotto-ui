
import Vue from 'vue';
import { Log, Constants } from '@/components/util';


export const EventBus = new Vue();


export const EventTrigger = {

    trigger: (eventName: string, data: any, delay: boolean = true) => {
        setTimeout(
            () => {
                Log.info('Emitting Event: ' + eventName);
                EventBus.$emit(eventName, data);
            }, 
            
            delay ? Constants.defaultEventTriggerTimeout : 0
        );
    },

};


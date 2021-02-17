import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
import { email } from 'vee-validate/dist/rules';


export default function() {

    Vue.component('ValidationProvider', ValidationProvider);
    Vue.component('ValidationObserver', ValidationObserver);


    extend('required', {
        validate(value: string): any {
            return {
                required: true,
                valid: ['', null, undefined].indexOf(value) === -1,
            };
        },
    
        computesRequired: true,
    
        message: 'The {_field_} field is required',
    });
    
    
    extend('email_required', {
        ...email, 

        computesRequired: true,
    
        message: 'The {_field_} field is not a valid email',
    });
        

}

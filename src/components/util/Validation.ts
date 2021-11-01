import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
import { email, numeric } from 'vee-validate/dist/rules';
// import { configure } from 'vee-validate';
// import VeeValidate from 'vee-validate';







export default function() {
   
    Vue.component('ValidationProvider', ValidationProvider);
    Vue.component('ValidationObserver', ValidationObserver);

    // configure({
    //     classes: {
    //       valid: 'is-valid',
    //       invalid: 'is-invalid',
    //       dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    //       // ...
    //     }
    //   })


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

    // extend('max', {
    //     ...max, 

    //     computesRequired: true,
    
    //     message: 'Maximum nomber of characters exceeded',
    // });

    // extend('min', {
    //     ...min, 

    //     computesRequired: true,
    
    //     message: 'The {_field_} field requires more characters',
    // });

    extend('min', {
    validate(value, {length}) {
        return value.length >= length;
    },
    params: ['length'],
    message: 'The {_field_} field must have more than {length} characters'
    });

    extend('max', {
    validate(value, {length}) {
        return value.length <= length;
    },
    params: ['length'],
    message: 'The {_field_} field must not have more than {length} characters'
    });

    extend('numeric', {
    ...numeric, 

    computesRequired: true,
    message: 'The {_field_} field input must be a number'
    });

}

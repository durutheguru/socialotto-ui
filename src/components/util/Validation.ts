import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
import { email, numeric, min_value } from 'vee-validate/dist/rules';
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



    extend('min', {
    validate(value, {length}) {
        return value.length >= length;
    },
    params: ['length'],
    message: 'The {_field_} field must have at least {length} characters'
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

    // extend('minmax', {
    //     validate(value, { min, max }) {
    //       return value.length >= min && value.length <= max;
    //     },
    //     params: ['min', 'max'],
    //     message: 'The {_field_} field must have at least {min} characters and {max} characters at most'
    //   });

    // extend('min_value',  {
    //     validate(value, {min}) {
    //         return value >= min;
    //     },
    //     params: ['min'],
    //     // ...min_value,

    //     // computesRequired: true,

    //     // params: ['min'],
    
    //     message: 'The {_field_} field input amount must be at least N' + min + ".",
    // })

    // extend('minmax', {
    //     validate(value, { min, max }) {
    //       return value.length >= min && value.length <= max;
    //     },
    //     params: ['min', 'max']
    //   });

}

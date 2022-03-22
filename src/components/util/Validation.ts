import Vue from "vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { email, numeric } from "vee-validate/dist/rules";

// import { Validator } from 'vee-validate';
// import { configure } from 'vee-validate';
// import VeeValidate from 'vee-validate';

export default function() {
  Vue.component("ValidationProvider", ValidationProvider);
  Vue.component("ValidationObserver", ValidationObserver);

  /*
     
    configure({
        classes: {
          valid: 'is-valid',
          invalid: 'is-invalid',
          dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
          // ...
        }
      })

    Validator.extend('truthy', {
        getMessage: field  => 'The ' + field + ' value is not truthy.',
        validate: value => !! value
      });

    extend("maxDifference", {
        params: ["otherValue", "maxDifference"],
        validate: (value, { otherValue, maxDifference }) => {
          if (maxDifference === null || maxDifference === 0 || 
             maxDifference >= Math.abs(value - otherValue)) {
            return true;
          }
          return false;
        },
        message:
          "The difference between the two numbers is too great. 
    The maximum allowed is difference is {maxDifference}."
      });

*/

  // extend('password', {
  //   params: ['target'],
  //   validate(value, { target }) {
  //     return value === target;
  //   },
  //   message: 'Password confirmation does not match'
  // });

  extend("password", {
    params: ["target"],
    validate(value, { target }) {
      return value === target;
    },
    message: "Password confirmation does not match",
  });

  extend("required", {
    validate(value: string): any {
      return {
        required: true,
        valid: ["", null, undefined].indexOf(value) === -1,
      };
    },

    computesRequired: true,

    message: "The {_field_} field is required",
  });

  extend("email_required", {
    ...email,

    computesRequired: true,

    message: "The {_field_} field is not a valid email",
  });

  extend("min", {
    validate(value, { length }) {
      return value.length >= length;
    },
    params: ["length"],
    message: "The {_field_} field must have at least {length} characters",
  });

  extend("max", {
    validate(value, { length }) {
      return value.length <= length;
    },
    params: ["length"],
    message: "The {_field_} field must not have more than {length} characters",
  });

  extend("numeric", {
    ...numeric,

    computesRequired: true,
    message: "The {_field_} field input must be a number",
  });

  // extend('confirm', {
  //     validate(value, { password}) {
  //         return value !== password;
  //     },
  //     params: ['password'],
  //     message: 'The {_field_} field must not have more than {length} characters'
  //     });

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

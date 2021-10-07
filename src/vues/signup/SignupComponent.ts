import { Component } from 'vue-property-decorator';
import WithRender from "./signup.html";
import BaseVue from "../../components/BaseVue";

@WithRender
@Component

export default class SignupComponent extends BaseVue {

    public name: string = "";
    public email: string = "";
    public password: string = "";
    public confirmPassword: string = "";
//    public platformUser: Object = {
//         name: "",
//         email: "",
//         password: ""
//     }
    public handleSignup() {
      

        console.log(this.name);

    }
}


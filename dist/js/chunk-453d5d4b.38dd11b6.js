(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-453d5d4b"],{9685:function(e,a,t){},"9ad9":function(e,a,t){"use strict";t("9685")},"9d93":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"h-full bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8  mx-2"},[t("div",{staticClass:"signupMainOuterDiv relative top-4 sm:mx-auto sm:w-full sm:max-w-md mb-8"},[t("div",{staticClass:"signupMain bg-white py-8 px-10  sm:px-10"},[e._m(0),t("validation-observer",{ref:"observer",staticClass:"space-y-6",attrs:{tag:"form",role:"form",novalidate:""},on:{submit:function(a){return a.preventDefault(),e.handleSignup(a)}},scopedSlots:e._u([{key:"default",fn:function(a){var r=a.invalid;return[t("div",[t("label",{staticClass:"block text-sm font-medium ",staticStyle:{"font-family":"'Spartan', sans-serif","font-style":"normal","font-weight":"normal","font-size":"12px","line-height":"100%",color:"#797979"},attrs:{for:"name"}},[e._v(" Name ")]),t("div",{staticClass:"mt-1"},[t("validation-provider",{attrs:{rules:"required"},scopedSlots:e._u([{key:"default",fn:function(a){var r=a.invalid;return[t("input",{directives:[{name:"model",rawName:"v-model",value:e.platformUser.name,expression:"platformUser.name"}],staticClass:"appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm",class:{"invalid-field":r},attrs:{id:"name",name:"name",type:"name",placeholder:"name",autocomplete:"current-name",required:"",disabled:e.userSignup.loading||e.userLogin.loading},domProps:{value:e.platformUser.name},on:{input:function(a){a.target.composing||e.$set(e.platformUser,"name",a.target.value)}}})]}}],null,!0)})],1)]),t("div",[t("label",{staticClass:"block text-sm font-medium",staticStyle:{"font-family":"'Spartan', sans-serif","font-style":"normal","font-weight":"normal","font-size":"12px","line-height":"100%",color:"#797979"},attrs:{for:"email"}},[e._v(" Email address ")]),t("div",{staticClass:"mt-1"},[t("validation-provider",{attrs:{rules:"email_required"},scopedSlots:e._u([{key:"default",fn:function(a){var r=a.invalid;return[t("input",{directives:[{name:"model",rawName:"v-model",value:e.platformUser.email,expression:"platformUser.email"}],staticClass:"appearance-none block w-full px-3 py-2  placeholder-gray-400 focus:outline-none sm:text-sm",class:{"invalid-field":r},attrs:{id:"email",name:"email",type:"email",placeholder:"email",autocomplete:"email",required:"",disabled:e.userSignup.loading||e.userLogin.loading},domProps:{value:e.platformUser.email},on:{input:function(a){a.target.composing||e.$set(e.platformUser,"email",a.target.value)}}})]}}],null,!0)})],1)]),t("div",[t("label",{staticClass:"block text-sm font-medium ",staticStyle:{"font-family":"'Spartan', sans-serif","font-style":"normal","font-weight":"normal","font-size":"12px","line-height":"100%",color:"#797979"},attrs:{for:"password"}},[e._v(" Password ")]),t("div",{staticClass:"mt-1"},[t("validation-provider",{attrs:{rules:"required"},scopedSlots:e._u([{key:"default",fn:function(a){var r=a.invalid;return[t("input",{directives:[{name:"model",rawName:"v-model",value:e.platformUser.password,expression:"platformUser.password"}],staticClass:"appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm",class:{"invalid-field":r},attrs:{id:"password",name:"password",type:"password",placeholder:"(at least 6 characters)",autocomplete:"current-password",required:"",disabled:e.userSignup.loading||e.userLogin.loading},domProps:{value:e.platformUser.password},on:{input:function(a){a.target.composing||e.$set(e.platformUser,"password",a.target.value)}}})]}}],null,!0)})],1)]),t("div",[t("label",{staticClass:"block text-sm font-medium ",staticStyle:{"font-family":"'Spartan', sans-serif","font-style":"normal","font-weight":"normal","font-size":"12px","line-height":"100%",color:"#797979"},attrs:{for:"password"}},[e._v(" Confirm password ")]),t("div",{staticClass:"mt-1"},[t("validation-provider",{attrs:{rules:"required"},scopedSlots:e._u([{key:"default",fn:function(a){var r=a.invalid;return[t("input",{directives:[{name:"model",rawName:"v-model",value:e.platformUser.confirmPassword,expression:"platformUser.confirmPassword"}],staticClass:"appearance-none block w-full px-3 py-2 rounded-md placeholder-gray-400 focus:outline-none sm:text-sm",class:{"invalid-field":r},attrs:{id:"confirm-password",name:"confirm-password",type:"password",placeholder:"confirm password",autocomplete:"current-password",required:"",disabled:e.userSignup.loading||e.userLogin.loading},domProps:{value:e.platformUser.confirmPassword},on:{input:function(a){a.target.composing||e.$set(e.platformUser,"confirmPassword",a.target.value)}}})]}}],null,!0)})],1)]),t("div",{staticClass:"flex items-center justify-between"},[t("div",{staticClass:"flex items-end"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.agree,expression:"agree"}],staticClass:"checkbox",attrs:{id:"terms",name:"terms",value:"true",type:"checkbox"},domProps:{checked:Array.isArray(e.agree)?e._i(e.agree,"true")>-1:e.agree},on:{change:function(a){var t=e.agree,r=a.target,s=!!r.checked;if(Array.isArray(t)){var o="true",n=e._i(t,o);r.checked?n<0&&(e.agree=t.concat([o])):n>-1&&(e.agree=t.slice(0,n).concat(t.slice(n+1)))}else e.agree=s}}}),t("label",{staticClass:"ml-2 mb-0 block",staticStyle:{"font-family":"'Spartan', sans-serif","font-style":"normal","font-weight":"normal","font-size":"14px","line-height":"100%","text-align":"center",color:"#797979"},attrs:{for:"agree",disabled:e.userSignup.loading||e.userLogin.loading}},[e._v(" I agree to the "),t("span",{staticStyle:{"font-weight":"600"}},[e._v("terms of service")])])])]),t("div",[t("button",{staticClass:"buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",class:(r||e.userSignup.loading||!e.passwordConfirmed||e.userLogin.loading||!e.agree)&&"opacity-25",staticStyle:{"background-color":"#4691A6"},attrs:{type:"submit",disabled:r||e.userSignup.loading||!e.passwordConfirmed||e.userLogin.loading||!e.agree}},[e._v(" Sign up "),e.userSignup.loading||e.userLogin.loading?t("i",{staticClass:"ml-px fa fa-spinner fa-spin"}):e._e()])])]}}])}),e._m(1),t("div",[t("form",{attrs:{action:e.loginUrl+"/google/oauth",method:"POST"}},[t("button",{staticClass:"buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",staticStyle:{"background-color":"#FF3D00","margin-bottom":"20px"},attrs:{type:"submit",disabled:e.userSignup.loading||e.userLogin.loading}},[e._v(" Google ")])])])],1)])])},s=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv"},[t("h2",{staticClass:"mt-3 text-center mainHeader"},[e._v(" Signup to Socialotto ")])])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticStyle:{"font-family":"'Spartan', sans-serif","font-style":"normal","font-weight":"normal","font-size":"12px","line-height":"100%","text-align":"center",color:"#797979","margin-bottom":"32px","margin-top":"35px"}},[t("span",[e._v("or one click signup via")])])])}],o=(t("b0c0"),t("d4ec")),n=t("bee2"),i=t("262e"),l=t("2caf"),u=t("9ab4"),d=t("fc54"),c=t("2fd6"),m=t("60a3"),p=t("2417"),f=function(){function e(){Object(o["a"])(this,e)}return Object(n["a"])(e,null,[{key:"signupPlatformUser",value:function(e,a,t){d["d"].post("/api/v1/user_signup",e,a,t)}}]),e}(),g=t("121f"),v=function(e){Object(i["a"])(t,e);var a=Object(l["a"])(t);function t(){var e;return Object(o["a"])(this,t),e=a.apply(this,arguments),e.platformUser={name:"",email:"",password:"",confirmPassword:""},e.userSignup=p["a"].create(),e.agree=!1,e.userLogin=p["a"].create(),e.loginUrl="https://socialotto.herokuapp.com",e}return Object(n["a"])(t,[{key:"handleSignup",value:function(){var e=this,a=this;d["b"].info(this.platformUser.name),a.userSignup.error="",a.userSignup.loading=!0,f.signupPlatformUser({name:a.platformUser.name,email:a.platformUser.email,password:a.platformUser.password},(function(t){a.userSignup.loading=!1,d["b"].info("Signup was successful"),a.userLogin.loading=!1,g["a"].doLogin({username:a.platformUser.email,password:a.platformUser.password},(function(t){a.userLogin.loading=!1,g["a"].handleSuccessfulLogin(t,e)}),(function(e){a.userLogin.loading=!1,a.userLogin.error=d["c"].extractError(e)}))}),(function(e){a.userSignup.loading=!1,a.userSignup.error=d["c"].extractError(e)}))}},{key:"passwordConfirmed",get:function(){return this.platformUser.password===this.platformUser.confirmPassword}}]),t}(c["a"]);v=Object(u["a"])([Object(m["a"])({name:"Signup"})],v);var w=v,b=w,h=(t("9ad9"),t("2877")),y=Object(h["a"])(b,r,s,!1,null,"39ea5336",null);a["default"]=y.exports}}]);
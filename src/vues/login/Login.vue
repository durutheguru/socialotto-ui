<template>
  <div>
    <LoginComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import LoginComponent from "./LoginComponent";

@Component({
  components: {
    LoginComponent,
  },
})
export default class Login extends Vue {}
</script>

<style scoped>
.signupHeader {
  position: fixed;
  width: 100%;
  height: 84px;
  left: 0px;
  top: 0px;
  /* background-color: #ffffff; */
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
  z-index: 1;
}

.customButton {
  background: #4691a6;
  border-radius: 8px;
  height: 40px;
}

.signupLogo {
  position: relative;
  width: 175px;
  height: 40px;
  /* left: 10%;
    top: 22px; */

  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 100%;

  letter-spacing: -0.14em;

  color: #4691a6;
}

a {
  height: 14px;
  /* margin: auto 0; */

  color: #767676;
}

.spartan {
  font-family: "Spartan", sans-serif;
}

.menuIcon {
  display: none;
  width: 24px;
  height: 24px;
  color: #4691a6;
}

.signupMain {
  position: relative;

  /* width: 520px; */
  /* height: 720px; */
  /* left: 460px; */
  /* margin: 0 auto 0; */
  /* top: 84px; */
  border: 2px solid #2c5662;
  /* box-sizing: border-box; */
  border-radius: 8px;
  /* padding: 0 60px; */
  /* display: flex; */
  /* align-items: center;
    flex-direction: column; */
  /* z-index: -1; */
}

@media only screen and (max-width: 640px) {
  .signupMain {
    border: none;
    padding-top: 0;
    --tw-bg-opacity: 1;
    background-color: rgba(249, 250, 251, var(--tw-bg-opacity)) !important;
  }

  .signupMainOuterDiv {
    margin-top: 0;
  }
}

.anchorDIv {
  width: 60%;
  display: flex;
  justify-content: flex-end;
}

@media only screen and (max-width: 900px) {
  .anchorDIv {
    display: none;
  }
  .innerHeaderDiv {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  .signupLogo {
    display: none;
  }

  .menuIcon {
    display: flex;
  }
}

.mainHeader {
  position: relative;
  /* width: 268px; */
  /* height: 24px; */
  /* left: 583px; */
  /* margin: 0 auto 0; */
  /* top: 49px; */
  /* margin-bottom: 40px; */
  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  color: #2c5662;
}

.mainHeaderDiv {
  margin-bottom: 20px;
}

.inputDiv {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 40px;
  width: 100%;
  margin-bottom: 24px;
}

.marginTop20 {
  margin-top: 20px;
}

input {
  position: relative;
  width: 100%;
  height: 48px;
  /* left: 520px; */
  /* top: 245px; */

  border: 2px solid #2c5662;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0 24px;
}

.checkbox {
  width: 14px;
  height: 14px;
  /* left: 520px;
    top: 521px; */

  background: #595959;
  border: 2px solid #e1e1e1;
  box-sizing: border-box;
  border-radius: 2px;
  margin-right: 8px;
}

button {
  width: 100%;
  height: 48px;
  /* left: 520px;
  top: 559px; */
  border: none;
  border-radius: 8px;
}

.buttonText {
  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  text-align: center;

  color: #ffffff;
}

::placeholder {
  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #797979;
}
/* position: relative;
      top: 40px;
      left: 0px; */
</style>

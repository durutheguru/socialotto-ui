<template>
  <!-- <SignupComponent /> -->
  <div style="height: 100%">
    <!-- ------------logo------------- -->
    <!-- <div style="height: 100%"> -->
    <div class="signupHeader">
      <span class="signupLogo">Socialotto</span>
    </div>

    <div class="signupMain">
      <span class="mainHeader">Signup to socialotto</span>
      <form role="form" @submit.prevent="" method="POST">
        <div class="inputDiv">
          <input type="text" id="name" name="name" placeholder="name" />

          <input
            class="marginTop20"
            type="text"
            id="email"
            name="email"
            placeholder="email address"
          />
          <input
            class="marginTop20"
            type="text"
            id="password"
            name="password"
            placeholder="password (at least 6 characters)"
          />
          <input
            class="marginTop20"
            type="text"
            id="confirm password"
            name="confirm password"
            placeholder="confirm password"
          />
        </div>

        <div
          style="width: 100%; position: relative;
        top: 40px; margin-bottom: 24px;"
        >
          <span
            style="display: flex; flex-direction: row; font-family: 'Spartan', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 14px;
            line-height: 100%;
            text-align: center;
            color: #797979;"
            ><input type="checkbox" class="checkbox" /> I agree to the terms of
            service</span
          >
        </div>

        <button
          style="background-color: #4691A6; margin-top: 41px; margin-bottom: 35px;"
        >
          <span class="buttonText">Signup</span>
        </button>

        <span
          style="font-family: 'Spartan', sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 100%;
          text-align: center;
          color: #797979;
          margin-bottom: 32px"
          >or one click signup via</span
        >
        <button style="background-color: #FF3D00; margin-bottom: 20px;">
          <span class="buttonText">Google</span>
        </button>
        <button style="background-color: #3B5998;">
          <span class="buttonText">Facebook</span>
        </button>
      </form>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts"></script>
<style scoped>
.signupHeader {
  position: fixed;
  width: 100%;
  height: 84px;
  left: 0px;
  top: 0px;
  /* background: #ffffff; */
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
  z-index: 1;
}

.signupLogo {
  position: relative;
  width: 175px;
  height: 40px;
  left: 10%;
  top: 22px;

  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 100%;

  letter-spacing: -0.14em;

  color: #4691a6;
}

.signupMain {
  position: relative;
  width: 36%;
  height: 720px;
  /* left: 460px; */
  margin: 0 auto 0;
  top: 132px;
  border: 1.5px solid #2c5662;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: -1;
}

.mainHeader {
  position: relative;
  width: 268px;
  height: 24px;
  /* left: 583px; */
  margin: 0 auto 0;
  top: 49px;
  margin-bottom: 40px;
  font-family: "Spartan", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  color: #2c5662;
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

<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="signupHeader z-10 bg-gray-50">
      <span class="signupLogo">Socialotto</span>
    </div>

    <div class="relative top-20 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="signupMain bg-white py-8 px-12 border sm:rounded-lg sm:px-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv">
          <h2 class="mt-3 text-center mainHeader">
            Signup to socialotto
          </h2>
        </div>
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center items-end">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="checkbox"
              />
              <label
                for="remember-me"
                style="font-family: 'Spartan', sans-serif;
                  font-style: normal;
                  font-weight: normal;
                  font-size: 14px;
                  line-height: 100%;
                  text-align: center;
                  color: #797979;"
                class="ml-2 mb-0 block"
              >
                I agree to the
                <span style="font-weight: 600;">terms of service</span>
              </label>
            </div>

            <!-- <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div> -->
          </div>

          <div>
            <button
              type="submit"
              style="background-color: #4691A6;"
              class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>

        <div>
          <div
            style="font-family: 'Spartan', sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 100%;
          text-align: center;
          color: #797979;
          margin-bottom: 32px;
          margin-top: 35px;
          "
          >
            <span>or one click signup via</span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            style="background-color: #FF3D00; margin-bottom: 20px;"
            class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Google
          </button>
        </div>

        <div>
          <button
            style="background-color: #3B5998;"
            type="submit"
            class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Facebook
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- <SignupComponent /> -->
</template>

<script lang="ts">
import BaseVue from "@/components/BaseVue";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Signup extends BaseVue {}
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
  /* width: 36%; */
  /* height: 720px; */
  /* left: 460px; */
  /* margin: 0 auto 0; */
  /* top: 84px; */
  border: 1.5px solid #2c5662;
  /* box-sizing: border-box; */
  border-radius: 8px;
  /* padding: 0 60px; */
  /* display: flex; */
  /* align-items: center;
  flex-direction: column; */
  /* z-index: -1; */
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

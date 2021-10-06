<template>
  <div
    class="min-h-screen
    bg-gray-50
    flex
    flex-col
    justify-center
    py-12
    sm:px-6
    lg:px-8"
  >
    <div class="signupHeader z-10 bg-gray-50">
      <span class="signupLogo">Socialotto</span>
    </div>

    <div
      class="px-12 bg-gray-50 z-0 sm:mx-auto sm:w-full sm:max-w-md signupMain"
    >
      <!-- <div class="sm:rounded-lg sm:px-10"> -->
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

<script>
export default {};
</script>

<style lang="scss" scoped></style>

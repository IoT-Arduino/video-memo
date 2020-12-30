<template>
  <div class="container">
    <!-- SignUp Form -->
    <div class="mx-auto px-2 mt-10">
      <div class="max-w-sm mx-auto my-14 bg-white px-5 py-10 rounded shadow-xl">
        <div class="text-center mb-8">
          <h1 class="font-bold text-2xl text-gray-800">
            Sign To VideoMemoApp (Dummy)
          </h1>
        </div>
        <form action="#">
          <div class="mt-5">
            <label for="username">Email</label>
            <input
              type="text"
              v-model="SignUp_email"
              id="username"
              class="input block w-full p-2 border rounded border-gray-500"
            />
          </div>
          <div class="mt-5">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="SignUp_password"
              id="password"
              class="input block w-full p-2 border rounded border-gray-500"
            />
          </div>
          <div v-if="SignUpErrorMsg" class="text-center mt-3 text-red-400">
            {{ SignUpErrorMsg }}
          </div>
          <div class="font-bold text-lg mt-8 text-white">
            <input
              @click="SignUp"
              type="submit"
              value="SignUp"
              class="cursor-pointer py-3 bg-indigo-500 hover:bg-indigo-600 rounded text-center w-full"
            />
          </div>
        </form>
        <div class="hover:text-green-800 text-center w-full mt-3">
          <nuxt-link to="/Login" class="hover:text-green-800"
            ><span>Already have an account?<br /> Click this link to Login</span></nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase, auth } from "@/plugins/firebase";

export default {
  data: function() {
    return {
      SignUp_email: "",
      SignUp_password: "",
      SignUpErrorMsg: ""
    };
  },
  methods: {
    SignUp() {
      this.SignUpErrorMsg = "This is Dummy SignUpPage";
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  border: 1px solid gray;
}
</style>

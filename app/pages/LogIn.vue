<template>
  <div class="container">
    <!-- Login Form -->
    <div class="container mx-auto p-2">
      <div class="max-w-sm mx-auto my-24 bg-white px-5 py-10 rounded shadow-xl">
        <div class="text-center mb-8">
          <h1 class="font-bold text-2xl text-gray-800">
            Login To VideoMemoApp
          </h1>
        </div>
        <form>
          <div class="mt-5">
            <label for="username">Email</label>
            <input
              type="text"
              v-model="login_email"
              id="username"
              class="input block w-full p-2 border rounded border-gray-500"
            />
          </div>
          <div class="mt-5">
            <label for="password">Password</label>
            <input
              type="password"
              v-model="login_password"
              id="password"
              class="input block w-full p-2 border rounded border-gray-500"
            />
          </div>
          <div v-if="loginErrorMsg" class="text-center mt-3 text-red-400">
            {{ loginErrorMsg }}
          </div>
          <div class="font-bold text-lg mt-8 text-white">
            <button
              @click.prevent="login"
              type="submit"
              value="Login"
              class="cursor-pointer py-3 bg-green-500 hover:bg-green-600 rounded text-center w-full"
            >Login</button>
          </div>
        </form>
        <div class="hover:text-green-800 text-center w-full mt-3">
          <nuxt-link to="/SignUp" class="hover:text-green-800"
            ><span>Click this link to create account</span></nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase, auth } from "@/plugins/firebase";

export default {
  async mounted() {
    await auth().onAuthStateChanged(
      user => {
        if (user) {
          console.log(user)
          // auth().signOut();
        } else {
          console.log("no user")
        }
      }
    );
  },
  data: function() {
    return {
      login_email: "",
      login_password: "",
      loginErrorMsg: "",
      // isLogin: false
    };
  },

  methods: {
    login() {
      console.log("loginFunction")
      auth()
        .signInWithEmailAndPassword(this.login_email, this.login_password)
        .then(user => {
          console.log("loggedIn")
          this.$router.push("/")
          })
        .catch(e => (this.loginErrorMsg = e.message));
    }
  }
};
</script>

<style lang="scss">
.input {
  border: 1px solid gray;
}
</style>

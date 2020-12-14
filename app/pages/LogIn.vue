<template>
  <div class="container">
    <!-- Login Form -->
    <div class="container mx-auto p-2">
      <div class="max-w-sm mx-auto my-24 bg-white px-5 py-10 rounded shadow-xl">
        <div class="text-center mb-8">
          <h1 class="font-bold text-2xl text-gray-800">
            Login To ゴルフ理論解体新書
          </h1>
        </div>
        <form action="#">
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
          <div class="mt-10">
            <input
              @click="email_login"
              type="input"
              value="送信"
              class="py-3 bg-green-500 hover:bg-green-600 rounded text-white text-center w-full"
            />
          </div>
        </form>
        <div v-if="loginErrorMsg">{{ loginErrorMsg }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase, auth } from "@/plugins/firebase";

export default {
  data: function() {
    return {
      login_email: "",
      login_password: "",
      loginErrorMsg: ""
    };
  },
  methods: {
    login() {
      auth()
        .signInWithEmailAndPassword(this.login_email, this.login_password)
        .then(user => this.$router.push("/"))
        .catch(e => alert(e.message))
    },
    email_login: function(err) {
      this.$store
        .dispatch("signInWithEmail", {
          email: this.login_email,
          password: this.login_password
        })
        .then(() => {
          this.login_email = "";
          this.login_password = "";
          // this.$router.push("/");
        })
        .catch(err => {
          if (err.code === "auth/user-disabled") {
            this.loginErrorMsg = "このアカウントはロックされています。";
          } else {
            this.loginErrorMsg =
              "メールアドレスまたはパスワードが間違っています。";
          }
        });
    }
  }
};
</script>

<style lang="scss">
.input {
  border: 1px solid gray;
}
</style>

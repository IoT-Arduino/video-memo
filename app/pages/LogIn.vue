<template>
  <div>
    <p>Loginページ</p>
    <div>
      <p>Email</p>
      <input type="text" v-model="login_email" class="input"/>
    </div>
    <div>
      <p>password</p>
      <input type="text" v-model="login_password" class="input" />
    </div>
    <button @click="email_login">ログイン</button>
  </div>
</template>

<script>
import { firebase, auth } from "@/plugins/firebase";

export default {
  data: function() {
    return {
      login_valid: true,
      login_email: "",
      login_password: "",
      loginErrorMsg: ""
    };
  },
  methods: {
    email_login: function(err) {
      this.$store
        .dispatch("signInWithEmail", {
          email: this.login_email,
          password: this.login_password
        })
        .then(() => {
          this.login_email = "";
          this.login_password = "";
          this.$router.push("/");
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
  border:1px solid gray;
}

</style>

<template>
  <div>
    <p>Loginページ</p>
    <div>
      <p>Email</p>
      <input type="text" v-model="login_email" />
      <p>{{login_email}}</p>
    </div>
    <div>
      <p>password</p>
      <input type="text" v-model="login_password" />
            <p>{{login_password}}</p>
    </div>
    <button @click="email_login">ログイン</button>
  </div>
</template>

<script>
import {firebase,auth} from "@/plugins/firebase";

export default {
  created() {
    console.log(this.$route.path)
  },
  computed: {},
  data: function() {
    return {
      login_valid: true,
      login_email: "",
      login_password: "",
      loginErrorMsg: "",
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
          this.$router.push('/');
        })
        .catch(err => {
          if (err.code === "auth/user-disabled") {
            this.loginErrorMsg = "このアカウントはロックされています。";
          } else {
            this.loginErrorMsg =
              "メールアドレスまたはパスワードが間違っています。";
          }
        });
    },
    // async login(){
    //   const userLogin = await auth().signInWithEmailAndPassword(this.login_email, this.login_password)
    //   console.log(userLogin)
      
    // }
  }
};
</script>

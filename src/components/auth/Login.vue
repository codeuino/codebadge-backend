<template>
  <v-layout align-center justify-center>
    <v-btn dark class="btn-login" v-if="!isLoading" @click="login">
      <v-icon dark left>fab fa-github</v-icon>Login with GitHub
    </v-btn>
    <v-btn dark class="btn-login" v-if="isLoading">
      <img src="@/assets/loaders/bars.svg" alt="loading..." />
    </v-btn>
  </v-layout>
</template>

<script>
import axios from "axios";
import AxiosHelper from "../../config/AxiosHelper";
import AuthService from "../../services/authService";

const authService = new AuthService();

export default {
  name: "Login",
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    login() {
      window.location = `${AxiosHelper.authUrl}?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=user%20repo%20read:org`;
    }
  },
  created: function() {
    if (authService.isLoggedIn()) {
      window.location = AxiosHelper.homeUrl;
    }
    const code = window.location.href.match(/\?code=(.*)/);
    if (code) {
      this.isLoading = true;
      console.log(this.isLoading);
      axios({
        method: `post`,
        url: `${AxiosHelper.gatekeeperUrl}?client_id=${
          process.env.VUE_APP_CLIENT_ID
        }&client_secret=${
          process.env.VUE_APP_CLIENT_SECRET
        }&code=${code[1].slice(0, 20)}`
      })
        .then(res => {
          var token = res.data.match(/access_token=(.*)/)[1].slice(0, 40);
          localStorage.setItem("token", token);
          window.location = AxiosHelper.homeUrl;
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.i-github {
  font-size: 80px;
}

.btn-login {
  width: 200px;
  height: 40px;
}
</style>
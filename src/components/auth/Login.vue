<template>
  <div>
    <div>
      <v-layout justify-center>
        <i class="fab fa-github-square i-github"></i>
      </v-layout>
    </div>
    <v-btn class="btn-login" v-if="!isLoading" outline @click="login">Login with GitHub</v-btn>
    <v-btn class="btn-login" v-if="isLoading" outline>
      <img src="@/assets/loaders/bars.svg" alt="loading...">
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios';
import AxiosHelper from '../../config/AxiosHelper';

export default {
  name: 'Login',
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    login() {
      window.location = `${AxiosHelper.authUrl}?client_id=${
        process.env.VUE_APP_CLIENT_ID
      }&scope=user%20repo%20read:org`;
    }
  },
  created: function() {
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
      }).then(res => {
          this.isLoading = false;
          var token = res.data.match(/access_token=(.*)/)[1].slice(0,40);
          console.log("access_token:" + token);
          localStorage.setItem('token', token);
          window.location = AxiosHelper.homeUrl;
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
  font-size: 64px;
}

.btn-login {
  width: 170px;
}
</style>
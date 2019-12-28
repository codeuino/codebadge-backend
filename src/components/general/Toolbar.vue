<template>
  <v-toolbar color="white" app>
    <v-toolbar-title class="toolbar">
      <span>Codebadge</span>
    </v-toolbar-title>
    <v-spacer />
    <div class="toolbar-contents">
      <v-btn flat class="toolbar-button">About Us</v-btn>
      <v-btn flat class="toolbar-button">Join Us</v-btn>
      <v-btn color="primary" @click="logout" v-if="isLogged" round>Logout</v-btn>
    </div>
  </v-toolbar>
</template>

<script>
import AxiosHelper from "../../config/AxiosHelper";
import AuthService from "../../services/authService";
import axios from 'axios';

const authService = new AuthService();

export default {
  name: "Toolbar",
  data() {
    return {
      isLogged: false
    };
  },
  created: function() {
    this.isLogged = authService.isLoggedIn();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.isLogged = authService.isLoggedIn();
      window.location = AxiosHelper.homeAuthUrl;
    }
  }
};
</script>

<style lang="scss" >
.toolbar {
  font-size: 30px;
  font-family: 'Raleway';
  padding-right: 20px
}

.toolbar-button {
  padding-top: 5px;
}
</style>
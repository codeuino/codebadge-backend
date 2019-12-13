<template>
  <div>
    <div class="login-menu">
      <v-container style="widh=200px;">
        <v-layout class="header1" justify-center>Welcome to CodeBadge!</v-layout>
        <v-layout class="header2" justify-center>TRACK ALL YOUR PROJECTS AT ONE PLACE</v-layout>
        <v-layout class="text1" justify-center>
          Having a hard time tracking all your project contributors?
        </v-layout>
        <v-layout class="text1" style="padding-top:0px;" justify-center>CodeBadge does it for you!
        </v-layout>
        <v-layout class="ma-3" align-center justify-center>
          <Login />
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import Login from "../components/auth/Login";

export default {
  name: "AuthView",
  components: {
    Login
  }
};
</script>

<style lang="scss" scoped>
.login-menu {
  padding-top: 100px;
}

.header1 {
  font-family: 'Playfair Display';
  font-size: 70px;
  padding-top: 50px;
}

.header2 {
  font-family: 'Roboto';
  font-size: 33px;
}

.text1 {
  padding-top: 25px;
  font-family: 'Roboto Condensed';
  font-size: 20px;
}
</style>
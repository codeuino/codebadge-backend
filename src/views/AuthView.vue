<template>
  <div>
    <v-layout class="ma-5" justify-center>
      <Login/>
    </v-layout>
  </div>
</template>

<script>
import Login from '../components/auth/Login';

export default {
  name: 'AuthView',
  components: {
    Login
  }
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <v-app>
    <v-toolbar color="white" app>
      <v-toolbar-title class="headline text-uppercase">
        <a href='http://localhost:8080/upload'>upload file</a>
        <span>Codebadge</span>
        <span class="font-weight-light text-none">&nbsp;(Production Stage)</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content class="content">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      //
    };
  }
};
</script>

<style lang="scss" >
.content {
  background-color: white;
}
a{
  float:right;
}
</style>
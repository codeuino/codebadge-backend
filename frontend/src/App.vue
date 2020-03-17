<template>
  <v-app>
    <Toolbar/>
    <v-content class="content">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "./components/general/Toolbar";

export default {
  name: "App",
  components: {
    Toolbar
  }
};
</script>

<style lang="scss" >
.content {
  background-color: white;
}
</style>
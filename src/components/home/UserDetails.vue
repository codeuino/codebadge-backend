<template>
  <div>
    <v-card flat ripple>
      <v-layout justify-center row>
        <v-flex>
          <v-avatar size="80">
            <img :src="userData.dp">
          </v-avatar>
        </v-flex>
        <v-flex>
          <div class="username ml-3">{{userData.username}}</div>
          <div class="github-name ml-3">{{userData.githubName}}</div>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  computed: {
    userData() {
      return this.$store.getters.userData;
    }
  }
};
</script>

<style lang="scss" scoped>
.username {
  font-size: 20px;
}
.github-name {
  color: grey;
  font-size: 15px;
}
</style>
<template>
  <div>
    <v-card flat ripple>
      <v-layout row>
        <v-avatar size="80">
          <img :src="dp">
        </v-avatar>
        <div class="name ml-3">{{name}}</div>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'UserDetails',
  props: {
    dp: {
      type: String
    },
    name: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.name {
  font-size: 20px;
}
</style>
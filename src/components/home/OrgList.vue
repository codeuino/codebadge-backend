<template>
  <div>
    <v-card flat>
      <v-list>
        <v-list-tile
          v-for="org in orgsData"
          :key="org.name"
          @click="viewOrg(org.name)"
          avatar
          ripple
        >
          <v-list-tile-avatar>
            <img :src="org.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="org.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'OrgList',
  computed: {
    orgsData() {
      return this.$store.getters.orgsData;
    }
  },
  methods: {
    viewOrg(name) {
      this.$router.push({ name: 'orgView', params: { name: name } });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
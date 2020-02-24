<template>
  <div>
    <v-card flat>
      <v-card
        v-for="org in orgsData"
        :key="org.name"
        @click="viewOrg(org.name)"
        hover
        flat
        ripple
        class="mx-auto org"
      >
        <v-card-title>
          <v-list-tile-avatar>
            <v-img class="elevation-6" :src="org.avatar" />
          </v-list-tile-avatar>
          <span class="title font-weight-light">{{ org.name }}</span>
        </v-card-title>
        <OrgContributors :orgName="org.name" />
      </v-card>
    </v-card>
  </div>
</template>

<script>
import OrgContributors from "../org/OrgContributors";

export default {
  name: "OrgList",
  components: {
    OrgContributors
  },
  data() {
    return {
      contributors: []
    };
  },
  computed: {
    orgsData() {
      return this.$store.getters.orgsData;
    }
  },
  methods: {
    viewOrg(name) {
      if(this.$store.state.isOrgLoaded[name])
        this.$router.push({ name: "orgView", params: { name: name } });
    }
  }
};
</script>

<style lang="scss" scoped>
.org {
  margin-bottom: 8px;
}
</style>

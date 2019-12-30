<template>
  <div>
    <v-layout class="ma-5" justify-center>
      <div v-if="!isLoading">
        <v-btn @click="newBadge" style="margin-bottom: 30px;"
          >Create a New Badge</v-btn
        >
        <UserDetails />
        <div class="mt-5 orgs">Organizations</div>
        <OrgList />
        <div>
          <v-btn @click="addOrganization">Add access to an Organization</v-btn>
        </div>
      </div>
      <div v-if="isLoading">
        <img src="@/assets/loaders/block.svg" alt="loading..." />
      </div>
    </v-layout>
  </div>
</template>

<script>
import UserDetails from "../components/home/UserDetails";
import OrgList from "../components/home/OrgList";

export default {
  name: "HomeView",
  computed: {
    isLoading() {
      return this.$store.state.user == "" && this.$store.state.userOrgs == "";
    }
  },
  components: {
    UserDetails,
    OrgList
  },
  created() {
    this.$store.dispatch("loadUser");
    this.$store.dispatch("loadUserOrgs");
  },
  methods: {
    addOrganization() {
      window.open(
        "https://github.com/settings/connections/applications/" +
          process.env.VUE_APP_CLIENT_ID,
        "_blank"
      );
    },
    newBadge() {
      window.location.href = "#/newbadge";
    }
  }
};
</script>

<style lang="scss" scoped>
.orgs {
  font-size: 20px;
}
</style>

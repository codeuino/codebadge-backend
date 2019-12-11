<template>
  <div>
    <v-layout class="ma-5" justify-center>
      <div v-if="!isLoading">
        <v-btn class="btn-login" v-if="isLoading" outline>
        <a href = "#/newbadge">
          <button data-v-6bab3132="" type="button" class="btn-login v-btn v-btn--outline v-btn--depressed theme--light">
            <div class="v-btn__content">Create a New Badge</div>
         </a>
         </v-btn>
          </button>
        <UserDetails/>
        <div class="mt-5 orgs">Organizations</div>
        <OrgList/>
      </div>
      <div v-if="isLoading">
        <img src="@/assets/loaders/block.svg" alt="loading...">
      </div>
    </v-layout>
  </div>
</template>

<script>
import UserDetails from '../components/home/UserDetails';
import OrgList from '../components/home/OrgList';

export default {
  name: 'HomeView',
  computed: {
    isLoading() {
      return this.$store.state.user == '' && this.$store.state.userOrgs == ''
        ? true
        : false;
    }
  },
  components: {
    UserDetails,
    OrgList
  },
  created() {
    this.$store.dispatch('loadUser');
    this.$store.dispatch('loadUserOrgs');
  }
};
</script>

<style lang="scss" scoped>
.orgs {
  font-size: 20px;
}

A {
  text-decoration: none;
}
</style>

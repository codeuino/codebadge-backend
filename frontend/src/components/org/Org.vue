<template>
  <div>
    <div v-if="!isLoading">
      <v-card flat>
        <OrgDetails :dp="org.avatar_url" :name="org.login"/>
        <OrgRepos :orgName="org.login" :repos="orgRepos"/>
      </v-card>
    </div>

    <div v-if="isLoading">
      <img src="@/assets/loaders/block.svg" alt="loading...">
    </div>
  </div>
</template>

<script>
import OrgDetails from './OrgDetails';
import OrgRepos from './OrgRepos';
import axios from 'axios';
import AxiosHelper from '../../config/AxiosHelper';
import AuthService from '../../services/authService';

const authService = new AuthService();

export default {
  name: 'Org',
  data() {
    return {
      org: [],
      orgRepos: [],
      isLoading: false
    };
  },
  components: {
    OrgDetails,
    OrgRepos
  },
  computed: {
    name() {
      return this.$route.params.name;
    }
  },
  methods: {
    loadOrg() {
      axios
        .get(`${AxiosHelper.baseUrl}/orgs/${this.name}/repos`, {
          headers: {
            Authorization: `token ${authService.getToken()}`
          }
        })
        .then(res => {
          this.isLoading = false;
          this.orgRepos = res.data;
          this.org = res.data[0].owner;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    //Check if everything is actually loaded and app has not been reloaded on user end.
    if(this.$store.state.user == '')
    {
      this.$router.push({ name: "homeView"});
    }

    this.isLoading = true;
    this.loadOrg();
  }
};
</script>

<style lang="scss" scoped>
</style>
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
        .get(`${AxiosHelper.baseUrl}/orgs/${this.name}`, {
          headers: {
            Authorization: `token ${authService.getToken()}`
          }
        })
        .then(res => {
          this.org = res.data;
          this.loadOrgRepos();
        })
        .catch(err => console.log(err));
    },

    //Can be done in a single call
    loadOrgRepos() {
      axios
        .get(`${AxiosHelper.baseUrl}/orgs/${this.name}/repos`, {
          headers: {
            Authorization: `token ${authService.getToken()}`
          }
        })
        .then(res => {
          this.isLoading = false;
          this.orgRepos = res.data;
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.isLoading = true;
    this.loadOrg();
  }
};
</script>

<style lang="scss" scoped>
</style>
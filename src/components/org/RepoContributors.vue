<template>
  <div>
    <div v-for="contributor in contributors" :key="contributor.author.id">
      <ContributorItem
        :author="contributor.author.login"
        :weeks="contributor.weeks"
        :total="contributor.total"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ContributorItem from './ContributorItem';
import AxiosHelper from '../../config/AxiosHelper';
import AuthService from '../../services/authService';

const authService = new AuthService();

export default {
  name: 'RepoContributors',
  data() {
    return {
      contributors: []
    };
  },
  props: {
    orgName: {
      type: String
    },
    repoName: {
      type: String
    }
  },
  components: {
    ContributorItem
  },
  methods: {
    loadContributors() {
      axios
        .get(
          `${AxiosHelper.baseUrl}/repos/${this.orgName}/${
            this.repoName
          }/stats/contributors`,
          {
            headers: {
              Authorization: `token ${authService.getToken()}`
            }
          }
        )
        .then(res => (this.contributors = res.data))
        .catch(err => console.log(err));
    }
  },
  created() {
    this.loadContributors();
  }
};
</script>

<style lang="scss" scoped>
.badge {
  width: 20px;
  height: 20px;
}
table,
th,
td {
  border: 1px solid black;
}
</style>
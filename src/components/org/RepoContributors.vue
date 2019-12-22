<template>
  <div>
    <div
      v-for="contributor in contributors"
      :key="contributor.author.id"
      class="contributors"
    >
      <ContributorItem
        :name="contributor.author.login"
        :orgName="orgName"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ContributorItem from "./ContributorItem";
import AxiosHelper from "../../config/AxiosHelper";
import AuthService from "../../services/authService";

const authService = new AuthService();

export default {
  name: "RepoContributors",
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
          `${AxiosHelper.baseUrl}/repos/${this.orgName}/${this.repoName}/stats/contributors`,
          {
            headers: {
              Authorization: `token ${authService.getToken()}`
            }
          }
        )
        .then(res => {
          this.sortContributors(res.data);
          this.contributors = res.data;
        })
        .catch(err => console.log(err));
    },
    sortContributors(contributors) {
      contributors.sort(function(a, b) {
        return b.total - a.total;
      });
    }
  },
  created() {
    this.loadContributors();
  }
};
</script>

<style lang="scss" scoped>
.contributors {
  padding-left: 25px;
}
</style>

<template>
  <div>
    <div v-if="!isLoading">
      <div
        v-for="contributor in contributors"
        :key="contributor.name"
        class="contributor"
      >
        <ContributorItem :name="contributor.name" :orgName="orgName" />
      </div>
    </div>
    <div v-if="isLoading">
      <img src="@/assets/loaders/block.svg" alt="loading..." />
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
  name: "OrgContributors",
  data() {
    return {
      contributors: [],
      isLoading: true
    };
  },
  props: {
    orgName: {
      type: String
    }
  },
  components: {
    ContributorItem
  },
  methods: {
    async load(cutoff) {
      //Set org status as loading
      this.$store.commit("SET_ORG_STATUS", {
        orgName: this.orgName,
        status: false
      });

      let topContributors = [];
      const orgRepos = await this.getRepos();
      for (let i = 0; i < orgRepos.length; i++) {
        const contributors = await this.getContributors(orgRepos[i].name);
        for(let j = 0; j < contributors.length; j++) {
          let contributor = contributors[j];
          if (!topContributors.hasOwnProperty(contributor.author.login)) {
            topContributors[contributor.author.login] = {
              name: contributor.author.login,
              total: contributor.total,
              weeks: contributor.weeks,
              avatar: contributor.author.avatar_url
            };
          } else {
            try {
              topContributors[contributor.author.login].total +=
                contributor.total;
              for (let k = 0; k < contributor.weeks.length; k++) {
                if(topContributors[contributor.author.login].weeks.length <= k)
                  topContributors[contributor.author.login].weeks.push({
                    w: contributor.weeks[k].w,
                    a: 0,
                    d: 0,
                    c: 0
                  })
                topContributors[contributor.author.login].weeks[k].c +=
                  contributor.weeks[k].c;
                topContributors[contributor.author.login].weeks[k].a +=
                  contributor.weeks[k].a;
                topContributors[contributor.author.login].weeks[k].d +=
                  contributor.weeks[k].d;
              }
            } catch (err) {
              console.log(err)
            }
          }
        }
      }

      //store this
      this.$store.commit("SET_ORG_COMMITS", {
        data: topContributors,
        orgName: this.orgName
      });
      this.$store.dispatch("sortTopCommits");
      this.$store.dispatch("sortTopWeekCommits");
      this.$store.dispatch("sortTopMonthCommits");
      this.$store.dispatch("sortTopYearCommits");

      topContributors = this.$store.getters.getTopCommits(this.orgName);

      for (let data in topContributors) {
        if (cutoff <= 0) break;
        this.contributors.push(topContributors[data]);
        cutoff--;
      }
      this.isLoading = false;
      this.$store.commit("SET_ORG_STATUS", {
        orgName: this.orgName,
        status: true
      });
    },
    async getRepos() {
      const res = await axios
        .get(`${AxiosHelper.baseUrl}/orgs/${this.orgName}/repos`, {
          headers: {
            Authorization: `token ${authService.getToken()}`
          }
        })
        .catch(err => console.log(err));
      return res.data;
    },
    async getContributors(repoName) {
      let res = await axios
        .get(
          `${AxiosHelper.baseUrl}/repos/${this.orgName}/${repoName}/stats/contributors`,
          {
            headers: {
              Authorization: `token ${authService.getToken()}`
            }
          }
        )
        .catch(err => console.log(err));
      return res.data;
    },
    sortContributors(contributors) {
      contributors.sort(function(a, b) {
        return b.total - a.total;
      });
    }
  },
  created() {
    this.load(3);
  }
};
</script>

<style>
.contributor {
  padding-left: 25px;
}
</style>

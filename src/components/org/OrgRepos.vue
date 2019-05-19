<template>
  <div>
    <div class="my-3">
      <div class="mt-5 count">Total repo count: {{repos.length}}</div>
      <div class="my-5" v-for="repo in repos" :key="repo.name">
        <div class="repo-name">{{repo.name}}</div>
        <RepoContributors :orgName="orgName" :repoName="repo.name"/>
      </div>
    </div>
  </div>
</template>

<script>
import RepoContributors from './RepoContributors.vue';

export default {
  name: 'OrgRepos',
  props: {
    repos: {
      type: Array
    },
    orgName: {
      type: String
    }
  },
  components: {
    RepoContributors
  }
};
</script>

<style lang="scss" scoped>
.repo-name {
  font-size: 18px;
  font-weight: 600;
}
.count {
  font-size: 20px;
}
</style>
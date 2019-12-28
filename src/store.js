import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import AxiosHelper from './config/AxiosHelper';
import AuthService from './services/authService';

Vue.use(Vuex);

const authService = new AuthService();

export default new Vuex.Store({
  state: {
    user: [],
    userOrgs: [],
    orgCommits: [],
    topCommits: [],
    topWeekCommits: [],
    topMonthCommits: [],
    topYearCommits: [],
    isOrgLoaded: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USER_ORGS(state, userOrgs) {
      state.userOrgs = userOrgs;
    },
    SET_ORG_COMMITS(state, payload) {
      state.orgCommits[payload.orgName] = [];
      for(let user in payload.data)
        state.orgCommits[payload.orgName].push(payload.data[user]);
    },
    SET_TOP_COMMITS(state, topCommits) {
      state.topCommits = topCommits;
    },
    SET_TOP_WEEK_COMMITS(state, topWeekCommits) {
      state.topWeekCommits = topWeekCommits;
    },
    SET_TOP_MONTH_COMMITS(state, topMonthCommits) {
      state.topMonthCommits = topMonthCommits;
    },
    SET_TOP_YEAR_COMMITS(state, topYearCommits) {
      state.topYearCommits = topYearCommits;
    },
    SET_ORG_STATUS(state, payload) {
      state.isOrgLoaded[payload.orgName] = payload.status;
    }
  },
  actions: {
    loadUser(context) {
      axios
        .get(`${AxiosHelper.baseUrl}/user`, {
          headers: {
            Authorization: `token ${authService.getToken()}`
          }
        })
        .then(res => context.commit('SET_USER', res.data))
        .catch(err => console.log(err));
    },
    loadUserOrgs(context) {
      axios
        .get(`${AxiosHelper.baseUrl}/user/orgs`, {
          headers: {
            Authorization: `token ${authService.getToken()}`
          }
        })
        .then(res => context.commit('SET_USER_ORGS', res.data))
        .catch(err => console.log(err));
    },
    sortTopCommits(context) {
      let topCommits = [];
      for(const org in context.state.orgCommits)
      {
        let data = context.state.orgCommits[org];
        data.sort(function(a, b) {
          return b.total - a.total;
        });
        topCommits[org] = data;
      }
      context.commit("SET_TOP_COMMITS", topCommits)
    },
    sortTopWeekCommits(context) {
      let topWeekCommits = [];
      for(const org in context.state.orgCommits)
      {
        let data = context.state.orgCommits[org];
        data.sort(function(a, b) {
          return b.weeks[b.weeks.length - 1].c - a.weeks[a.weeks.length - 1].c;
        });
        topWeekCommits[org] = data;
      }
      context.commit("SET_TOP_WEEK_COMMITS", topWeekCommits)
    },
    sortTopMonthCommits(context) {
      let topMonthCommits = [];
      for(const org in context.state.orgCommits)
      {
        let data = context.state.orgCommits[org];
        data.sort(function(a, b) {
          let sum1 = 0, sum2 = 0;
          let len = Math.min(a.weeks.length, b.weeks.length);
          for(let i = len - 1; i >= len - 4 && i >= 0; i--) {
            sum1 += a.weeks[i].c;
            sum2 += b.weeks[i].c;
          }
          return sum2 - sum1;
        });
        topMonthCommits[org] = data;
      }
      context.commit("SET_TOP_MONTH_COMMITS", topMonthCommits)
    },
    sortTopYearCommits(context) {
      let topYearCommits = [];
      for(const org in context.state.orgCommits)
      {
        let data = context.state.orgCommits[org];
        data.sort(function(a, b) {
          let sum1 = 0, sum2 = 0;
          let len = Math.min(a.weeks.length, b.weeks.length);
          for(let i = len - 1; i >= len - 52 && i >= 0; i--) {
            sum1 += a.weeks[i].c;
            sum2 += b.weeks[i].c;
          }
          return sum2 - sum1;
        });
        topYearCommits[org] = data;
      }
      context.commit("SET_TOP_YEAR_COMMITS", topYearCommits)
    }
  },
  getters: {
    //UserDetails.vue
    userData: state => {
      let userData = {
        username: state.user.name,
        githubName: state.user.login,
        dp: state.user.avatar_url
      };

      return userData;
    },

    //OrgList.vue
    orgsData: state => {
      let orgsData = [];
      state.userOrgs.forEach(org => {
        orgsData.push({
          name: org.login,
          avatar: org.avatar_url
        });
      });
      return orgsData;
    },

    //Org.vue
    getOrgByName: state => name => {
      return state.userOrgs.find(org => (org.login = name));
    },

    getUserOrgCommits: state => data => {
      return state.orgCommits[data.orgName].find(user => {return user.name === data.name})
    },

    getTopCommits: state => orgName => {
      return state.topCommits[orgName];
    },

    getTopWeekCommits: state => orgName => {
      return state.topWeekCommits[orgName];
    },

    getTopMonthCommits: state => orgName => {
      return state.topMonthCommits[orgName];
    },

    getTopYearCommits: state => orgName => {
      return state.topYearCommits[orgName];
    }
  }
});

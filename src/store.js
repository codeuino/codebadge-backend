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
    userOrgs: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USER_ORGS(state, userOrgs) {
      state.userOrgs = userOrgs;
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
    }
  }
});

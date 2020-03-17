import Vue from "vue";
import Router from "vue-router";
import AuthView from "./views/AuthView";
import HomeView from "./views/HomeView";
import NewBadge from "./views/NewBadge";
import OrgView from "./views/OrgView";
import Upload from "./views/Upload";
import BadgeList from "./views/BadgeView"

import AuthService from "./services/authService";
import store from "./store.js";

Vue.use(Router);

const authService = new AuthService();

export default new Router({
  routes: [
    {
      path: "",
      redirect: "auth"
    },
    {
      path: "/upload",
      name: "Upload",
      component: Upload
    },
    {
      path: "/auth",
      name: "authView",
      component: AuthView
    },
    {
      path: "/home",
      name: "homeView",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        next(authService.isLoggedIn());
      }
    },
    {
      path: "/newBadge",
      name: "newBadge",
      component: NewBadge,
      beforeEnter: (to, from, next) => {
        next(authService.isLoggedIn());
      }
    },
    {
      path: "/org/:name",
      name: "orgView",
      component: OrgView,
      beforeEnter: (to, from, next) => {
        next(authService.isLoggedIn());
      }
    },
    {
      path: "/badges",
      name: "badgeList",
      component: BadgeList
    }
  ]
});

import Vue from "vue";
import Router from "vue-router";
import AuthView from "./views/AuthView";
import HomeView from "./views/HomeView.vue";
import OrgView from "./views/OrgView";
import AuthService from "./services/authService";
import CreateBadge from "./views/CreateBadge";
import Upload from "./views/Upload/Upload.vue";

Vue.use(Router);

const authService = new AuthService();

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
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
      path: "/create",
      name: "CreateBadge",
      component: CreateBadge
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
      path: "/org/:name",
      name: "orgView",
      component: OrgView,
      beforeEnter: (to, from, next) => {
        next(authService.isLoggedIn());
      }
    }
  ]
});

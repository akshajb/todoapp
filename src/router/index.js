import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // eslint-disable-next-line no-unused-vars
    beforeEnter: (to, from, next) => {
      if (store.state.Auth.user.uid) {
        next({ name: "Dashboard" });
      } else {
        next();
      }
    },
  },
  {
    path: "/signup",
    name: "Signup",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
  {
    path: "/signin",
    name: "Signin",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signin.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/addtodo",
    name: "AddTodo",
    meta: { requiresAuth: true },

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddTodo.vue"),
  },
  {
    path: "/edittodo/",
    name: "EditTodo",
    meta: { requiresAuth: true },
    props: true,

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/EditTodo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const uid = store.getters.userInfo.uid
      ? store.getters.userInfo.uid
      : localStorage.getItem("uid");
    if (!uid) {
      next({ path: "/signin" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import "@/assets/base.css";
import VuePageTransition from "vue-page-transition";

Vue.config.productionTip = false;

Vue.use(VuePageTransition);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import Vuex from "vuex";
import Todos from "./modules/Todos";
import Auth from "./modules/Auth";
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Todos,
    Auth,
  },
});

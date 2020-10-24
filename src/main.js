import router from "./router.js";
import Vue from "vue/dist/vue.js";
import Vuex from "vuex";
import mainStore from "../src/store.js";

// app store
Vue.use(Vuex);
const store = new Vuex.Store(mainStore);

new Vue({
  el: "#app",
  router,
  store,
});

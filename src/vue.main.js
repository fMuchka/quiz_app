import router from "./router.js";
import Vue from "vue/dist/vue.js";
import Vuex from "vuex";
import mainStore from "../src/store.js";
import navigationMenu from "../src/components/navigationMenu.vue"

// app store
Vue.use(Vuex);
const store = new Vuex.Store(mainStore);

new Vue({
  el: "#app",
  router,
  store,
  components: {
    navigationMenu
  },

  mounted: function () {
    // Attach event listener to the root vue element
    this.$el.addEventListener('click', this.outSideMenuClick);

    this.$router.push("/fileload")
    // Or if you want to affect everything
    // document.addEventListener('click', this.onClick)
  },
  beforeUnmount: function () {
    this.$el.removeEventListener('click', this.outSideMenuClick);
    // document.removeEventListener('click', this.onClick)
  },
  methods: {
    outSideMenuClick: function (ev) {
      const check = ev.path.find(element => element.id === "menu-wrapper");
      
      if (check === undefined) {
        this.$store.commit("hideMenu");
      }
    }
  }
});
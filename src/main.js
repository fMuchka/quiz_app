import router from "./router.js";
import Vue from "vue/dist/vue.js";
import Vuex from "vuex";

// app store
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    quiz: null,
    teams: [],
    availableColor: [
      {id: 'red', label: 'červený', used: false},
      {id: 'blue', label: 'modrý', used: false},
      {id: 'green', label: 'zelený', used: false},
      {id: 'yellow', label: 'žlutý', used: false}
    ]
  },

  mutations: {
    setQuiz(state, quiz) {
      state.quiz = quiz;
    },
    pushTeam(state, team) {
      state.teams.push(team);
    },
    changeColorStatus(state, input) {
      state.availableColor[input.index].used = input.status;
    }
  },

  getters: {
    quiz: (state) => {
      return state.quiz;
    },
    availableColor: (state) => {
      const colors = state.availableColor;

      for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
          
        if (color.used === false) {
          store.commit('changeColorStatus', {index: i, status: true});
          return color;
        }
      }
      // no colors left
      return false;
    }
  },
});

new Vue({
  el: "#app",
  router,
  store,
});

import router from "./router.js";
import Vue from "vue/dist/vue.js";
import Vuex from "vuex";

// app store
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    quiz: null,
    teams: [],
    colorList: [
      { id: 'red', label: 'červený', used: false },
      { id: 'blue', label: 'modrý', used: false },
      { id: 'green', label: 'zelený', used: false },
      { id: 'yellow', label: 'žlutý', used: false },
      { id: 'purple', label: 'fialový', used: false },
      { id: 'brown', label: 'hnědý', used: false },
    ],
    nextColorIndex: 1
  },

  mutations: {
    setQuiz(state, quiz) {
      state.quiz = quiz;
    },
    pushTeam(state, team) {
      state.teams.push(team);
    },
    changeColorStatus(state, input) {
      state.colorList[input.index].used = input.status;
    },
    incrementColorIndex(state) {
      if (state.nextColorIndex < state.colorList.length) {
        state.nextColorIndex++;
      }
    }
  },

  getters: {
    quiz: (state) => {
      return state.quiz;
    },
    color: (state) => {
      const colors = state.colorList;
      const freeIndex = state.nextColorIndex;

      if (freeIndex < colors.length) {
        return colors[freeIndex];
      }
      else {
        // no colors left
        return false;
      }
    },
    nextColorIndex: (state) => {
      return state.nextColorIndex;
    },
    colorListLength(state) {
      return state.colorList.length;
    }
  }
});

new Vue({
  el: "#app",
  router,
  store,
});

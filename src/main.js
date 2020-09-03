import router from './router.js'
import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex';

// app store
Vue.use(Vuex);
const store = new Vuex.Store({
     state: {
        quiz: null
    },

    mutations: {
        setQuiz (state, quiz) {
            state.quiz = quiz;
        }
    },

    getters: {
        quiz: state => {
            return state.quiz;
        }
    }
});

new Vue({
    el: '#app',
    router,
    store
});
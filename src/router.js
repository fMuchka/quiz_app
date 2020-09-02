import FileLoad from './pages/FileLoad.vue'
import Wonderland from './pages/Wonderland.vue'
import VueRouter from 'vue-router'
import Vue from 'vue/dist/vue.js'

Vue.use(VueRouter)

const routes = [
    {   path: '/fileload',
        name: 'fileload',
        component: FileLoad
    },

    {   path: '/wonderland',
        name: 'wonderland',
        component: Wonderland
    }
  ];

const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router;

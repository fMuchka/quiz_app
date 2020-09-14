import FileLoad from './pages/FileLoad.vue'
import TeamCreate from './pages/TeamCreate.vue'
import VueRouter from 'vue-router'
import Vue from 'vue/dist/vue.js'

Vue.use(VueRouter)

const routes = [
    {   path: '/fileload',
        name: 'fileload',
        component: FileLoad
    },

    {   path: '/teamcreate',
        name: 'teamcreate',
        component: TeamCreate
    }
  ];

const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router;

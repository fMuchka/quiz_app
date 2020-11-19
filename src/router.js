import VueRouter from 'vue-router'
import Vue from 'vue/dist/vue.js'

Vue.use(VueRouter)

const routes = [
    {   path: '/fileload',
        name: 'fileload',
        component: () => import('./pages/FileLoad.vue')
    },

    {   path: '/teamcreate',
        name: 'teamcreate',
        component: () => import('./pages/TeamCreate.vue')
    },

    {   path: '/themesoverview',
        name: 'themesoverview',
        component: () => import('./pages/ThemesOverview.vue')
    },
    {   
        path: '/questionslide',
        name: 'questionslide',
        component: () => import('./pages/QuestionSlide.vue')
    }
  ];

const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router;

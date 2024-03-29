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
    },
    {   
        path: '/themeanswers',
        name: 'themeanswers',
        component: () => import('./pages/ThemeAnswers.vue')
    },
    {   
        path: '/scoreboard',
        name: 'scoreboard',
        component: () => import('./pages/ScoreBoard.vue')
    },
    {   
        path: '/finalresults',
        name: 'finalresults',
        component: () => import('./pages/FinalResults.vue')
    },
  ];

const router = new VueRouter({
    routes // short for `routes: routes`
});

export default router;

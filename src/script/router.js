const Fileload = { template: '<div><h2>Here we load files</h2><input type="file" name="quiz-load" id="quizLoadInput" v-on:change="loadFile()"></div>' }
const Wonderland = { template: '<div><h2>Here we always dream, never scream</h2></div>' }

const routes = [
    {   path: '/fileload', 
        name: 'fileload', 
        component: Fileload//() =>
            //import(/* webpackChunkName: 'fileload' */ "../pages/FileLoad.vue") 
    },

    {   path: '/wonderland', 
        name: 'wonderland',
        component: Wonderland//() =>
            //import(/* webpackChunkName: 'wonderland' */ "../pages/Wonderland.vue") 
    }
  ];

const router = new VueRouter({
    routes // short for `routes: routes`
});

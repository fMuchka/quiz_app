// app store
const store = new Vuex.Store({
    state: {
        quiz: null
    },

    mutations: {
        // load quiz via file upload
        loadQuiz (state) {
            let reader = new FileReader();
            reader.onload = () =>{
                state.quiz = JSON.parse(event.target.result); 
            };

            reader.readAsText(event.target.files[0]); 
        }
    },

    getters: {
        quiz: state => {
            return state.quiz;
        }
    }
});




window.onload = () => {
    // file upload component
    let quizLoad = new Vue({
        el: '#quizLoadInput',
        store,
        methods : {
            loadFile : () => {
                store.commit('loadQuiz');
            }
        }
    });
}
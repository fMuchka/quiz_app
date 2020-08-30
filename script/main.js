// app store
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




window.onload = () => {
    // file upload component
    const quizLoad = new Vue({
        el: '#quizLoadInput',
        store,
        methods : {
            loadFile : () => {
                const reader = new FileReader();
                // load file
                reader.onload = () => {
                    const quiz = JSON.parse(event.target.result); 
                    // save the quiz data into app store
                    store.commit('setQuiz', quiz);
                };

                reader.readAsText(event.target.files[0]);             
            }
        }
    });
}
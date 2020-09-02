<template>
    <div>
        <h2>
            Here we load files
        </h2>

        <input type="file" name="quiz-load" id="quizLoadInput" v-on:change="loadFile()">
        <div><b>Loaded data:</b> {{loadedQuizData}}</div>
    </div>
</template>

<script>
export default {
    computed: {
        loadedQuizData: {
            get() {
                return this.$store.state.quiz;
            },
            set() {}
        }
    },
    methods: {
        loadFile() {
            const reader = new FileReader();
            // load file
            reader.onload = (e) => {
                const quiz = JSON.parse(e.target.result);
                // save the quiz data into app store
                this.$store.commit('setQuiz', quiz);
            };
            reader.readAsText(event.target.files[0]);
        }
    }
}
</script>


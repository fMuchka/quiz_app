<template>
  <div>
    <img id="logo"
         src="/src/assets/sviniPivemNezarmoutis_logo.png" 
         alt="nope"
    >

    <input id="quizLoadInput"
           type="file" 
           name="quiz-load"
           title=" "
           v-on:change="loadFile()" />

    <label for="quizLoadInput"> Open Quiz </label>
    <div>
      <b>Loaded data:</b>
      {{ loadedQuizData }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loadedQuizData: {
      get() {
        return this.$store.state.quiz;
      },
      set() {},
    },
  },
  methods: {
    loadFile() {
      const reader = new FileReader();
      // load file
      reader.onload = (e) => {
        const quiz = JSON.parse(e.target.result);
        // save the quiz data into app store
        this.$store.commit("setQuiz", quiz);
      };
      reader.readAsText(event.target.files[0]);
    },
  },
};
</script>
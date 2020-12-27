<template>
  <div>
    <img
      id="logo"
      src="/src/assets/sviniPivemNezarmoutis_logo.png"
      alt="nope"
    />

    <input
      id="quizLoadInput"
      type="file"
      name="quiz-load"
      title=" "
      v-on:change="loadFile"
    />

    <label for="quizLoadInput"> Otevři kvíz </label>
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
    loadFile(event) {
      const reader = new FileReader();
      // load file
      reader.onload = (e) => {
        const quiz = JSON.parse(e.target.result);
        // save the quiz data into app store
        this.$store.commit("setQuiz", quiz);
        this.$store.dispatch("setupScoreTemplate");
      };
      reader.readAsText(event.target.files[0]);
    },
  },
};
</script>
<style scoped>
#logo {
  height: 30vw;
  display: flex;
  margin: auto;
}

#quizLoadInput {
  display: none;
}

label[for="quizLoadInput"] {
  display: flex;
  margin: auto;
  color: white;
  border-radius: 5px;
  border: 1px solid var(--secondary-color);
  background-color: var(--secondary-color);
  width: 25vw;
  font-size: 50px;
  place-content: center;
  padding: 10px 0;
}

label[for="quizLoadInput"]:hover {
  cursor: pointer;
  color: 003049;
}
</style>


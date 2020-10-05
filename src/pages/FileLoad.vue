<template>
  <div>
<<<<<<< HEAD
    <h2 class="redcolor">
      Here we load files
    </h2>
=======
    <img id="logo"
         src="/src/assets/sviniPivemNezarmoutis_logo.png" 
         alt="nope"
    >
>>>>>>> parent of 579e003... Finalized FileLoad.vue test

    <input id="quizLoadInput"
           type="file" 
           name="quiz-load"
<<<<<<< HEAD
           v-on:change="loadFile()" />
=======
           title=" "
           v-on:change="loadFile()" />

    <label for="quizLoadInput"> Open Quiz </label>
>>>>>>> parent of 579e003... Finalized FileLoad.vue test
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
<style scoped>
<<<<<<< HEAD
  .redcolor {
    color: #FF0000;
=======
  #logo{
    height: 30vw;
    display: flex;
    margin: auto;
  }

  #quizLoadInput{
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
    background-color: FCBF49;
    color: 003049;
>>>>>>> parent of 579e003... Finalized FileLoad.vue test
  }
</style>


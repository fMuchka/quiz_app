<template>
  <div>
    <img
      id="logo"
      src="assets/sviniPivemNezarmoutis_logo.png"
      alt="nope"
    />

    <input
      id="quizLoadInput"
      type="file"
      name="quiz-load"
      title=" "
      v-on:change="loadFile"
    />


    <flow-arrow
        :isForward="true"
        :nextPage="'teamcreate'"
        >
    </flow-arrow>

    <label for="quizLoadInput"> Otevři kvíz </label>
    <div>
      <b>Loaded data:</b>
      {{ loadedQuizData }}
    </div>
  </div>
</template>

<script>
import FlowArrow from "../components/FlowArrow.vue"

const fs = window.require("fs");
const path = window.require("path");
const mime = window.require("mime-types");

function loadFileFromSystem(dirPath, filePath){
  const fullPath = path.join(dirPath, filePath);

  const canFileBeAccessed = () => {
    let canBeAccessed = true;

    try { 
      fs.accessSync(fullPath, fs.constants.R_OK);
    } catch (error) {
      canBeAccessed = false;

      console.error(`File ${filePath} cannot be accessed.`);
    }

    return canBeAccessed;
  };

  if (canFileBeAccessed()) {
    const type = mime.lookup(filePath);

    return { src: fullPath, type: type };
  }
  else {
    return null;
  }
}

export default {
  components:{
    FlowArrow
  },

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

      // A) electron used, B) we can get file-path of quiz File
      if (!event.target.files[0].path) {
        return;
      }

      // load file
      reader.onload = (e) => {
        const quiz = JSON.parse(e.target.result);

        const quizDirPath = path.dirname(event.target.files[0].path);

        //  we have file path of quiz, so we can read relative paths of media files
        //  we can now simply enforce our rule "keep media files bundled with quiz"
        if (quizDirPath !== null) {
          for (const media in quiz.mediaFiles) {  
            const file = loadFileFromSystem(quizDirPath, quiz.mediaFiles[media]);
            
            if (file === null) {
              // file cannot be accessed
              quiz.mediaFiles[media] = undefined;
            }
            else{
              quiz.mediaFiles[media] = file;
            }
          }
        }

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


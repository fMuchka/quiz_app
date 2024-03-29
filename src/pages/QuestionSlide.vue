<template>
  <div id="wrapper" v-if="lightBoxMode === false">
    <div id="top-area">
      <div id="points-info">
        {{ pointsInfoText }}
      </div>
      <div id="theme-progress-bar">
        <div
          v-for="(item, index) in nOfQuestionsInTheme"
          :key="index"
          class="progress-bar-item"
          :style="progressBarFill(index)"
        ></div>
      </div>
    </div>
    <div id="split-line"></div>
    <div id="bottom-area">
      <div id="question-text">
        {{ questionText }}
      </div>

      <div id="media" v-if="this.mediaType === 'audio'">
        <audio
          controls
          alt="Not the file you're looking for..."
          :src="mediaPath"
        />
      </div>

      <div id="media" v-if="this.mediaType === 'video'">
        <video
          controls
          alt="Not the file you're looking for..."
          :src="mediaPath"
        />
      </div>

      <div id="media" v-if="this.mediaType === 'image'">
        <img
          alt="Not the file you're looking for..."
          :src="mediaPath"
          @click="lightBoxMode = true"
        />
      </div>
    </div>

    <flow-arrow :isForward="false" :qMode="true"> </flow-arrow>
    <flow-arrow :isForward="true" :qMode="true"> </flow-arrow>
  </div>

  <div id="wrapper-LB" v-else @click.self="lightBoxMode = false">
    <img :src="mediaPath" alt="Not the file you're looking for..." />

    <div id="question-text-LB">
      {{ questionText }}
    </div>
  </div>
</template>

<script>
import flowArrow from "../components/FlowArrow.vue";

export default {
  components: {
    flowArrow,
  },

  data() {
    return {
      lightBoxMode: false,
    };
  },

  computed: {
    themeLabel() {
      return this.$store.getters.currentTheme.text;
    },
    pointsInfo() {
      const points = this.$store.getters.currentQuestion.points.max;
      const step = this.$store.getters.currentQuestion.points.increment;

      return { points: points, step: step };
    },
    pointsInfoText() {
      const { points, step } = this.pointsInfo;
      let firstPart;
      let secondPart;

      // some awkward beauty of Czech language
      switch (points) {
        case 1:
          firstPart = `Za ${points} bod`;
          break;

        case 2:
        case 3:
        case 4:
          firstPart = `Za ${points} body`;
          break;
        default:
          firstPart = `Za ${points} bodů`;
          break;
      }

      switch (step) {
        case 1:
          secondPart = `po ${step} bodu`;
          break;
        default:
          secondPart = `po ${step} bodech`;
          break;
      }

      // both values are same, no need for the second part
      if (points === step) {
        return firstPart;
      }

      return [firstPart, secondPart].join(", ");
    },

    nOfQuestionsInTheme() {
      return this.$store.getters.currentTheme.questions.length;
    },

    currentQIndex() {
      return this.$store.getters.currentQuestionIndex;
    },

    questionText() {
      return this.$store.getters.currentQuestion.text;
    },

    mediaPath() {
      const pointer = this.$store.getters.currentQuestion.media;

      if (this.$store.getters.quiz.mediaFiles[pointer] === undefined) {
        return "";
      }

      const { src } = this.$store.getters.quiz.mediaFiles[pointer];

      return src;
    },

    mediaType() {
      const pointer = this.$store.getters.currentQuestion.media;

      if (this.$store.getters.quiz.mediaFiles[pointer] === undefined) {
        return "";
      }

      const { type } = this.$store.getters.quiz.mediaFiles[pointer];

      return type.split("/")[0];
    },
  },

  methods: {
    progressBarFill(index) {
      if (index === this.currentQIndex) {
        return "background-color: white";
      } else {
        return "background: transparent";
      }
    },
  },
};
</script>

<style scoped>
#wrapper {
  display: grid;
  grid-template-rows: 100px 1% 85%;
  height: 100%;
}

#split-line {
  width: 100%;
  border-bottom: 5px solid var(--secondary-color);
  height: 1px;
}

#bottom-area {
  font-size: 40px;
  padding: 2%;
}

#question-text {
  text-align: center;
  padding: 0 40px;
  font: bold;
}

#top-area {
  display: grid;
  grid-template-areas:
    ". points-info ."
    "theme-progress-bar theme-progress-bar theme-progress-bar";
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
}

#points-info {
  grid-area: points-info;
  font-size: 28px;
  align-self: center;
}

#theme-progress-bar {
  grid-area: theme-progress-bar;
  height: 60px;
  width: 80%;
  display: flex;
  align-items: center;
  place-content: space-evenly;
}

.progress-bar-item {
  height: 35px;
  width: 35px;
  border: 3px solid var(--secondary-color);
  border-radius: 20px;
}

#bar {
  background-color: var(--secondary-color);
  transition: 0.5s all ease;
}

#value {
  position: absolute;
  margin-left: 12.5rem;
}

#media img,
#media video {
  width: auto;
  height: auto;
  max-width: 60rem;
  max-height: 40rem;
}

#media {
  display: flex;
  justify-content: center;
  margin-top: 4%;
}

#wrapper-LB {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #000000e6;
  /* padding: 2.5%; */
  position: absolute;
  z-index: 5;
  align-items: center;
}

#wrapper-LB > img {
  width: auto;
  height: auto;
  max-width: 80rem;
  max-height: 55rem;
  padding: 1% 2.5% 0;
}

#question-text-LB {
  color: white;
  text-align: center;
  font-size: 1.5em;
  padding: 1%;
}
</style>
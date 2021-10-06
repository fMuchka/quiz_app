<template>
  <div>
    <div
      class="teams"
      :style="'grid-template-columns: repeat(' + gridColumnCount + ', 1fr)'"
    >
      <div v-for="(item, index) in teams" :key="index">
        <div class="team-label" :style="'color:' + teams[index].color">
          {{ teams[index].label }}
        </div>
        <div>
          {{ teams[index].score.total }}
        </div>
      </div>
    </div>
    <div class="score-table">
      <div
        v-for="(theme, flowIndex) in flow"
        :key="flowIndex"
        class="theme-segment"
        :style="
          'grid-template-columns: 20% repeat(' + gridColumnCount + ', 1fr)'
        "
      >
        <div
          class="q-info"
          :style="
            'grid-template-rows: repeat(' +
            forScoreRender[theme].questions.length +
            ', 1fr)'
          "
        >
          <div class="theme-label">
            {{ themes[theme].text }}
          </div>

          <div
            v-for="(question, qIndex) in themes[theme].questions"
            :key="'q' + qIndex"
            class="question-label"
          >

            {{ questions[question].text }}
          </div>
        </div>

        <div
          v-for="(item, index) in teams"
          :key="index"
          class="point-column"
          :style="
            'grid-template-rows: repeat(' +
            forScoreRender[theme].questions.length +
            ', 1fr)'
          "
        >
          <div
            v-for="(question, qIndex) in forScoreRender[theme].questions"
            :key="'tq' + qIndex"
          >
            {{ teams[index].score.questions[question] }}
          </div>
        </div>

        <div class="total"></div>
        <div
          v-for="(item, index) in teams"
          :key="'total' + index"
          class="total"
        >
          {{ teams[index].score.themes[theme] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreSummaryTable",

  data() {
    return {
      teams: this.$store.getters.teamsSortedByScore,
      questions: this.$store.state.quiz.questions,
      themes: this.$store.state.quiz.themes,
      flow: this.$store.state.quiz.flow,

      forScoreRender: this.$store.getters.themesQWithDummy,
    };
  },

  computed: {
    gridColumnCount() {
      return this.teams.length;
    },

    gridRowCount(theme) {
      return this.forScoreRender[theme].questions.length;
    },
  },
};
</script>

<style>
.theme-segment {
  display: grid;
  margin-bottom: 2%;
}

.q-info {
  display: grid;
  align-items: center;
}

.point-column {
  display: grid;
  text-align: center;
  align-items: center;
  border-left: 3px solid black;
  font-size: 24px;
}

.teams {
  display: grid;
  grid-area: teams;
}

.score-table {
  grid-area: table;
}

.team-label {
  text-align: center;
  font-size: 26px;
  -webkit-text-stroke: 0.5px black;
}

.theme-label {
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid black;
}

.total {
  text-align: center;
  border-top: 1px solid black;
  font-size: 25px;
  font-weight: bold;
}

.teams * {
  text-align: center;
  font-weight: bold;
}

.teams div:last-child {
  font-size: 30px;
}

.point-column * {
  border-bottom: 1px solid black;
  height: 30px;
}

.point-column *:first-child,
.point-column *:last-child {
  border: none;
}

.question-label {
  border-bottom: 1px solid black;
  height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.q-info .question-label:last-child {
  border: none;
}
</style>
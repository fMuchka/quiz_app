<template>
  <div>
    <mini-chart
      id="mini-chart"
      :chartData="chartData"
      :options="chartOptions"
    />

    <div id="wrapper">
      <div id="teams-wrapper">
        <div
          v-for="(item, index) in teams"
          :key="index"
          :style="'color:' + item.color"
        >
          <div class="team-label">
            {{ item.label }}
          </div>
        </div>
      </div>

      <div id="theme-label">
        {{ currentTheme.text }}
      </div>

      <div id="questions">
        <div v-for="q in currentTheme.questions" :key="q">
          <div>{{ questions[q].text }}</div>
        </div>
      </div>

      <div id="input-table">
        <div class="input-column" v-for="(t, tKey) in teams" :key="tKey">
          <div
            class="input-wrapper"
            v-for="(q, qKey) in currentTheme.questions"
            :key="qKey"
          >
            <input
              type="number"
              v-model.number="t.score.questions[q]"
              :step="questions[q].points.increment"
              :max="questions[q].points.max"
              min="0"
            />
          </div>

          <div class="total-team-score" :style="'color:' + t.color">
            {{ getTeamTotal(tKey) }}
          </div>
        </div>
      </div>

      <flow-arrow :isForward="false" :nextPage="'themeanswers'" :qMode="true">
      </flow-arrow>

      <flow-arrow
        v-if="isLastTheme === true"
        :isForward="true"
        :nextPage="'finalresults'"
        :qMode="true"
      >
      </flow-arrow>

      <flow-arrow
        v-else
        :isForward="true"
        :nextPage="'themesoverview'"
        :qMode="true"
      >
      </flow-arrow>
    </div>
  </div>
</template>

<script>
import FlowArrow from "../components/FlowArrow.vue";
import MiniChart from "../components/MiniChart.vue";

export default {
  name: "ScoreBoard",
  components: {
    FlowArrow,
    MiniChart,
  },

  data() {
    return {
      chartOptions: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true, // minimum value will be 0.
              },
            },
          ],
          yAxes: [{}],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  computed: {
    teams() {
      return this.$store.state.teams;
    },

    themes() {
      return this.$store.state.quiz.themes;
    },

    questions() {
      return this.$store.state.quiz.questions;
    },

    currentTheme() {
      return this.$store.getters.currentTheme;
    },

    currentThemeID: {
      set(value) {
        this.$store.commit("setCurrentTheme", value);
      },
      get() {
        return this.$store.state.currentThemeID;
      },
    },

    isLastTheme() {
      return this.$store.getters.isLastTheme;
    },

    chartData() {
      const teams = this.$store.getters.teamsSortedByScore;
      const totalScores = [];
      const colors = [];
      const labels = [];

      teams.forEach((e) => {
        totalScores.push(e.score.total);
        colors.push(e.color);
        labels.push(e.label);
      });

      const data = {
        datasets: [
          {
            data: totalScores,
            label: "",
            backgroundColor: colors,
          },
        ],

        labels: labels,
      };

      return data;
    },
  },

  watch: {
    teams: {
      deep: true,

      handler() {
        for (let i = 0; i < this.teams.length; i++) {
          const score = this.teams[i].score;
          let sum = 0;

          let scoreMap = {};

          for (const q in score.questions) {
            sum += score.questions[q];

            scoreMap[q] = score.questions[q];
          }

          const currentTheme = this.currentTheme; // user has access only to the current visible theme
          let themeSum = 0;

          for (let j = 0; j < currentTheme.questions.length; j++) {
            const themeQ = currentTheme.questions[j];

            themeSum += scoreMap[themeQ];
          }

          score.total = sum;
          score.themes[this.currentThemeID] = themeSum;
        }
      },
    },
  },

  methods: {
    getTeamTotal(teamIndex) {
      const team = this.teams[teamIndex];
      const allQ = team.score.questions;
      const currentQ = this.currentTheme.questions;
      let filteredQ = [];

      for (let i = 0; i < currentQ.length; i++) {
        filteredQ.push(allQ[currentQ[i]]);
      }

      const sum = filteredQ.reduce((a, b) => {
        return a + b;
      });

      return sum;
    },
  },
};
</script>

<style scoped>
#wrapper {
  display: grid;
  grid-template-areas:
    "label teams"
    "questions inputs";
  width: 85%;
  margin: 5rem auto;
  grid-template-columns: 30% 70%;
  position: relative;
}

#mini-chart {
  height: 10rem;
  width: 80%;
  margin: 2.5rem auto;
}

#teams-wrapper {
  grid-area: teams;
  display: flex;
  height: 100px;
}

#teams-wrapper > div {
  font-size: 32px;
  text-align: center;
  width: 100%;
  display: grid;
  align-items: center;
  height: 100px;
}

#theme-label {
  grid-area: label;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 48px;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  font-weight: bold;
  color: black;
  height: 100%;
}

.team-label {
  font-size: initial;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.total-team-score {
  font-size: 36px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-right: 1px solid black;
}

#questions {
  grid-area: questions;
  display: flex;
  flex-direction: column;
  border-right: 1px solid black;
}

#questions > div {
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  display: flex;
  height: 100px;
  text-align: start;
}

#questions > div > div {
  padding: 5px;
}

#input-table {
  display: flex;
  flex-direction: row;
  grid-area: inputs;
}

.input-column {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
}

.input-wrapper {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
}

input[type="number"] {
  width: 75%;
  height: 75%;
  font-size: 40px;
  text-align: center;
  background-color: var(--main-color);
  border: none;
  color: white;
}
</style>
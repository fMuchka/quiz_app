<template>
  <div id="wrapper">
    <div id="buttons-wrapper">
      <div v-for="(item, index) in possibleDisplays" :key="index">
        <label :for="item.id">
          <input
            type="radio"
            :id="item.id"
            name="currentDisplay"
            v-model="currentDisplay"
            :value="item.id"
            @click="stopSlideShow()"
          />
          {{ item.label }}
        </label>
      </div>
    </div>

    <div id="slides-container" v-if="currentDisplay === 'standingsView'">
      <top-three-bar-chart
        id="top-three-bar-chart"
        :chartData="TopThreeBarChartData"
        :options="TopThreeBarChartOptions"
      ></top-three-bar-chart>

      <div id="not-top-three-table">
        <div
          v-for="(team, index) in notTopThreeTeams"
          :key="index"
          class="standings-table-row"
        >
          <div>{{ index + 4 }}.</div>

          <div :style="'color:' + team.color">
            {{ team.label }}
          </div>

          <div>
            {{ team.score.total }}
          </div>
        </div>
      </div>
    </div>

    <div id="slides-container" v-if="currentDisplay === 'chartView'">
      <all-questions-chart
        id="all-questions-chart"
        :chartData="AllQuestionsChartData"
        :options="AllQuestionsChartOptions"
      />
    </div>

    <div id="slides-container" v-if="currentDisplay === 'tableView'">
      <score-summary-table id="score-summary-table" />
    </div>
  </div>
</template>

<script>
import AllQuestionsChart from "../components/AllQuestionsChart.vue";
import ScoreSummaryTable from "../components/ScoreSummaryTable.vue";
import TopThreeBarChart from "../components/TopThreeBarChart.vue";

export default {
  name: "FinalResults",
  components: {
    AllQuestionsChart,
    ScoreSummaryTable,
    TopThreeBarChart,
  },

  data() {
    return {
      sortedTeams: this.$store.getters.teamsSortedByScore,
      currentDisplay: "standingsView",
      possibleDisplays: [
        { id: "standingsView", label: "Výsledky" },
        { id: "chartView", label: "Vývoj v čase" },
        { id: "tableView", label: "Souhrn" },
      ],
      slideShowIntervalId: null,
    };
  },

  computed: {
    notTopThreeTeams() {
      const sortedTeams = this.sortedTeams;

      if (sortedTeams.length < 4) {
        return [];
      } else {
        return sortedTeams.slice(3, sortedTeams.length);
      }
    },

    TopThreeBarChartData() {
      const teams = this.$store.getters.teamsSortedByScore;
      const totalScores = [];
      const colors = [];
      const labels = [];

      // 2nd place
      totalScores.push(teams[1].score.total);
      colors.push(teams[1].color);
      labels.push("2. " + teams[1].label);

      // 1st place
      totalScores.push(teams[0].score.total);
      colors.push(teams[0].color);
      labels.push("1. " + teams[0].label);

      // 3rd place
      totalScores.push(teams[2].score.total);
      colors.push(teams[2].color);
      labels.push("3. " + teams[2].label);

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

    TopThreeBarChartOptions() {
      const options = {
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        hover: {
          animationDuration: 0,
        },

        scales: {
          xAxes: [
            {
              position: "top",
              display: true,
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 24,
                fontStyle: "bold",
                fontColor: "white",
                //suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true, // minimum value will be 0.
              },
            },
          ],
          yAxes: [
            {
              display: false,
              ticks: {
                //suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true, // minimum value will be 0.
              },
            },
          ],
        },
        animation: {
          duration: 0,
          onComplete: function () {
            const ctx = this.chart.ctx;
            ctx.font = Chart.helpers.fontString(
              38,
              "normal",
              Chart.defaults.global.defaultFontFamily
            );

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            this.data.datasets.forEach(function (dataset) {
              for (let i = 0; i < dataset.data.length; i++) {
                const model =
                  dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;

                ctx.strokeStyle = "black";
                ctx.lineWidth = 4;
                ctx.strokeText(dataset.data[i], model.x, model.y + 30);

                ctx.fillStyle = "white";
                ctx.fillText(dataset.data[i], model.x, model.y + 30);
              }
            });
          },
        },

        responsive: true,
        maintainAspectRatio: false,
      };

      return options;
    },

    AllQuestionsChartData() {
      let data = {
        datasets: [],

        labels: [0, ...Object.keys(this.$store.state.quiz.questions)],
      };

      const teams = this.$store.state.teams;

      for (let i = 0; i < teams.length; i++) {
        const questions = teams[i].score.questions;
        const teamColor = teams[i].color;
        const teamLabel = teams[i].label;
        let score = [0];
        let increment = 0;

        for (const key in questions) {
          increment += questions[key];
          score.push(increment);
        }

        data.datasets.push({
          data: score,
          label: teamLabel,
          backgroundColor: teamColor,
          fill: false,
          borderColor: teamColor,
          steppedLine: true,
        });
      }

      return data;
    },

    AllQuestionsChartOptions() {
      const store = this.$store;
      const options = {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              id: "questions",
              display: true,
              ticks: {
                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true, // minimum value will be 0.
                fontSize: 18,

                callback: function (label, index) {
                  if (index !== 0) return "Otázka " + index;
                },
              },
            },
            {
              id: "themes",
              display: true,
              gridLines: {
                display: true,
                offsetGridLines: true,
                lineWidth: 5,
                color: "white",
              },
              ticks: {
                suggestedMin: 0, // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true, // minimum value will be 0.
                fontSize: 24,
                fontStyle: "bold",
                fontColor: "white",

                callback: function (label) {
                  const themes = store.state.quiz.themes;

                  for (const key in themes) {
                    const index = themes[key].questions.indexOf(label);
                    if (index === 0) {
                      return themes[key].text;
                    }
                  }
                },
              },
            },
          ],
          yAxes: [
            {
              position: "right",
              ticks: {
                max: this.$store.getters.quizPointsMaximum,
                fontSize: 18,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,

        tooltips: {
          mode: "index",
          itemSort: function (a, b) {
            return b.value - a.value;
          },

          callbacks: {
            title: function (labelObj) {
              return "Otázka " + labelObj[0].index;
            },
          },
        },
        animation: {
          duration: 0,
        },
      };

      return options;
    },
  },

  created: function () {
    this.startSlideShow();
  },

  methods: {
    startSlideShow() {
      const baseChangeTime = 10000; //miliseconds
      const changeTimeLimit = baseChangeTime * 6;

      let changeTime = baseChangeTime;

      this.slideShowIntervalId = setInterval(() => {
        let newIndex;
        const currentIndex = this.possibleDisplays
          .map((e) => e.id)
          .indexOf(this.currentDisplay);

        if (currentIndex === this.possibleDisplays.length - 1) {
          newIndex = 0;
        } else {
          newIndex = currentIndex + 1;
        }

        this.currentDisplay = this.possibleDisplays[newIndex].id;

        if (changeTime >= changeTimeLimit) {
          changeTime = changeTimeLimit;
        }

        changeTime +=
          (Math.log(changeTimeLimit) / Math.log(changeTime)) * 1000 +
          baseChangeTime;
      }, changeTime);
    },

    stopSlideShow() {
      const intervalId = this.slideShowIntervalId;

      if (intervalId !== null) {
        clearInterval(intervalId);
        this.$set(this, "slideShowIntervalId", null);
      }
    },
  },
};
</script>

<style>
#wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

#slides-container {
  width: 90%;
  height: 100vh;
  display: flex;
  margin: auto;
  flex-direction: column;
}

#all-questions-chart {
  width: 100%;
  height: 85vh;
}

#score-summary-table {
  display: grid;
  grid-template-areas:
    ". teams"
    "table table";
  grid-template-rows: max-content;
  grid-template-columns: 20% 80%;
  width: 100%;
}

#buttons-wrapper {
  display: flex;
  margin: 20px auto 2%;
  width: 80%;
  justify-content: space-evenly;
}

#top-three-bar-chart {
  width: 100%;
  display: flex;
  height: 45vh;
  margin: 0 2%;
  border-bottom: 3px solid black;
}

.standings-table-row {
  display: flex;
  width: 60%;
  place-content: space-between;
  margin: auto auto 15px;
  border-bottom: 1px solid black;
  height: 30px;
}

.standings-table-row div:nth-child(2) {
  margin: 0 auto 0 10px;
}

#not-top-three-table {
  margin-top: 50px;
  font-size: 28px;
}
</style>
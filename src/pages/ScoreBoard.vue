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
          <p>{{item.label}}</p>

          <div
            class="total-team-score"
          >
            {{getTeamTotal(index)}}
          </div>

        </div>
      </div>

      <select 
        id="theme-selector" 
        v-model="currentThemeID"
      >
        <option 
          v-for="(t, key) in themes"
          :key="key"
          :value="key"
        >
        {{t.text}}
        </option>
      </select>
    
      <div
        id="questions"
      >
        <div
          v-for="q in currentTheme.questions"
          :key="q"
        >
          {{questions[q].text}}
        </div>
      </div>

      <div
        id="input-table"
      >
        <div
          class="input-column"
          v-for="(t, tKey) in teams"
          :key="tKey"
        >
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
            >
          </div>
        </div>
        
      </div>

      <flow-arrow
        v-if="isLastTheme === true"
          :isForward="true"
          :nextPage="'finalresults'"
          >
      </flow-arrow>

      <flow-arrow
        v-else
          :isForward="true"
          :nextPage="'themesoverview'"
          >
      </flow-arrow>
    </div>
  </div>
  
</template>

<script>
import FlowArrow from "../components/FlowArrow.vue"
import MiniChart from "../components/MiniChart.vue"

export default {
  name: 'ScoreBoard',
  components:{
    FlowArrow,
    MiniChart
  },

  data(){
    return{
      chartOptions: {
          legend: {
            display: false
          },
          scales: {
              xAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    // OR //
                    beginAtZero: true   // minimum value will be 0.
                }
              }],
              yAxes: [{
                
              }]
          },
          responsive: true,
          maintainAspectRatio: false
      }
    }
  },

  computed:{
    teams(){
      return this.$store.state.teams;
    },

    themes(){
      return this.$store.state.quiz.themes;
    },

    questions(){
      return this.$store.state.quiz.questions;
    },

    currentTheme(){ 
      return this.$store.getters.currentTheme;
    },

    currentThemeID:{
      set(value){
        this.$store.commit("setCurrentTheme", value);
      },
      get(){
        return this.$store.state.currentThemeID;
      }
    },

    isLastTheme(){
      return this.$store.getters.isLastTheme;
    },

    chartData(){
      const data = {
        datasets: [
            {
              data: this.$store.getters.teamTotalScores,
              label: "",
              backgroundColor: this.$store.getters.teamColors
            },   
          ],

          labels: this.$store.getters.teamLabels
      };
      return data;
    }
  },

  watch:{
    teams:{
      deep: true,

      handler(){
        for (let i = 0; i < this.teams.length; i++) {
          const score = this.teams[i].score; 
          let sum = 0;

          for (const q in score.questions) {
            sum += score.questions[q];
          }

          score.total = sum;
        }
      }
    } 
  },

  methods:{
    getTeamTotal(teamIndex){
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
  }
}
</script>

<style scoped>

#wrapper{
    display: grid;
    grid-template-areas:
        "label teams"
        "label teams"
        "questions inputs";
    height: 80%;
    width: 90%;
    margin: auto;
    grid-template-columns: 30% 70%;
    grid-template-rows: 10% 10% 80%;
    position: relative;
    border: 1px solid black;
}

#mini-chart {
    height: 10rem;
    width: 80%;
    margin: auto;
}

#teams-wrapper {
    grid-area: teams;
    display: flex;
}

#teams-wrapper > div {
    font-size: 32px;
    text-align: center;
    height: 100%;
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-rows: 70%;
}

.total-team-score {
    font-size: 36px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 3px solid black;
    border-top: 1px solid black;
}

#theme-selector {
    grid-area: label;
    align-self: center;
    display: flex;
    justify-content: center;
    font-size: 48px;
    height: 100%;
    font-weight: bold;
    border: none;
    text-align-last: center;
    text-decoration: underline;
}

#questions {
    grid-area: questions;
    display: flex;
    flex-direction: column;
    border-right: 1px solid black;
}

#questions > div {
    border-bottom: 1px solid black;
    display: flex;
    height: 20%;
    padding: 10px;
}

#input-table{
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
    height: 20%;
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
}


</style>
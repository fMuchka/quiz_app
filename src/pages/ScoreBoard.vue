<template>
  <div id="wrapper">

    <div
      id="theme-switch"
    >
      
      <div
        v-if="previousThemeLabel === false"
        id="prev-theme"
      >
      </div>
      <div 
        v-else
        id="prev-theme"    
      >
        <p
          @click="previousTheme()"
        >{{previousThemeLabel}}</p>
        <div
          id="arrow-left" 
          @click="previousTheme()"
        >
        </div>
      </div>
      

      <div
        id="current-theme"
        v-if="currentThemeStatic !== currentTheme"
      >
        <p
          @click="returnToCurrentTheme()"
        >{{currentThemeStatic.text}}</p>
      </div>

      <div
        v-if="nextThemeLabel === false"
        id="next-theme"
      >
      </div>
      <div 
        v-else
        id="next-theme"  
      >
        <div
          id="arrow-right" 
          @click="nextTheme()"
        >
        </div>
        <p
          @click="nextTheme()"
        >{{nextThemeLabel}}</p>
      </div>
    </div>

    <div id="teams-wrapper">
      <div
        v-for="(item, index) in teams"
        :key="index"
        :style="'color:' + item.color"
      >
        {{item.label}}

        <div
          class="total-team-score"
        >
          {{getTeamTotal(index)}}
        </div>

      </div>
    </div>

    <div
      id="theme-label"
    >
      {{currentTheme.text}}
    </div>

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
        :isForward="true"
        :nextPage="'themesoverview'"
        >
    </flow-arrow>
  </div>
</template>

<script>
import FlowArrow from "../components/FlowArrow.vue"
export default {
  name: 'ScoreBoard',
  components:{
    FlowArrow
  },

  data(){
    return{
      currentThemeStatic: this.$store.getters.currentTheme,
      currentThemeIDStatic: this.$store.state.currentThemeID
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

    previousThemeLabel(){
      const currentIndex = this.$store.getters.currentThemeIndex;
      const previous = this.$store.state.quiz.flow[currentIndex - 1];

      if (previous === undefined) {
        return false;
      }
      else{
        return this.themes[previous].text;
      }
    },

    nextThemeLabel(){
      const currentIndex = this.$store.getters.currentThemeIndex;
      const previous = this.$store.state.quiz.flow[currentIndex + 1];

      if (previous === undefined) {
        return false;
      }
      else{
        return this.themes[previous].text;
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

    nextTheme(){
      this.$store.dispatch("nextTheme");
    },

    previousTheme(){
      this.$store.dispatch("previousTheme");
    },

    returnToCurrentTheme(){
      this.$store.commit("setCurrentTheme", this.currentThemeIDStatic);
    }
}
}
</script>

<style scoped>

#wrapper{
      display: grid;
    grid-template-areas:
        "switch teams"
        "label teams"
        "questions inputs";
    height: 80%;
    width: 90%;
    margin: auto;
    grid-template-columns: 30% 70%;
    grid-template-rows: 10% 10% 80%;
    top: 5rem;
    position: relative;
}

#theme-switch {
    grid-area: switch;
    display: grid;
    grid-template-areas: "prev current next";
    grid-template-columns: 1fr 1fr 1fr;
}

#teams-wrapper {
    grid-area: teams;
    display: flex;
}

#teams-wrapper > div {
    font-size: 24px;
    text-align: center;
    height: 100%;
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-rows: 40%;
}

.total-team-score {
    font-size: 36px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 3px solid black;
}

#theme-label {
    grid-area: label;
    align-self: center;
    text-align: center;
    font-size: 48px;
    height: 100%;
    font-weight: bold;
    border-bottom: 3px solid black;
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
    align-items: flex-end;
    height: 20%;
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

#arrow-left {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 10px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);

  cursor: pointer;
}

#arrow-right {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 10px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  margin-right: 2em;

  cursor: pointer;
}

#prev-theme {
    display: flex;
    align-content: center;
    height: 100%;
    place-content: space-between;
    align-items: center;
    grid-area: prev;
}

#current-theme {
    grid-area: current;
    display: flex;
    align-items: center;
    place-content: center;
    color: var(--secondary-color);
}

#next-theme {
    display: flex;
    align-content: center;
    height: 100%;
    place-content: space-between;
    align-items: center;
    grid-area: next;
}

#prev-theme > p:hover, #current-theme > p:hover, #next-theme> p:hover {
  text-decoration: underline;
  cursor: pointer;
}

</style>
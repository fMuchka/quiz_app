<template>
  <div>

    <div id="teams-wrapper">
      <div
        v-for="(item, index) in teams"
        :key="index"
        :style="'color:' + item.color"
      >
        {{item.label}}
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
      teams: this.$store.state.teams,
      currentThemeIndex: this.$store.getters.currentThemeIndex,
      themes: this.$store.state.quiz.themes
    }
  }
}
</script>

<style scoped>

</style>
<template>
    <div
        id="wrapper"
    >
    <img
      id="logo"
      src="/src/assets/sviniPivemNezarmoutis_logo.png"
      alt="nope"
    />

        <div 
            id="top-three"
        >
            <div 
                id="first"
            >
            1. <div 
                    :style="'color:' + sortedTeams[0].color"
                >
                {{sortedTeams[0].label}}
                </div>
            </div>

            <div 
                id="second"
            >
            2. <div 
                    :style="'color:' + sortedTeams[1].color"
                >
                {{sortedTeams[1].label}}
                </div>
            </div>

            <div 
                id="third"
            >
            3. <div 
                    :style="'color:' + sortedTeams[2].color"
                >
                {{sortedTeams[2].label}}
                </div>
            </div>

        </div>

        <all-questions-chart 
            id="all-questions-chart"
        />

        <div
            id="buttons-wrapper"
        >
            <input type="radio" id="allQuestions" name="currentDisplay" v-model="currentDisplay" value="allQuestions">
            <label for="allQuestions">
                Skóre podle otázek
            </label>

            <input type="radio" id="allThemes" name="currentDisplay" v-model="currentDisplay" value="allThemes">
            <label for="allThemes">
                Skóre podle témat
            </label>
        </div>
    </div>
</template>

<script>
import AllQuestionsChart from "../components/AllQuestionsChart.vue"


export default {
    name: "FinalResults",
    components:{
        AllQuestionsChart
    },

    data(){
        return{
            sortedTeams: this.$store.getters.teamsSortedByScore,
            currentDisplay: 'allQuestions'
        }
    },

    computed:{
    
    }
}
</script>

<style>

</style>
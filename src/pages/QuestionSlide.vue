<template>
  <div id="wrapper">
    <div id="top-area">
        <div id="theme-label">
            {{themeLabel}}
        </div>
        <div id="q-identity">
            {{questionIdentity}}
        </div>
        <div id="points-info">
            {{pointsInfo}}
        </div>
        <div id="theme-progress-bar">
            <div 
                id="bar"
                :style=progressBar
                >            
            </div>
            <div
                id="value">
                {{progressInfo}}
            </div>
        </div>
    </div>
    <div id="split-line"></div>
    <div id="bottom-area">
        <div id="question-text">
            {{questionText}}
        </div>

        <div id="media">
            <img alt="Ops Something went wrong" :src=mediaPath>
        </div>
    </div>  

    <flow-arrow 
            :isForward="false"
            >
        </flow-arrow>
        <flow-arrow
            :isForward="true"
            >
        </flow-arrow>
  </div>
</template>

<script>
import flowArrow from "../components/FlowArrow.vue"

export default {
    components: {
        flowArrow
    },

    data(){
        return{
        }
    },

    computed:{
        themeLabel(){
            return this.$store.getters.currentTheme.title;
        },
        questionIdentity(){
            return `Otázka č.${this.$store.getters.currentQuestionIndex+1}`;
        },
        pointsInfo(){
            const {points, step} = {points: this.$store.getters.currentQuestion.points, step: this.$store.getters.currentQuestion.step};
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
            
            return [firstPart, secondPart].join(', ');
        },
        progressInfo(){
            return this.$store.getters.currentQuestionIndex/(this.$store.getters.currentTheme.question.length-1)*100 + "%";
        },
        progressBar(){
            return `width: ${this.$store.getters.currentQuestionIndex/(this.$store.getters.currentTheme.question.length-1)*100}%`;
        },
        questionText(){
            return this.$store.getters.currentQuestion.text;
        },
        mediaPath(){
            return this.$store.getters.currentQuestion.media;
        }
    }
}
</script>

<style scoped>
div#wrapper {
    display: grid;
    grid-template-rows: 10% 1% 89%;
    height: 100%;
}

div#split-line {
    width: 100%;
    border-bottom: 5px solid #F77F00;
    height: 1px;
}

div#bottom-area {
    font-size: 40px;
    padding: 2%;
}

div#question-text {
    text-align: center;
}

div#top-area {
    display: grid;
    grid-template-areas:
        ". q-identity ."
        "theme-label points-info theme-progress-bar";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
}

div#theme-label {
    grid-area: theme-label;
    font-size: 32px;
    }

div#q-identity {
    grid-area: q-identity;
    font-size: 32px;
    text-decoration: underline;
    align-self: end;
}

div#points-info {
    grid-area: points-info;
    font-size: 28px;
    align-self: start;
}

#theme-progress-bar {
    grid-area: theme-progress-bar;
    height: 40%;
    width: 25vw;
    border: 1px solid black;
    display: flex;
    background-color: white;
}

#bar{
    background-color: var(--secondary-color);
}

#remainder{
    background-color: white;
}

#value{
    position: absolute;
    margin-left: 12.5rem;
}
</style>
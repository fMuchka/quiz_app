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
            {{pointsInfoText}}
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

        <div id="media"
            v-if="this.mediaType === 'audio'"
        >
            <audio controls alt="Not the file you're looking for..." :src="mediaPath"/>
        </div>

        <div id="media"
            v-if="this.mediaType === 'video'"
        >
            <video controls alt="Not the file you're looking for..." :src="mediaPath"/>
        </div>

        <div id="media"
            v-if="this.mediaType === 'image'"
        >
            <img alt="Not the file you're looking for..." :src="mediaPath"/>
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
            return this.$store.getters.currentTheme.text;
        },
        questionIdentity(){
            return `Otázka č.${this.$store.getters.currentQuestionIndex+1}`;
        },
        pointsInfo(){
            const points = this.$store.getters.currentQuestion.points.max;
            const step = this.$store.getters.currentQuestion.points.increment; 

            return {points: points, step: step};
        },
        pointsInfoText(){
            const {points, step} = this.pointsInfo;
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
            return this.$store.getters.currentQuestionIndex/(this.$store.getters.currentTheme.questions.length-1)*100 + "%";
        },
        progressBar(){
            return `width: ${this.$store.getters.currentQuestionIndex/(this.$store.getters.currentTheme.questions.length-1)*100}%`;
        },
        questionText(){
            return this.$store.getters.currentQuestion.text;
        },

        mediaPath(){
            const pointer = this.$store.getters.currentQuestion.media;
            
            if(this.$store.getters.quiz.mediaFiles[pointer] === undefined){
                return "";
            }

            const { src } = this.$store.getters.quiz.mediaFiles[pointer];
        
            return src;
        },

        mediaType(){
            const pointer = this.$store.getters.currentQuestion.media;

            if(this.$store.getters.quiz.mediaFiles[pointer] === undefined){
                return "";
            }

            const { type } = this.$store.getters.quiz.mediaFiles[pointer];

            return type.split("/")[0];
        }
    }
}
</script>

<style scoped>
#wrapper {
    display: grid;
    grid-template-rows: 10% 1% 89%;
    height: 100%;
}

#split-line {
    width: 100%;
    border-bottom: 5px solid #F77F00;
    height: 1px;
}

#bottom-area {
    font-size: 40px;
    padding: 2%;
}

#question-text {
    text-align: center;
}

#top-area {
    display: grid;
    grid-template-areas:
        ". q-identity ."
        "theme-label points-info theme-progress-bar";
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
}

#theme-label {
    grid-area: theme-label;
    font-size: 32px;
    }

#q-identity {
    grid-area: q-identity;
    font-size: 32px;
    text-decoration: underline;
    align-self: end;
}

#points-info {
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
    transition: 0.5s all ease;
}

#value{
    position: absolute;
    margin-left: 12.5rem;
}

#media * {
    width: 50%;
}

#media {
    display: flex;
    justify-content: center;
    margin-top: 4%;
}
</style>
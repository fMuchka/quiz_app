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
            <div 
                id="remainder"
                :style=barRemainder
            >
            </div>
        </div>
    </div>
    <div id="split-line"></div>
    <div id="bottom-area">
        <div id="question-text">
            {{questionText}}
        </div>
    </div>  
  </div>
</template>

<script>
export default {
    data(){
        return{
            d_questionText: this.$store.getters.currentQuestion.text,
            d_themeLabel: this.$store.getters.currentTheme.title,
            d_questionIdentity: this.$store.getters.currentQuestionIndex+1,
            d_pointsInfo: {points: this.$store.getters.currentQuestion.points, step: this.$store.getters.currentQuestion.step},
            d_progressInfo: this.$store.getters.currentQuestionIndex/(this.$store.getters.currentTheme.question.length-1)*100,
            maxBarSize: 0
        }
    },

    computed:{
        themeLabel(){
            return this.d_themeLabel;
        },
        questionIdentity(){
            return `Otázka č.${this.d_questionIdentity}`;
        },
        pointsInfo(){
            //const {points, step} = this.d_pointsInfo;
            const points = this.d_pointsInfo.points;
            const step = this.d_pointsInfo.step;
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
            return this.d_progressInfo + "%";
        },
        progressBar(){
            const barSize = this.barSize;
            return `width: ${barSize}px`;
        },
        barRemainder(){
            const remainderSize = this.remainderSize;
            return `width: ${remainderSize}px`;
        },
        questionText(){
            return this.d_questionText;
        },
        barSize(){
            return this.maxBarSize * (this.d_progressInfo/100);
        },
        remainderSize(){
            return this.maxBarSize - this.barSize;
        }
    },
    mounted(){
        this.$nextTick(function(){
            const progressBarEl = document.getElementById("theme-progress-bar");
            const maxBarSize = progressBarEl.offsetWidth;
            this.maxBarSize = maxBarSize;
        })
    }
}
</script>

<style scoped>
div#wrapper {
    display: grid;
    grid-template-rows: 25% 5% 70%;
    height: 100%;
}

div#split-line {
    width: 100%;
    border-bottom: 5px solid #F77F00;
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
    font-size: 40px;
    }

div#q-identity {
    grid-area: q-identity;
    font-size: 40px;
    text-decoration: underline;
    align-self: end;
}

div#points-info {
    grid-area: points-info;
    font-size: 36px;
    align-self: start;
}

div#theme-progress-bar {
    grid-area: theme-progress-bar;
    height: 40%;
    width: 25vw;
    border: 1px solid black;
    display: flex;
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
    font-size: 40px;
}
</style>
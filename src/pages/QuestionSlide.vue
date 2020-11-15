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
                {{progressInfo}}              
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
            d_questionText: "Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
            d_themeLabel: "Téma",
            d_questionIdentity: "Otázka č.XX",
            d_pointsInfo: {points: 3, step: 2},
            d_progressInfo: 50
        }
    },

    computed:{
        themeLabel(){
            return this.d_themeLabel;
        },
        questionIdentity(){
            return this.d_questionIdentity;
        },
        pointsInfo(){
            const {points, step} = this.d_pointsInfo;
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
                    secondPart = `po ${step} bodu.`;
                    break;
                default:
                    secondPart = `po ${step} bodech.`;
                    break;
            }

            // both values are same, no need for the second part
            if (points === step) {
                return firstPart + ".";
            }
            
            return [firstPart, secondPart].join(', ');
        },
        progressInfo(){
            return this.d_progressInfo + "%";
        },
        progressBar(){
            return "width:" +  this.progressInfo;
        },
        questionText(){
            return this.d_questionText
        }
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

div#top-area {
    display: grid;
    grid-template-areas:
        ". q-identity ."
        "theme-label points-info theme-progress-bar";
    grid-template-rows: 1fr 1fr;
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
    font-size: 40px;
    width: 80%;
    border: 1px solid black;
}

#bar{
    background-color: var(--secondary-color);
}
</style>
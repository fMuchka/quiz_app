<template>
    <div
        id="wrapper"
    >
        <div 
            id="top-three"
        >
            <div 
                id="first"
                class="placement"
            >
            1. <div 
                    :style="'color:' + sortedTeams[0].color"
                >
                {{sortedTeams[0].label}}
                </div>
            </div>

            <div 
                id="second"
                class="placement"
            >
            2. <div 
                    :style="'color:' + sortedTeams[1].color"
                >
                {{sortedTeams[1].label}}
                </div>
            </div>

            <div 
                id="third"
                class="placement"
            >
            3. <div 
                    :style="'color:' + sortedTeams[2].color"
                >
                {{sortedTeams[2].label}}
                </div>
            </div>

        </div>

        <div
            id="buttons-wrapper"
        >
            <div
                v-for="(item, index) in possibleDisplays"
                :key="index"
            >
                <input 
                    type="radio"
                    :id="item.id"
                    name="currentDisplay" 
                    v-model="currentDisplay" 
                    :value="item.id"
                >
                <label for="allQuestions">
                    {{item.label}}
                </label>
            </div>
        </div>

        <div 
            id="slides-container"
            v-if="currentDisplay === 'chartView'"    
        > 
            <all-questions-chart 
                id="all-questions-chart"
            />
        </div>

        <div 
            id="slides-container"
            v-if="currentDisplay === 'tableView'"    
        > 
            <score-summary-table
                id="score-summary-table"
            />
        </div>
    </div>
</template>

<script>
import AllQuestionsChart from "../components/AllQuestionsChart.vue"
import ScoreSummaryTable from "../components/ScoreSummaryTable.vue"


export default {
    name: "FinalResults",
    components:{
        AllQuestionsChart,
        ScoreSummaryTable
    },

    data(){
        return{
            sortedTeams: this.$store.getters.teamsSortedByScore,
            currentDisplay: 'chartView',
            possibleDisplays: [{ id: "chartView", label: "Grafický přehled"}, { id: "tableView", label: "Tabulkový přehled"}]
        }
    },

    computed:{
    
    },

    created: function() {
                 this.startSlideShow();
            },

    methods:{
        startSlideShow(){
            const changeTime = 10000; //miliseconds
            const currentIndex = this.possibleDisplays.map(e => e.id).indexOf(this.currentDisplay);

            setTimeout(() => {
                let newIndex;

                if (currentIndex === this.possibleDisplays.length - 1) {
                    newIndex = 0;
                }else{
                    newIndex = currentIndex + 1;
                }

                this.currentDisplay = this.possibleDisplays[newIndex].id;

                //this.startSlideShow();
            }, changeTime);
        }
    }
}
</script>

<style>
#wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
}

#first {
    grid-area: first;
    font-size: 40px;
}

#second {
    grid-area: second;
    border-right: 3px solid black;
}

#third {
    grid-area: third;
    border-left: 3px solid black;
}

#top-three {
    display: grid;
    align-self: center;
    margin: 5%;
    width: 70%;
    grid-template-areas:
        ". first ."
        "second . third";
    justify-items: center;
}

.placement {
     display: flex;
     width: 100%;
     font-size: 30px;
     place-content: center;
     border-bottom: 3px solid black;
     padding: 0 2%;
}

#slides-container {
    width: 90%;
    height: 65%;
    display: flex;
    margin: 0 5%;
}

#all-questions-chart {
    width: 100%;
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


.placement::before {
    content: " ";
    width: 20px;
    height: 20px;
    border-radius: 15px;
    background-color: red;
    display: flex;
    align-self: center;
    margin: 0 2%;
}

#first::before {
    background-color: #FFD700;
}

#second::before {
    background-color: #C0C0C0;
}

#third::before {
    background-color: #cd7f32;
}

#buttons-wrapper {
    display: flex;
    margin: 0 auto 2%;
    width: 80%;
    justify-content: space-evenly;
}

</style>
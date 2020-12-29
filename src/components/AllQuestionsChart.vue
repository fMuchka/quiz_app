<script>
import { Line, mixins } from 'vue-chartjs'

export default {
    extends: Line,
    name: "AllQuestionsChart",
    mixins: [mixins.reactiveProp],
    computed:{
        chartData(){
            let data = {
                datasets: [
    
                ],

                labels: [0, ...Object.keys(this.$store.state.quiz.questions)]
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

                data.datasets.push(
                    {
                        data: score,
                        label: teamLabel,
                        backgroundColor: teamColor,
                        fill: false,
                        borderColor: teamColor,
                        //steppedLine: true
                    }
                )
            }

            
            return data;
        },
        chartOptions() {
            const store = this.$store;
            const options = {
                legend: {
                    display: true
                },
                scales: {
                    xAxes: [
                        {
                            id: "questions",
                            display: true,
                            ticks: {
                                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                // OR //
                                beginAtZero: true,   // minimum value will be 0.

                                callback: function(label, index){
                                    if (index !== 0 ) return "Otázka " + index;
                                }
                            }
                        },
                        {
                            id: "themes",
                            display: true,
                            gridLines: {
                                display: true,
                                offsetGridLines: true,
                                lineWidth: 5,
                                color: "black"
                            },
                            ticks: {
                                
                                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                                // OR //
                                beginAtZero: true,   // minimum value will be 0.
                                fontSize: 24,
                                fontStyle: "bold",
                                fontColor: "black",

                                callback: function(label){
                                    const themes = store.state.quiz.themes;

                                    for (const key in themes) {
                                        const index = themes[key].questions.indexOf(label);
                                        if (index === 0) {
                                            return themes[key].text;
                                        }
                                    }
                                }
                            }
                        }
                    ],
                    yAxes: [{
                        position: "right",
                        ticks:{
                            max: this.$store.getters.quizPointsMaximum
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,

                tooltips: {
                    mode: "index",
                    itemSort: function(a, b){
                        
                        return b.value - a.value;
                    },

                    callbacks: {
                        title: function(labelObj) {
                            return  "Otázka " + labelObj[0].index;
                        }
                    }

                }
            };
            
        return options;
      }
    },

    mounted () {
        this.renderChart(this.chartData, this.chartOptions)
    }
}
</script>

<style>

</style>
<template>
  <div 
    id="background"
    :class="arrowStyle"
    @click="move()"
    >
      <div
        id="arrow"
        >
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            isForward: this.$attrs.isForward
        };
    },

    computed:{
        arrowStyle(){
            if (this.isForward === true) {
                return "right";
            }
            else{
                return "left";
            }
        }
    },

    methods:{
        move(){
            const nextPage = this.$attrs.nextPage;
            
            if(nextPage !== undefined){
                this.$router.push({   
                        name: nextPage  
                    });
            }
            else{

                const questionIndex = this.$store.getters.currentQuestionIndex;
                const nOfQuestions = this.$store.getters.currentTheme.questions.length;

                if (this.isForward) {
                    if (questionIndex === (nOfQuestions - 1)) {
                        this.$router.push({   
                            name: 'themeanswers'  
                        });
                    }
                    else{
                        this.$store.dispatch('nextQuestion');
                    }
                    
                }
                else{
                    if (questionIndex === 0) {
                        this.$router.push({   
                            name: 'themesoverview'  
                        });
                    }
                    else{
                        this.$store.dispatch('previousQuestion');
                    }       
                }
            }   
        }
    }
}
</script>

<style>
    #arrow{
        width: 0;
        height: 0;
        display: flex;
        position: absolute;
        top: 12%;
    }

    .left > #arrow{
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-right: 40px solid var(--secondary-color);
        right: 5px;
    }

    .right > #arrow{
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent; 
        border-left: 40px solid var(--secondary-color); 
        left: 5px;
    }

    #background{
        position: fixed;
        top: 50%;
        width: 50px;
        height: 50px;
        background-color: grey;
        cursor: pointer;
        transition: 0.5s ease all;
    }

    #background:hover{
        background-color: var(--main-color);
    }

    #background.right:hover > #arrow{
        border-left-color: 003049;
    }

    #background.left:hover > #arrow{
        border-right-color: 003049;
    }

    #background.right{
        right: 0; 
        border-radius: 5px 0 0 5px;
    }

    #background.left{
        left: 0;
        border-radius: 0 5px 5px 0;
    }
</style>
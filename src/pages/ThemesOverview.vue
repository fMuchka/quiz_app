<template>
    <div id="overviewWrapper">
        <div v-for="(item, index) in themes" 
            :key="index"
        >
        <button  
            class="themeButton"
            @click="openFirstQuestion(index)"
            :style="completedThemeStyle(index)"
        >
            {{ item.text }}  
        </button>

        <button
            class="answersButton"
            @click="openThemeAnswers(index)"
            :disabled="!isThemeCompleted(index)"
        >
            Odpovědi
        </button>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            themes: this.$store.getters.quiz.themes
        }
    },

    methods: {
        openFirstQuestion(index){
            // go to first question of selected theme
            this.$store.commit("setCurrentTheme", index);
            this.$store.commit("firstQuestion");
            
            this.$router.push({   
                        name: 'questionslide'  
            });
        },

        openThemeAnswers(index){
            this.$store.commit("setCurrentTheme", index);
            
            this.$router.push({   
                        name: 'themeanswers'  
            });
        },

        completedThemeStyle(index){
            const completedThemes = this.$store.state.completedThemes;
            
            if (completedThemes[index] === true) {
               return "background-color: green;"; 
            }

            return "";
        },

        isThemeCompleted(index){
            const completedThemes = this.$store.state.completedThemes;
            
            if (completedThemes[index] === true) {
               return true; 
            }

            return false;
        }
    }
}
</script>

<style>
#overviewWrapper {
    display: flex;
    flex-flow: wrap;
    height: 100%;
    width: 80%;
    margin: auto;
    flex-direction: column;
    overflow-y: auto;
}

.themeButton {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    width: 40%;
    height: 160px;
    font-size: 64px;
    margin: auto;
}

.themeButton:hover {
    cursor: pointer;
    color: 003049;
}

#overviewWrapper div {
    display: flex;
    flex-direction: column;
    margin: 50px 0;
}

.answersButton {
    width: 40%;
    display: flex;
    margin: auto;
    justify-content: center;
    height: 50px;
    align-items: center;
    cursor: pointer;
}
</style>
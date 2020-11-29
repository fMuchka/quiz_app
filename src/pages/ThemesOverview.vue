<template>
    <div id="overviewWrapper">
        <button v-for="(item, index) in themes" 
            :key="index"
            @click="openFirstQuestion(index)"
            >
            {{ item.title }}  
        </button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            themes: this.$store.getters.quiz.theme
        }
    },

    methods:{
        openFirstQuestion(index){
            // go to first question of selected theme
            this.$store.commit("setCurrentQuestionIndex", 0);
            this.$store.commit("setCurrentThemeIndex", index);
            this.$router.push({   
                        name: 'questionslide'  
            });
        }
    }
}
</script>

<style>
#overviewWrapper {
    display: grid;
    place-items: center;
    align-items: center;
    height: 100%;
    width: 60%;
    margin: auto;
}

#overviewWrapper > button {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    width: 90%;
    font-size: 64px;
}

#overviewWrapper > button:hover {
    cursor: pointer;
    color: 003049;
}
</style>
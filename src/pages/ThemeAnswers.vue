<template>
  <div>
      <p id="theme-label">
          {{ themeLabel }}
      </p>
    <div id="table">
        <div class="row headers">
            <div>
                #
            </div>
            <div>
                Otázka
            </div>
            <div>
                Odpověď
            </div>
      </div>
        <div v-for="(item, index) in questions"
            :key="index"
            class="row"
        >
            <div>
                {{ index+1 }}
            </div> 

            <div>
                {{ item.text }}
            </div>

            <div>
                {{ item.answer }}
            </div>
        </div>
    </div>

    <flow-arrow
        :isForward="true"
        :nextPage="'scoreboard'"
        >
    </flow-arrow>
  </div>
</template>

<script>
import FlowArrow from "../components/FlowArrow.vue"
export default {
    components:{
        FlowArrow
    },
    
    data(){
        return{
            questions: this.$store.getters.currentTheme.question,
            themeLabel: this.$store.getters.currentTheme.title
        }
    }
}
</script>

<style scoped>
.row {
    display: grid;
    grid-template-columns: 5% 50% 45%;
    border-bottom: 1px solid black;
    text-align: center;
    margin: 2% 0px;
}

#table {
    display: flex;
    margin: auto;
    width: 80%;
    flex-direction: column;
    font-size: 20px;
    border-top: 5px solid var(--secondary-color);
}


.headers {
    font-weight: bold;
    font-size: 32px;
    border: none;
}

#theme-label {
    text-align: center;
    padding-top: 5%;
    font-weight: bold;
    font-size: 40px;
}

.row > div {
    align-self: self-end;
}
</style>
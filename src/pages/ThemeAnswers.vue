<template>
  <div>
      <p id="theme-label">
          {{ themeLabel }}
      </p>
    <div id="table">
        <div class="row headers">
            <p>
                #
            </p>
            <p>
                Otázka
            </p>
            <p>
                Odpověď
            </p>
      </div>
        <div v-for="(item, index) in questions"
            :key="index"
            class="row"
        >
            <p>
                0{{ index+1 }}
            </p> 

            <p>
                {{ item.text }}
            </p>

            <p>
                {{ item.answer }}
            </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            questions: this.$store.getters.currentTheme.question,
            themeLabel: this.$store.getters.currentTheme.title
        }
    }
}
</script>

<style>
.row {
    display: grid;
    grid-template-columns: 5% 50% 45%;
    border-bottom: 1px solid black;
    text-align: center;
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

</style>
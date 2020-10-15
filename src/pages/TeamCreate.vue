<template>
  <div>
    <button
      id="addButton"
      v-on:click="addNewTeam"
    >
    </button>

    <team-create-input
      v-for="(item, index) in teamList"
      :item="item"
      :key="item.id"
      :index="index"
    />
  </div>
</template>

<script>
import TeamCreateInput from "../components/TeamCreateInput.vue";

export default {
  components: {
    TeamCreateInput
  },

  data() {
    return{
      nextTeamId: 1,
      teamList: [
        
      ] 
    }
  },

  computed: {

  },
  
  methods: {
    addNewTeam(){
      this.teamList.push({
        id: this.nextTeamId++,
        name: '',
        color: ''
      })
    }
  }
};
</script>
<style scoped>
#addButton{
    width:50px;
    height:50px;
    display:inline-block;

    background:
    linear-gradient(#000,#000) top left,
    linear-gradient(#000,#000) top right,
    linear-gradient(#000,#000) bottom left,
    linear-gradient(#000,#000) bottom right;
    background-size: calc(50% - 1px) calc(50% - 1px); /*thickness = 2px (2*1px) */
    background-repeat:no-repeat;
    border:10px solid #000; /*length = 30px (50px - 2x10px) */
    box-sizing:border-box;
    border-radius: 50%;
}
#addButton:hover{
    cursor: pointer;
}
</style>

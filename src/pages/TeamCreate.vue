<template>
  <div>
    <button id="addButton" v-on:click="addNewTeam"></button>

    <team-create-input
      v-for="(team, index) in teamList"
      :team="teamList[index]"
      :key="team.id"
      :index="index"
      @remove="teamList.splice(index, 1)"
    />
  </div>
</template>

<script>
import TeamCreateInput from "../components/TeamCreateInput.vue";

export default {
  components: {
    TeamCreateInput,
  },

  data() {
    return {
      nextTeamId: 1,
      teamList: [],
    };
  },

  computed: {},

  methods: {
    addNewTeam() {
      const freeIndex = this.$store.getters.nextColorIndex;
      const colorListLength = this.$store.getters.colorListLength;
      if (freeIndex < colorListLength) {
        this.teamList.push({
          id: this.nextTeamId++,
          label: "",
          color: this.$store.getters.color,
        });

        this.$store.commit("incrementColorIndex");
        this.$store.commit("changeColorStatus", {
          index: freeIndex,
          status: true,
        });
      }
    },
  },
};
</script>
<style scoped>
#addButton {
  width: 50px;
  height: 50px;
  display: inline-block;

  background: linear-gradient(#000, #000) top left,
    linear-gradient(#000, #000) top right,
    linear-gradient(#000, #000) bottom left,
    linear-gradient(#000, #000) bottom right;
  background-size: calc(50% - 1px) calc(50% - 1px); /*thickness = 2px (2*1px) */
  background-repeat: no-repeat;
  border: 10px solid #000; /*length = 30px (50px - 2x10px) */
  box-sizing: border-box;
  border-radius: 50%;
}
#addButton:hover {
  cursor: pointer;
}
</style>

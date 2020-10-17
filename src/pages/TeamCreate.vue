<template>
  <div>
    <team-create-input
      v-for="(team, index) in teamList"
      :team="teamList[index]"
      :key="team.id"
      :index="index"
      @remove="removeTeamInput(index, team.color.id)"
    />

    <button
      id="addButton"
      v-on:click="addTeamInput"
      :disabled="isAddDisabled"
    ></button>
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
      nextTeamId: 0,
      teamList: [],
    };
  },

  computed: {
    isAddDisabled: function () {
      const freeIndex = this.$store.getters.nextColorIndex;

      if (freeIndex === false) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    addTeamInput() {
      const color = this.$store.getters.color;

      this.teamList.push({
        id: this.nextTeamId++,
        color: color,
      });

      this.$store.commit("changeColorStatus", {
        id: color.id,
        status: true,
      });
    },
    removeTeamInput(index, colorId) {
      this.teamList.splice(index, 1);

      this.$store.commit("changeColorStatus", {
        id: colorId,
        status: false,
      });
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

#addButton:disabled {
  display: none;
}
</style>

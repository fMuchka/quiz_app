<template>
  <div id="pageWrapper">
    <label for="addButton">Přidat tým</label>
    <button id="addButton" @click="addTeamInput()" :disabled="isAddDisabled">
      +
    </button>
    <team-create-input
      v-for="(team, index) in teamList"
      :key="team.id"
      :team="teamList[index]"
      :index="index"
      @remove="removeTeamInput(index, team.color.id)"
    />

    <flow-arrow
        :isForward="true"
        :nextPage="'themesoverview'"
        >
    </flow-arrow>
  </div>
</template>

<script>
import TeamCreateInput from "../components/TeamCreateInput.vue";
import FlowArrow from "../components/FlowArrow.vue";

export default {
  components: {
    TeamCreateInput,
    FlowArrow
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
#pageWrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}

label[for="addButton"] {
  font-size: 20px;
  margin-bottom: 0.5rem;
  user-select: none;
  font-weight: bold;
}

#addButton {
  width: 50px;
  height: 50px;
  display: inline-block;
  font-size: xx-large;
  color: var(--main-color);
  background-color: var(--secondary-color);
  border-radius: 50%;
  border: none;
  outline: none;
  user-select: none;

  margin-bottom: 2.5rem;
}
#addButton:hover,
label[for="addButton"] {
  cursor: pointer;
  color: 003049;
}

#addButton:disabled {
  cursor: not-allowed;
  background-color: #e00000;
}
</style>

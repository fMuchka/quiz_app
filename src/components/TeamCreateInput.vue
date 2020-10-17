<template>
  <div class="input-wrapper">
    <label for="team-input" :style="textColor"> {{ color.label }} tým </label>

    <input
      name="team-input"
      v-model="label"
      :readonly="isInputDisabled"
      type="text"
    />

    <button name="confirm-button" v-on:click="confirmTeam">✓</button>

    <button name="delete-button" v-on:click="$emit('remove')">✗</button>
  </div>
</template>

<script>
export default {
  name: "TeamCreateInput",

  data() {
    return {
      label: this.$props.team.label,
      isInputDisabled: false,
    };
  },

  computed: {
    color: {
      get() {
        return this.$props.team.color;
      },

      set() {},
    },
    textColor() {
      return "color:" + this.$props.team.color.id;
    },
  },
  props: {
    index: Number,
    team: Object,
  },

  methods: {
    confirmTeam() {
      const buttons = [
        this.$el.children[this.$el.children.length - 1],
        this.$el.children[this.$el.children.length - 2],
      ];

      buttons.forEach((el) => {
        el.remove();
      });

      const team = {
        label: this.label,
        color: this.color.id,
      };

      this.$store.commit("pushTeam", team);
      this.isInputDisabled = true;
    },
  },
};
</script>

<style>
.input-wrapper {
  display: grid;
  grid-template-columns: 200px 250px 60px 60px;
  align-items: center;
  margin-bottom: 0.5rem;
}

.input-wrapper * {
  display: grid;
  font-size: 30px;
}

#pageWrapper * button[name="confirm-button"] {
  margin: 0 0px 0 10px;
}

#pageWrapper * button {
  margin: 0 5px;
}

button[name="confirm-button"] {
  background-color: var(--secondary-color);
  color: var(--main-color);
  border: none;
}

button[name="confirm-button"]:hover,
button[name="delete-button"]:hover {
  cursor: pointer;
  color: 003049;
}

button[name="delete-button"] {
  background-color: #e00000;
  color: var(--main-color);
  border: none;
}
</style>
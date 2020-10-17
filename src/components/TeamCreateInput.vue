<template>
  <div class="input-wrapper">
    <label for="team-input"> {{ color.label }} tým: </label>

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
  display: flex;
}
</style>
<template>
  <div class="input-wrapper">
    <label for="team-input"> Team {{ color.label }}: </label>

    <input name="team-input" v-model="label" type="text" />

    <button name="confirm-button" v-on:click="confirmTeam">CONFIRM</button>

    <button name="delete-button" v-on:click="$emit('remove')">DELETE</button>
  </div>
</template>

<script>
export default {
  name: "TeamCreateInput",
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

  data() {
    return {
      label: this.$props.team.label,
    };
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
    },
  },
};
</script>

<style>
.input-wrapper {
  display: flex;
}
</style>
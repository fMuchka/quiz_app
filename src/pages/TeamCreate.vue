<template>
  <div ref="wrapper">
    <h2>Add teams</h2>
    <team-create-input
      v-on:new-team="createNewInput"
    />
  </div>
</template>

<script>
import TeamCreateInput from "../components/TeamCreateInput.vue";
import Vue from "vue/dist/vue.js";

export default {
  components: {
    TeamCreateInput
  },

  computed: {

  },
  methods: {
      createNewInput(){
        const TeamCreateInputClass = Vue.extend(TeamCreateInput);
        const newInput = new TeamCreateInputClass();
        newInput.$mount();
        
        this.$refs.wrapper.appendChild(newInput.$el);
      }
  }
};
</script>
<style scoped>

</style>

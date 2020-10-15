<template>
  <div 
    class="input-wrapper"
    >
      <label
        for="team-input">

       Team {{ teamColor }}: 
      
       </label>

      <input 
        name="team-input"
        type="text"
        />

        <button
          name="confirm-button"
        >
          CONFIRM
        </button>

        <button
          name="delete-button"
        >
          DELETE
        </button>
  </div>
</template>

<script>
export default {
  name: 'TeamCreateInput',
  computed: {
      teamColor: {
          get() {
              return 'PLACEHOLDER';
          },

          set(){
            
          }
      }
  },

  methods: {
      
  }
}
</script>

<style>
.input-wrapper{
    display: flex;
} 
</style>
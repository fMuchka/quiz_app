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

      <div 
        class="plus"
        v-on:click="emitNewTeam"
      />
  </div>
</template>

<script>
export default {
    computed: {
        teamColor: {
            get() {
                return 'PLACEHOLDER';
            }
        }
    },
    methods: {
        emitNewTeam(){
           this.$emit('new-team');
        }
    }
}
</script>

<style>
.input-wrapper{
    display: flex;
} 
.plus{
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
.plus:hover{
    cursor: pointer;
}
</style>
<template>
  <div>
      <input id="menu-icon" @click="changeVisibility()" type="checkbox">
      <label for="menu-icon">
        <div></div>
        <div></div>
        <div></div>
      </label>
      

      <div id="menu" :style="menuStyle">
        <!-- use router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
        <router-link to="/fileload">Otevřít kvíz</router-link>
        <router-link to="/teamcreate">Tvorba týmů</router-link>
        <router-link 
          to="/themesoverview"
          :disabled="!themesAvailable"
          :event="themesAvailable ? 'click' : ''"      
        >Přehled témat</router-link>
      </div>
        
  </div>
</template>

<script>
export default {
  data(){
    return {
      hidden: true
    }
  },

  computed: {
    isMenuHidden: {
      get() {
        return this.hidden;
      },
      set(newState) {
        this.hidden = newState;
      }
    },
    menuStyle() {
      return this.hidden ? 'left:-20%' : 'left:0px';
    },
    themesAvailable(){
      const quiz = this.$store.state.quiz;

      if (quiz === null)
        return false;
      else
        return true;
    }
  },

  methods: {
    changeVisibility(){
      this.isMenuHidden = !this.isMenuHidden;
    },
    checkOutsideMenuClick(){
      alert('outside')
    }
  }
}
</script>

<style>
#menu > a.router-link-active{
  color: 003049;
  background-color: var(--main-color);
}

label[for="menu-icon"] > div{
  width: 35px;
  height: 5px;
  background-color: var(--secondary-color);
  margin: 6px 0;
}

label[for="menu-icon"]{
  position: absolute;
  z-index: 5;
}

#menu-icon:hover ~ label[for="menu-icon"] > div{
  background-color: white;
}

#menu-icon{
    background: none;
    border: none;
    outline: none;
    display: none;
}

#menu-icon:checked ~ label[for="menu-icon"] > div{
   background-color: white;
}

label[for="menu-icon"]:hover{
  cursor: pointer;
}

#menu{
    display: flex;
    position: absolute;
    height: 100vh;
    top: 0;
    background-color: D62828;
    flex-direction: column;
    width: 20%;
    transition: left ease-in 0.5s;
    justify-content: center;
}

#menu > a{
  display: flex;
  width: 100%;
  height: 50px;
  margin: 5px auto;
  place-content: center;
  align-items: center;
  background-color: var(--secondary-color);
  color: white;
  text-decoration: none;
}

#menu > a:hover {
  background-color: var(--main-color);
}

#menu > a[disabled="disabled"] {
    cursor: not-allowed;
    filter: grayscale(1);
}
</style>
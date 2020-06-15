<template>
  <div id="app">
    <CharacterParentComponent/>
  </div>
</template>

<script>
import CharacterParentComponent from "./components/character/CharacterParentComponent.vue";

export default {
  name: "App",
  components: {
    CharacterParentComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

label {
  display: block;
}
</style>

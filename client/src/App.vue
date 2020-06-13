<template>
  <div id="app">
    <Character msg1="Character Viewer" msg2="Character Creator" msg3="Edit Character"/>
  </div>
</template>

<script>
import Character from "./components/Character.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Character
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
</style>

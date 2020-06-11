<template>
  <div id="app">
    <button v-on:click="toggle='character-viewer'; getCharacters();">Character Viewer</button>
    <button v-on:click="toggle='character-creator'">Character Creator</button>

    <CharacterViewer v-show="toggle === 'character-viewer'" msg="Character Viewer" :characters="characters"/>
    <CharacterCreator v-show="toggle === 'character-creator'" msg="Character Creator" />
  </div>
</template>

<script>
import CharacterViewer from "./components/CharacterViewer.vue";
import CharacterCreator from "./components/CharacterCreator.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    CharacterViewer,
    CharacterCreator
  },
  data: function() {
    return {
      toggle: "character-viewer",
      characters: null
    };
  },
  methods: {
    getCharacters: function() {
      axios
        .get("http://localhost:3000/characters")
        .then(response => (this.characters = response.data));
    }
  },
  mounted: function() {
    this.getCharacters();
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

li {
  list-style: none;
}
</style>

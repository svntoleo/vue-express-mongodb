<template>
  <div class="character-viewer">
    <h1>Character Viewer</h1>

    <table v-if="characters.length > 0">
      <tr>
        <th>Name</th>
        <th>Class</th>
        <th>Actions</th>
      </tr>
      <tr v-for="character in characters" :key="character._id">
        <td>{{character.name}}</td>
        <td>{{character.class}}</td>
        <td>
          <button @click="editCharacter(character)">Edit</button>
          <button @click="deleteCharacter(character._id)">Delete</button>
        </td>
      </tr>
    </table>
    <p v-else>There are no characters to display :/</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Characters",
  data: function() {
    return {
      characters: Array
    };
  },
  mounted: function() {
    this.getCharacters();
  },
  methods: {
    getCharacters: function() {
      axios
        .get("http://localhost:3000/characters")
        .then(response => this.characters = response.data);
    },
    deleteCharacter: function(id) {
      axios
        .delete("http://localhost:3000/characters/" + id)
        .then(response => {
          console.log(response);
          this.getCharacters();
        })
        .catch(error => {
          console.log(error);
        });
    },
    editCharacter: function(char) {
      this.$parent.modalController = "characterEditor";
      this.$parent.characterToEdit = char;
    }
  }
};
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
}
</style>

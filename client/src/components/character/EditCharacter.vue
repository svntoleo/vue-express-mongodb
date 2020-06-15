<template>
  <div class="character-editor">
    <h1>Edit Character</h1>

    <form>
      <label>
        Name:
        <input type="text" v-model="character.name" />
      </label>

      <label>
        Class:
        <select v-model="character.class">
          <CharacterClasses />
        </select>
      </label>
    </form>

    <button @click="updateCharacter(character)">Save</button>
    <button @click="getBack">Cancel</button>
  </div>
</template>

<script>
import axios from "axios";
import CharacterClasses from "./CharacterClasses.vue";

export default {
  name: "EditCharacter",
  components: {
    CharacterClasses
  },
  props: {
    character: Object
  },
  methods: {
    updateCharacter: function(character) {
      axios
        .patch(
          "http://localhost:3000/characters/" + this.character._id,
          character
        )
        .then(response => {
          console.log(response);
          this.getBack();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getBack: function() {
      this.$parent.modalController = "characterViewer";
    }
  }
};
</script>

<style scoped>
</style>

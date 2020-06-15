<template>
  <div class="character-editor">
    <h1>Edit Character</h1>

    <form>
      <label>
        Name:
        <input type="text" v-model="character.name" @input="disabled = false"/>
      </label>

      <label>
        Class:
        <select v-model="character.class" @input="disabled = false">
          <CharacterClasses />
        </select>
      </label>
    </form>

    <button @click="updateCharacter(character)" :disabled="disabled || !character.name">Save</button>
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
  data() {
    return {
      disabled: true
    }
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

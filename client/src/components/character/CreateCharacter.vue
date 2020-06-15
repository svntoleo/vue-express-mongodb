<template>
  <div class="create-character">
    <h1>Create Character</h1>

    <form>
      <label>
        Name:
        <input type="text" v-model="name" placeholder="Enter a name" />
      </label>

      <label>
        Class:
        <select v-model="classChoosed">
          <CharacterClasses />
        </select>
      </label>
    </form>

    <button @click="postCharacter">Create character</button>
    <button @click="getBack">Cancel</button>
  </div>
</template>

<script>
import axios from "axios";
import CharacterClasses from "./CharacterClasses.vue";

export default {
  name: "CreateCharacter",
  components: {
    CharacterClasses
  },
  data: function() {
    return {
      name: null,
      classChoosed: null
    };
  },
  methods: {
    postCharacter: function() {
      axios
        .post("http://localhost:3000/characters", {
          name: this.name,
          class: this.classChoosed
        })
        .then(response => {
          console.log(response);
          this.name = "";
          this.classChoosed = "";
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

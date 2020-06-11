<template>
  <div class="character-creator">
    <h1>{{ msg }}</h1>
    <form>
      <label for="character-name">
        Name:
        <input type="text" id="character-name" v-model="name" placeholder="Enter a name" />
      </label>

      <label for="character-class">
        Class:
        <select id="class-list" v-model="classChoosed">
          <option value="Warrior">Warrior</option>
          <option value="Mage">Mage</option>
          <option value="Archer">Archer</option>
        </select>
      </label>
    </form>

    <h3>Your character:</h3>
    <ul>
      <li>{{name}}</li>
      <li>{{classChoosed}}</li>
    </ul>

    <button v-on:click="postCharacter">Create character</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CharacterCreator",
  props: {
    msg: String
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
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.name = "";
      this.classChoosed = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div class="character-viewer">
    <h1>{{ msg }}</h1>

    <p v-for="(character, index) in characters" v-bind:key="index">
      {{character.name}} is a {{character.class}}
      <button
        v-on:click="toggleEditCharacter(character)"
      >Edit</button>
      <button v-on:click="deleteCharacter(character._id)">Delete</button>
    </p>

    <div class="modal-mask" style="display:none">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">Editing Character</slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form>
                <label for="character-name">
                  Name:
                  <input type="text" v-model="editName" />
                </label>

                <label for="character-class">
                  Class:
                  <select v-model="editClassChoosed">
                    <option value="Warrior">Warrior</option>
                    <option value="Mage">Mage</option>
                    <option value="Archer">Archer</option>
                  </select>
                </label>
              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button v-on:click="updateCharacter(character)">Save</button>
              <button v-on:click="toggleEditCharacter">Cancelar</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CharacterViewer",
  props: {
    msg: String,
    characters: Array
  },
  data: function() {
    return {
      editName: null,
      editClassChoosed: null,
      character: null,
      characterBeingEdited: null
    };
  },
  methods: {
    deleteCharacter: function(id) {
      axios
        .delete("http://localhost:3000/characters/" + id)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateCharacter: function() {
      axios
        .patch(
          "http://localhost:3000/characters/" + this.characterBeingEdited._id,
          {
            name: this.editName,
            class: this.editClassChoosed
          }
        )
        .then(function(response) {
          console.log(response);
          document.querySelector(".modal-mask").style.display = "none";
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toggleEditCharacter: function(character) {
      var modal = this.$el.querySelector(".modal-mask");
      if (modal.style.display === "none") {
        this.editName = character.name;
        this.editClassChoosed = character.class;
        this.characterBeingEdited = character;
        modal.style.display = "table";
      } else {
        modal.style.display = "none";
        this.editName = null;
        this.editClassChoosed = null;
        this.characterBeingEdited = null;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}
</style>

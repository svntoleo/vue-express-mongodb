<template>
  <div class="character">
    <button v-on:click="modalController = 'characterCreator'">Create Character</button>

    <!-- CHARACTER VIEWER -->
    <div
      v-if="modalController == 'characterViewer'||'characterEditor'||'characterCreator'"
      class="character-viewer"
    >
      <h1>{{ msg1 }}</h1>

      <p v-for="(character, index) in characters" v-bind:key="index">
        {{character.name}} is a {{character.class}}
        <button
          v-on:click="modalController = 'characterEditor'; toggleEditCharacter(character)"
        >Edit</button>
        <button v-on:click="deleteCharacter(character._id)">Delete</button>
      </p>
    </div>
    <!-- CHARACTER CREATOR -->
    <div v-if="modalController == 'characterCreator'" class="character-creator modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1>{{ msg2 }}</h1>
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

          <button v-on:click="postCharacter(); modalController = 'characterViewer'">Create character</button>
          <button v-on:click="modalController = 'characterViewer'">Cancel</button>
        </div>
      </div>
    </div>

    <!-- CHARACTER EDITOR -->
    <div v-if="modalController == 'characterEditor'" class="character-editor modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h1>{{ msg3 }}</h1>
            </slot>
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
                    <option value="Ninja">Ninja</option>
                    <option value="Ghost">Ghost</option>
                  </select>
                </label>
              </form>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                v-on:click="updateCharacter(character);modalController = 'characterViewer'"
              >Save</button>
              <button v-on:click="modalController = 'characterViewer'; toggleEditCharacter">Cancel</button>
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
  name: "Character",
  props: {
    msg1: String,
    msg2: String,
    msg3: String
  },
  data: function() {
    return {
      modalController: "characterViewer",
      editName: null,
      editClassChoosed: null,
      character: null,
      characterBeingEdited: null,
      name: null,
      classChoosed: null,
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
        .then(response => (this.characters = response.data));
    },
    postCharacter: function() {
      var self = this;
      axios
        .post("http://localhost:3000/characters", {
          name: this.name,
          class: this.classChoosed
        })
        .then(function(response) {
          console.log(response);
          self.name = "";
          self.classChoosed = "";
          self.getCharacters();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteCharacter: function(id) {
      var self = this;
      axios
        .delete("http://localhost:3000/characters/" + id)
        .then(function(response) {
          console.log(response);
          self.getCharacters();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateCharacter: function() {
      var self = this;
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
          self.getCharacters();
          // document.querySelector(".modal-mask").style.display = "none";
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toggleEditCharacter: function(character) {
      // var modal = this.$el.querySelector(".modal-mask");
      if (this.modalController == "characterEditor") {
        this.editName = character.name;
        this.editClassChoosed = character.class;
        this.characterBeingEdited = character;
        // modal.style.display = "table";
      } else {
        // modal.style.display = "none";
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
label {
  display: block;
}

li {
  list-style: none;
}

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

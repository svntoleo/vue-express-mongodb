<template>
  <div class="character">
    <button @click="modalController = 'characterCreator'">Create Character</button>

    <ViewCharacters v-if="modalController === 'characterViewer'" />

    <CreateCharacter v-if="modalController === 'characterCreator'" />

    <EditCharacter v-if="modalController === 'characterEditor'" :character="characterToEdit" />
  </div>
</template>

<script>
import ViewCharacters from "./ViewCharacters.vue";
import CreateCharacter from "./CreateCharacter.vue";
import EditCharacter from "./EditCharacter.vue";

export default {
  name: "Character",
  components: {
    ViewCharacters,
    CreateCharacter,
    EditCharacter
  },
  data: function() {
    return {
      modalController: "characterViewer",
      characterToEdit: Object
    };
  }
};
</script>

<style scoped>
</style>

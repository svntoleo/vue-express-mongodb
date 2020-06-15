<template>
  <optgroup class="character-classes">
    <option v-for="(classToChoose, index) in classesToChoose" v-bind:key="index">{{classToChoose}}</option>
  </optgroup>
</template>

<script>
export default {
  name: "CharacterClasses",
  data: function() {
    return {
      classesToChoose: ["Warrior", "Mage", "Archer", "Ninja"]
    };
  }
};
</script>


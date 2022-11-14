<template>
  <PokemonDetails :title="pokemonStore.currentPokemon?.index.toString() ?? ''" />
  <button @click="pokemonStore.getNextPokemon()">Next</button>
</template>

<script setup lang="ts">
import PokemonDetails from "./components/PokemonDetails.vue";
import { usePokemonStore } from "./store/pokemon-store";

const pokemonStore = usePokemonStore();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="currentPokemon">
      <h1>{{ currentPokemon.name }}</h1>
      <img
        :src="currentPokemon.imageUrl"
        :alt="`Image of ${currentPokemon.bla}`"
      />
    </div>
    <h2 v-else>...</h2>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { usePokemonStore } from "../store/pokemon-store";
import { storeToRefs } from "pinia";

interface PokemonNameProps {
  title: string;
}

defineProps<PokemonNameProps>();

const pokemonStore = usePokemonStore();

const { getNextPokemon } = pokemonStore;
const { currentPokemon } = storeToRefs(pokemonStore);

onMounted(() => {
  getNextPokemon();
});
</script>

<style scoped></style>

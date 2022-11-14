import { defineStore } from "pinia";
import { ref } from "vue";

interface Pokemon {
  name: string;
  index: number;
  imageUrl: string;
}

interface PokemonResponse {
  name: string;
  sprites: {
    front_default: string;
  };
}

export const createPokemonStore = (
  fetchPokemon: (id: number) => Promise<PokemonResponse>
) =>
  defineStore("pokemon", () => {
    const pokemonIndex = ref(0);
    const currentPokemon = ref<Pokemon | null>(null);

    const getNextPokemon = async () => {
      pokemonIndex.value = pokemonIndex.value + 1;
      const pokemon = await fetchPokemon(pokemonIndex.value);
      currentPokemon.value = {
        index: pokemonIndex.value,
        name: pokemon.name,
        imageUrl: pokemon.sprites.front_default,
      };
    };

    return { currentPokemon, getNextPokemon };
  });

const fetchPokemon = async (id: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return await response.json();
};

export const usePokemonStore = createPokemonStore(fetchPokemon);

import { createPinia, setActivePinia } from "pinia";
import { createPokemonStore, usePokemonStore } from "./pokemon-store";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("Pokemon Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should set fetched pokemon to store", async () => {
    vi.stubGlobal("fetch", () =>
      Promise.resolve({
        ok: true,
        json: () => ({
          name: "Eugenmon",
          sprites: { front_default: "https://pokemon.image" },
        }),
      })
    );
    const pokemonStore = usePokemonStore();
    await pokemonStore.getNextPokemon();
    expect(pokemonStore.currentPokemon?.name).toBe("Eugenmon");
  });

  it("should throw error in case of error response", () => {
    vi.stubGlobal("fetch", () =>
      Promise.resolve({
        ok: false,
        statusText: "Very big error!!!",
      })
    );
    const pokemonStore = usePokemonStore();
    expect(pokemonStore.getNextPokemon).rejects.toThrowError();
  });

  it("initial state", () => {
    const pokemonStore = createPokemonStore(vi.fn())();
    expect(pokemonStore.currentPokemon).toBe(null);
  });

  it("should fetch pokemon with next id when getNextPokemon is called", async () => {
    const fetchPokemonMock = vi.fn().mockResolvedValue({
      name: "Eugenmon",
      sprites: { front_default: "https://pokemon.image" },
    });
    const pokemonStore = createPokemonStore(fetchPokemonMock)();

    await pokemonStore.getNextPokemon();
    expect(fetchPokemonMock.mock.lastCall?.[0]).toBe(1);
    await pokemonStore.getNextPokemon();
    expect(fetchPokemonMock.mock.lastCall?.[0]).toBe(2);
  });
});

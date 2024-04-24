import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {addEntity} from "@ngrx/signals/entities";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {computed, inject} from "@angular/core";
import {ApiService} from "./services/api.service";
import {withFavorites} from "./pages/favorites/favorites.state";
import {withGenerations} from "./pages/generations/generations.state";
import {withPokemonCollection} from "./pages/pokemon/pokemon.state";

export const pokeCollectorStore = signalStore(
  {
    providedIn: 'root'
  },
  withState({
    loading: false,
  }),
  withFavorites(),
  withGenerations(),
  withPokemonCollection(),
  withComputed(({selectedPokemonId, pokemonCollectionEntities}) => ({
    selectedPokemonDetails: computed(() =>
      pokemonCollectionEntities().find((p) => p.pokemon_species_id === selectedPokemonId?.())),

    selectedPokemonEvolutionChain: computed(() => {
      const id = selectedPokemonId?.();
      const pokemon = pokemonCollectionEntities().find((p) => p.pokemon_species_id === id)
      const chain = pokemon?.pokemon_v2_pokemonspecy?.evolutionchain?.pokemonspecies;
      if (!chain?.length) {
        return [];
      }
      return chain.map((species) => {
        return {
          id: species.id,
          name: species.names[0].name,
        }
      })
    })
  })),
  withMethods((store, apiService = inject(ApiService)) => ({
    loadPokemonDetails: rxMethod<number>(
      pipe(
        switchMap((id) => {
            patchState(store, (state) => ({...state, loading: true}));
            return apiService.loadPokemonDetails(id).pipe(
              tap((pokemon) => patchState(store, (state) => ({
                ...state,
                loading: false,
                selectedPokemonId: id
              }), addEntity(pokemon, {collection: 'pokemonCollection', idKey: 'name'})))
            )
          }
        )
      )
    )
  })),
  withHooks((store) => ({
    onInit: () => store.loadGenerations()
  }))
);

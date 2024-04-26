import {Generation} from "./models/generation";
import {patchState, signalStore, type, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {ApiService} from "./services/api.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {map, pipe, switchMap, tap} from "rxjs";
import {Pokemon} from "./models/pokemon";
import {addEntity, removeEntity, setEntities, withEntities} from "@ngrx/signals/entities";

type PokemonCollectorState = {
  loading: boolean;
  selectedPokemon?: Pokemon;
}

const initialState: PokemonCollectorState = {
  loading: false,
  selectedPokemon: undefined
}

export const pokemonCollectorStore = signalStore(
  {
    providedIn: 'root'
  },
  withState(initialState),
  withEntities({entity: type<Generation>(), collection: 'generations'}),
  withEntities({entity: type<Pokemon>(), collection: 'pokemon'}),
  withEntities({entity: type<Pokemon>(), collection: 'favorites'}),
  withComputed((state) => ({
    evolutionChain: computed(() => {
      const selectedPokemon = state.selectedPokemon?.();
      if (!selectedPokemon) {
        return [];
      }
      return selectedPokemon.pokemon_v2_pokemonspecy?.evolutionchain?.pokemonspecies.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.names[0].name ?? 'unknown',
      })) || [];
    }),
  })),
  withMethods((store, apiService = inject(ApiService)) => ({
    loadGenerations: rxMethod<void>(
      pipe(
        tap(() => patchState(store, {loading: true})),
        switchMap(() => apiService.generations()),
        map(({data}) => data.items),
        tap(generations => patchState(store, {loading: false}, setEntities(generations, {collection: 'generations'}))),
      )
    ),
    loadPokemon: rxMethod<number>(
      pipe(
        tap(() => patchState(store, {loading: true})),
        switchMap(generationId => apiService.loadPokemonCollection(generationId)),
        map(({data}) => data.items),
        tap(pokemon => patchState(store, {loading: false},
          setEntities(pokemon, {collection: 'pokemon', idKey: 'pokemon_species_id'})))
      )
    ),
    selectPokemon: (pokemon: Pokemon) => patchState(store, {selectedPokemon: pokemon}),
    addFavorite: (pokemon: Pokemon) => patchState(store, addEntity(pokemon, {
      collection: 'favorites',
      idKey: 'pokemon_species_id'
    })),
    removeFavorite: (pokemonId: number) => patchState(store, removeEntity(pokemonId, {collection: 'favorites'})),
  })),
  withHooks((store) => ({
    onInit: () => store.loadGenerations(),
    onDestroy: () => console.log('destroyed')
  }))
)

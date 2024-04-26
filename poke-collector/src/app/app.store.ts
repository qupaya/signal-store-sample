import {Generation} from "./models/generation";
import {patchState, signalStore, withHooks, withMethods, withState} from "@ngrx/signals";
import {inject} from "@angular/core";
import {ApiService} from "./services/api.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {map, pipe, switchMap, tap} from "rxjs";
import {Pokemon} from "./models/pokemon";

type PokemonCollectorState = {
  loading: boolean;
  generations: Generation[];
  pokemon: Pokemon[];
  selectedPokemon?: Pokemon;
}

const initialState: PokemonCollectorState = {
  loading: false,
  generations: [],
  pokemon: [],
  selectedPokemon: undefined
}

export const pokemonCollectorStore = signalStore(
  {
    providedIn: 'root'
  },
  withState(initialState),
  withMethods((store, apiService = inject(ApiService)) => ({
    loadGenerations: rxMethod<void>(
      pipe(
        tap(() => patchState(store, {loading: true})),
        switchMap(() => apiService.generations()),
        map(({data}) => data.items),
        tap(generations => patchState(store, {loading: false, generations})),
      )
    ),
    loadPokemon: rxMethod<number>(
      pipe(
        tap(() => patchState(store, {loading: true})),
        switchMap(generationId => apiService.loadPokemonCollection(generationId)),
        map(({data}) => data.items),
        tap(pokemon => patchState(store, {loading: false, pokemon})),
      )
    ),
    selectPokemon: (pokemon: Pokemon) => patchState(store, {selectedPokemon: pokemon})
  })),
  withHooks((store) => ({
    onInit: () => store.loadGenerations(),
    onDestroy: () => console.log('destroyed')
  }))
)

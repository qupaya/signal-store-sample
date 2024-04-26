import {Generation} from "./models/generation";
import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {inject} from "@angular/core";
import {ApiService} from "./services/api.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {map, pipe, switchMap, tap} from "rxjs";

type PokemonCollectorState = {
  loading: boolean;
  generations: Generation[];
}

const initialState: PokemonCollectorState = {
  loading: false,
  generations: []
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
    )
  }))
)

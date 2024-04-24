import {patchState, signalStoreFeature, type, withMethods, withState} from "@ngrx/signals";
import {setAllEntities, withEntities} from "@ngrx/signals/entities";
import {Pokemon} from "../../models/pokemon";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {EMPTY, pipe, switchMap, tap} from "rxjs";
import {inject} from "@angular/core";
import {ApiService} from "../../services/api.service";

export interface PokeCollectorState {
  loading: boolean;
  selectedGenerationId: number | undefined;
  selectedPokemonId: number;
}

export function withPokemonCollection() {
  return signalStoreFeature(
    withState<PokeCollectorState>({loading: false, selectedGenerationId: undefined, selectedPokemonId: -1}),
    withEntities({entity: type<Pokemon>(), collection: 'pokemonCollection'}),
    withMethods((store, apiService = inject(ApiService)) => ({
      loadPokeCollection: rxMethod<number>(
        pipe(
          tap(() => patchState(store, {loading: true})),
          switchMap((generationId) => {
            const genId = store.selectedGenerationId?.();
            if (genId === generationId) {
              patchState(store, {loading: false});
              return EMPTY;
            }

            return apiService.loadPokemonCollection(generationId).pipe(
              tap(({data}) => patchState(store, (state) => ({
                  ...state,
                  selectedGenerationId: generationId,
                  loading: false,
                }), setAllEntities(data.items, {collection: 'pokemonCollection', idKey: 'name'})),
              )
            );
          }),
        )),

      selectPokemon: (pokemonId: number) => patchState(store, {selectedPokemonId: pokemonId}),
    })),
  )
}

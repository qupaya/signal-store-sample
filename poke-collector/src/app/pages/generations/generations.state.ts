import {patchState, signalStoreFeature, type, withHooks, withMethods, withState} from "@ngrx/signals";
import {setEntities, withEntities} from "@ngrx/signals/entities";
import {Generation} from "../../models/generation";
import {inject} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {map, pipe, switchMap, tap} from "rxjs";

export function withGenerations() {
  return signalStoreFeature(
    withState({loading: true}),
    withEntities({entity: type<Generation>(), collection: 'generations'}),
    withMethods((store, apiService = inject(ApiService)) => ({
      loadGenerations: rxMethod<void>(
        pipe(
          tap(() => patchState(store, {loading: true})),
          switchMap(() => apiService.generations()),
          map(({data}) => data.items),
          tap(generations => patchState(store, {loading: false}, setEntities(generations, {collection: 'generations'}))),
        )
      ),
    })),
    withHooks((store) => ({
      onInit: () => store.loadGenerations()
    }))
  )
}

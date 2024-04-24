import {patchState, signalStoreFeature, type, withMethods, withState} from "@ngrx/signals";
import {setAllEntities, withEntities} from "@ngrx/signals/entities";
import {Generation} from "../../models/generation";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {pipe, switchMap, tap} from "rxjs";
import {inject} from "@angular/core";
import {ApiService} from "../../services/api.service";

export function withGenerations() {
  return signalStoreFeature(
    withState({loading: false}),
    withEntities({entity: type<Generation>(), collection: 'generations'}),
    withMethods((store, apiService = inject(ApiService)) => ({
      loadGenerations: rxMethod<void>(
        pipe(
          tap(() => patchState(store, {loading: true})),
          switchMap(() => apiService.generations()),
          tap(({data}) => patchState(store, (state) => ({
            ...state,
            loading: false
          }), setAllEntities(data.items, {collection: 'generations'})))
        )
      ),
    }))
  );
}

import {patchState, signalStoreFeature, type, withMethods} from "@ngrx/signals";
import {Pokemon} from "../../models/pokemon";
import {addEntity, removeEntity, withEntities} from "@ngrx/signals/entities";

export function withFavorites() {
  return signalStoreFeature(
    withEntities({entity: type<Pokemon>(), collection: 'favorites'}),
    withMethods((store) => ({
        addFavorite: (pokemon: Pokemon) => patchState(store, addEntity(pokemon, {
          collection: 'favorites',
          idKey: 'pokemon_species_id'
        })),
        removeFavorite: (id: number) => patchState(store, removeEntity(id, {collection: 'favorites'}))
      })
    )
  );
}

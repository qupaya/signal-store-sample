import {Generation} from "./models/generation";
import {signalStore, withState} from "@ngrx/signals";

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
  withState(initialState)
)

import {Component, computed, inject, input, numberAttribute} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {PogressBarComponent} from "../../components/pogress-bar/pogress-bar.component";
import {EvolutionChainComponent} from "./evolution-chain/evolution-chain.component";
import {PokemonStatsComponent} from "./pokemon-stats/pokemon-stats.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe} from "@angular/common";
import {pokemonCollectorStore} from "../../app.store";

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    MatProgressBar,
    PogressBarComponent,
    EvolutionChainComponent,
    PokemonStatsComponent,
    MatIconButton,
    MatIcon,
    AsyncPipe
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  private readonly store = inject(pokemonCollectorStore);
  pokemonId = input.required<number, unknown>({transform: numberAttribute});

  readonly pokemon = this.store.selectedPokemon;
  readonly chain = this.store.evolutionChain;
  readonly pokemonHeight = computed(() => {
    const species = this.pokemon?.()?.pokemon_v2_pokemonspecy?.pokemons;
    if (species) {
      const height = species[0].height;
      const meter = height ? height / 10 : -1;
      return height > 0 ? `${meter}m` : 'Unknown';
    }
    return 'Unknown';
  });

  readonly isFavorite = computed(() => {
    //TODO: to be implement
    return false;
  })

  toggleFavorite(): void {
    const details = this.pokemon?.();
    if (!details) {
      return;
    }
    //TODO: to be implement
  }
}

import {Component, computed, effect, inject, input, numberAttribute} from '@angular/core';
import {pokeCollectorStore} from "../../app.store";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PogressBarComponent} from "../../components/pogress-bar/pogress-bar.component";
import {EvolutionChainComponent} from "./evolution-chain/evolution-chain.component";
import {PokemonStatsComponent} from "./pokemon-stats/pokemon-stats.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    MatProgressBar,
    PogressBarComponent,
    EvolutionChainComponent,
    PokemonStatsComponent,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  private readonly store = inject(pokeCollectorStore);
  pokemonId = input.required<number, unknown>({transform: numberAttribute});
  readonly pokemonDetails = this.store.selectedPokemonDetails;

  readonly pokemonHeight = computed(() => {
    const species = this.pokemonDetails()?.pokemon_v2_pokemonspecy?.pokemons;
    if (species) {
      const height = species[0].height;
      const meter = height ? height / 10 : -1;
      return height > 0 ? `${meter}m` : 'Unknown';
    }
    return 'Unknown';
  });

  readonly isFavorite = computed(() => {
    if (this.store.favoritesEntities().length) {
      return !!this.store.favoritesEntities().find(({pokemon_species_id}) => pokemon_species_id === this.pokemonId());
    }
    return false;
  })

  loadData = effect(() => {
    const id = this.pokemonId();
    if (id && !this.pokemonDetails()) {
      this.store.loadPokemonDetails(id);
    }
  }, {allowSignalWrites: true});

  toggleFavorite(): void {
    const details = this.pokemonDetails();
    if (!details) {
      return;
    }


    if (this.isFavorite()) {
      this.store.removeFavorite(details.pokemon_species_id);
    } else {
      console.log('addFavorite', details);
      this.store.addFavorite(details);
    }
  }
}

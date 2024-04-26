import {Component, computed, inject, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Pokemon} from "../../models/pokemon";
import {pokemonCollectorStore} from "../../app.store";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardTitleGroup,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  private readonly store = inject(pokemonCollectorStore);
  pokemon = input.required<Pokemon>();
  selected = input(false);
  readonly isFavorite = computed(() => !!this.store.favoritesEntities().find(pokemon => this.pokemon?.()?.pokemon_species_id === pokemon.pokemon_species_id));

  toggleFavorite(pokemon: Pokemon, event: Event): void {
    event.stopPropagation();
    if (this.isFavorite()) {
      this.store.removeFavorite(pokemon.pokemon_species_id);
    } else {
      this.store.addFavorite(pokemon);
    }
  }

}

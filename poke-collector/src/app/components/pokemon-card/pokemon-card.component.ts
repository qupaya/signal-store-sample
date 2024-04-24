import {Component, computed, inject, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Pokemon} from "../../models/pokemon";
import {pokeCollectorStore} from "../../app.store";

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
  private readonly store = inject(pokeCollectorStore);
  pokemon = input.required<Pokemon>();
  selected = input(false);
  readonly isFavorite = computed(() => {
    if (this.store.favoritesEntities().length) {
      return !!this.store.favoritesEntities().find(({pokemon_species_id}) => pokemon_species_id === this.pokemon().pokemon_species_id);
    }
    return false;
  });

  toggleFavorite(pokemon: Pokemon, event: Event): void {
    event.stopPropagation();
    if (this.isFavorite()) {
      this.store.removeFavorite(pokemon.pokemon_species_id);
    } else {
      this.store.addFavorite(pokemon);
    }
  }

}

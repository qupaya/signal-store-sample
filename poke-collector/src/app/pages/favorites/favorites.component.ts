import {Component, inject} from '@angular/core';
import {pokeCollectorStore} from "../../app.store";
import {Pokemon} from "../../models/pokemon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {transition, trigger} from "@angular/animations";
import {slideDeleteAnimation} from "../../animations/slide.animations";
import {PokemonCardComponent} from "../../components/pokemon-card/pokemon-card.component";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardTitleGroup,
    MatCardActions,
    MatIconButton,
    MatIcon,
    PokemonCardComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
  animations: [
    trigger('favorite', [transition(':leave', [slideDeleteAnimation()])]),
  ]
})
export class FavoritesComponent {
  private readonly store = inject(pokeCollectorStore);
  readonly favorites = this.store.favoritesEntities;

  removeFavorite({pokemon_species_id}: Pokemon): void {
    this.store.removeFavorite(pokemon_species_id);
  }
}

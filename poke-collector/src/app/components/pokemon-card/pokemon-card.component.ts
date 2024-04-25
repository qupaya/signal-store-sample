import {Component, computed, input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Pokemon} from "../../models/pokemon";

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
  pokemon = input.required<Pokemon>();
  selected = input(false);
  readonly isFavorite = computed(() => {
    // TODO: to be implement
    return false;
  });

  toggleFavorite(pokemon: Pokemon, event: Event): void {
    event.stopPropagation();
    // TODO: to be implement
  }

}

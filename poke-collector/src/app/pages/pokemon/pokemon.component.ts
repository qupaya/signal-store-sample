import {Component, effect, inject, input} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from "@angular/material/card";
import {query, transition, trigger} from "@angular/animations";
import {slideFadeAnimationFactory} from "../../animations/slide.animations";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {PokemonCardComponent} from "../../components/pokemon-card/pokemon-card.component";
import {AsyncPipe} from "@angular/common";
import {pokemonCollectorStore} from "../../app.store";
import {Pokemon} from "../../models/pokemon";

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardTitleGroup,
    MatCardContent,
    MatIcon,
    MatIconButton,
    PokemonCardComponent,
    AsyncPipe
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
  animations: [
    trigger('pokemonCollection', [transition(':enter', [query(':enter', slideFadeAnimationFactory())])]),
  ],
})
export class PokemonComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(pokemonCollectorStore);

  id = input.required<number>();

  readonly loading = this.store.loading;
  readonly selectedPokemonId = this.store.selectedPokemon?.()?.pokemon_species_id;
  readonly pokemon = this.store.pokemon;

  private readonly loadPokemon = effect(() => this.store.loadPokemon(this.id()),
    {allowSignalWrites: true});

  async openPokemon(pokemon: Pokemon): Promise<void> {
    this.store.selectPokemon(pokemon)
    await this.router.navigate(['pokemon', pokemon.pokemon_species_id], {relativeTo: this.activatedRoute});
  }
}
